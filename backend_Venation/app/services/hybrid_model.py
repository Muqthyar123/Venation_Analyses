from __future__ import annotations

import torch
from torch import nn
from torch.nn import functional as F


class Bottleneck(nn.Module):
    expansion = 4

    def __init__(self, inplanes: int, planes: int, stride: int = 1, downsample: nn.Module | None = None) -> None:
        super().__init__()
        self.conv1 = nn.Conv2d(inplanes, planes, kernel_size=1, bias=False)
        self.bn1 = nn.BatchNorm2d(planes)
        self.conv2 = nn.Conv2d(planes, planes, kernel_size=3, stride=stride, padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(planes)
        self.conv3 = nn.Conv2d(planes, planes * self.expansion, kernel_size=1, bias=False)
        self.bn3 = nn.BatchNorm2d(planes * self.expansion)
        self.relu = nn.ReLU(inplace=True)
        self.downsample = downsample

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        identity = x

        out = self.relu(self.bn1(self.conv1(x)))
        out = self.relu(self.bn2(self.conv2(out)))
        out = self.bn3(self.conv3(out))

        if self.downsample is not None:
            identity = self.downsample(x)

        out += identity
        return self.relu(out)


class ResNet50Backbone(nn.Module):
    def __init__(self) -> None:
        super().__init__()
        self.inplanes = 64
        self.layers = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=7, stride=2, padding=3, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=3, stride=2, padding=1),
            self._make_layer(64, 3),
            self._make_layer(128, 4, stride=2),
            self._make_layer(256, 6, stride=2),
            self._make_layer(512, 3, stride=2),
        )

    def _make_layer(self, planes: int, blocks: int, stride: int = 1) -> nn.Sequential:
        downsample = None
        if stride != 1 or self.inplanes != planes * Bottleneck.expansion:
            downsample = nn.Sequential(
                nn.Conv2d(self.inplanes, planes * Bottleneck.expansion, kernel_size=1, stride=stride, bias=False),
                nn.BatchNorm2d(planes * Bottleneck.expansion),
            )

        layers = [Bottleneck(self.inplanes, planes, stride, downsample)]
        self.inplanes = planes * Bottleneck.expansion
        layers.extend(Bottleneck(self.inplanes, planes) for _ in range(1, blocks))
        return nn.Sequential(*layers)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.layers(x)


class HybridNetMSVD(nn.Module):
    def __init__(self, num_classes: int) -> None:
        super().__init__()
        self.resnet_backbone = ResNet50Backbone().layers
        self.rgb_stream = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.AdaptiveAvgPool2d((1, 1)),
        )
        self.struct_stream = nn.Sequential(
            nn.Conv2d(2, 32, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.AdaptiveAvgPool2d((1, 1)),
        )
        self.ms3 = nn.Conv2d(2048, 256, kernel_size=3, padding=1)
        self.ms5 = nn.Conv2d(2048, 256, kernel_size=5, padding=2)
        self.ms7 = nn.Conv2d(2048, 256, kernel_size=7, padding=3)
        self.ms_fusion = nn.Sequential(
            nn.Conv2d(768, 256, kernel_size=1),
            nn.ReLU(inplace=True),
            nn.AdaptiveAvgPool2d((1, 1)),
        )
        self.classifier = nn.Sequential(
            nn.Linear(384, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(0.3),
            nn.Linear(512, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        rgb = x[:, :3]
        structural = x[:, 3:5]

        backbone_features = self.resnet_backbone(rgb)
        multi_scale = torch.cat(
            (
                F.relu(self.ms3(backbone_features)),
                F.relu(self.ms5(backbone_features)),
                F.relu(self.ms7(backbone_features)),
            ),
            dim=1,
        )
        fused = self.ms_fusion(multi_scale).flatten(1)
        rgb_features = self.rgb_stream(rgb).flatten(1)
        structural_features = self.struct_stream(structural).flatten(1)

        features = torch.cat((fused, rgb_features, structural_features), dim=1)
        return self.classifier(features)
