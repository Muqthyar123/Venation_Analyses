import unittest
from unittest.mock import Mock, patch

import cv2
import numpy as np

from app.services.leaf_validation import LeafValidator
from app.services import prediction_service


def encoded_image() -> bytes:
    image = np.full((40, 60, 3), 127, dtype=np.uint8)
    ok, encoded = cv2.imencode(".png", image)
    assert ok
    return encoded.tobytes()


class LeafValidatorTests(unittest.TestCase):
    def test_uses_raw_rgb_pixels_and_loaded_threshold(self):
        validator = LeafValidator.__new__(LeafValidator)
        validator.width = validator.height = 224
        validator.threshold = 0.52
        validator.model = Mock()
        validator.model.predict.return_value = np.array([[0.7]], dtype=np.float32)

        accepted, probability = validator.validate(encoded_image())

        self.assertTrue(accepted)
        self.assertAlmostEqual(probability, 0.7)
        batch = validator.model.predict.call_args.args[0]
        self.assertEqual(batch.shape, (1, 224, 224, 3))
        self.assertGreater(float(batch.max()), 1.0)

    def test_rejection_stops_before_preprocessing_or_species_inference(self):
        with (
            patch.object(prediction_service, "get_leaf_validator") as get_validator,
            patch.object(prediction_service, "preprocess_image") as preprocess,
            patch.object(prediction_service.model_service, "predict") as species_predict,
        ):
            get_validator.return_value.validate.return_value = (False, 0.12)
            result = prediction_service.predict_image_bytes(encoded_image(), "resnet50")

        self.assertFalse(result["success"])
        self.assertFalse(result["valid_leaf"])
        self.assertEqual(result["leaf_probability"], 0.12)
        preprocess.assert_not_called()
        species_predict.assert_not_called()

    def test_accepted_image_calls_only_selected_model(self):
        with (
            patch.object(prediction_service, "get_leaf_validator") as get_validator,
            patch.object(prediction_service, "preprocess_image") as preprocess,
            patch.object(prediction_service.model_service, "predict") as species_predict,
            patch.object(prediction_service, "find_plant", return_value=None),
            patch.object(prediction_service, "static_url", side_effect=lambda path: str(path)),
        ):
            get_validator.return_value.validate.return_value = (True, 0.91)
            preprocess.return_value = {
                "multi_modal_tensor": np.zeros((224, 224, 5), dtype=np.float32),
                "paths": {},
            }
            species_predict.return_value = ("Test plant", 0.88, {
                "model_name": "resnet50",
                "model_label": "ResNet50",
                "model_backend": "tensorflow",
                "model_file": "resnet50_best_weights.weights.h5",
                "model_load_error": None,
            })
            result = prediction_service.predict_image_bytes(encoded_image(), "resnet50")

        self.assertTrue(result["valid_leaf"])
        self.assertEqual(result["leaf_probability"], 0.91)
        species_predict.assert_called_once()
        self.assertEqual(species_predict.call_args.args[1], "resnet50")


if __name__ == "__main__":
    unittest.main()
