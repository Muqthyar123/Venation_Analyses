import agImg from "../images/AG-S.jpg";
import ahImg from "../images/AH-S.jpg";
import aiImg from "../images/AI-S.jpg";
import avImg from "../images/AV-S.jpg";
import baImg from "../images/BA-S.jpg";
import bjImg from "../images/BJ-S-002.jpg";
import ccImg from "../images/CC-S-028.jpg";
import clImg from "../images/CL-S.jpg";
import faImg from "../images/FA-S.jpg";
import frImg from "../images/FR-S.jpg";
import hrImg from "../images/HR-S.jpg";
import jasmineImg from "../images/J-S.jpg";
import mcImg from "../images/MC-S.jpg";
import miImg from "../images/MI-S.jpg";
import mkImg from "../images/MK-S.jpg";
import moImg from "../images/MO-S.jpg";
import curryImg from "../images/M-S.jpg";
import naImg from "../images/NA-S.jpg";
import noImg from "../images/NO-S.jpg";
import otImg from "../images/OT-S.jpg";
import paImg from "../images/PA-S.jpg";
import pbImg from "../images/PB-S.jpg";
import pongamiaImg from "../images/PG-S (2).jpg";
import guavaImg from "../images/PG-S.jpg";
import ppImg from "../images/PP-S.jpg";
import saImg from "../images/SA-S.jpg";
import scImg from "../images/SC-S.jpg";
import sjImg from "../images/SJ-S.jpg";
import tdImg from "../images/TD-S.jpg";
import tfImg from "../images/TF-S.jpg";

export interface PlantSample {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  uses: string;
  description: string;
}

export const plantSamples: PlantSample[] = [
  {
    id: "ag",
    name: "Rasna",
    scientificName: "Alpinia Galanga",
    image: agImg,
    uses: "Anti-inflammatory support, digestive aid, respiratory wellness",
    description: "A rhizomatous medicinal plant used in traditional formulations.",
  },
  {
    id: "ah",
    name: "Arive-Dantu",
    scientificName: "Amaranthus Viridis",
    image: ahImg,
    uses: "Nutritional tonic, digestive support, skin health",
    description: "A leafy plant valued for micronutrients and traditional wellness use.",
  },
  {
    id: "ai",
    name: "Jackfruit",
    scientificName: "Artocarpus Heterophyllus",
    image: aiImg,
    uses: "Antioxidant support, digestive support, energy and nutrition",
    description: "Jackfruit leaves and fruit are associated with nutritional applications.",
  },
  {
    id: "av",
    name: "Neem",
    scientificName: "Azadirachta Indica",
    image: avImg,
    uses: "Antibacterial care, skin health, oral hygiene",
    description: "Neem is widely used for antimicrobial, skin, and hygiene applications.",
  },
  {
    id: "ba",
    name: "Basale",
    scientificName: "Basella Alba",
    image: baImg,
    uses: "Cooling tonic, digestive support, nutrient source",
    description: "A succulent leafy vegetable used as a cooling traditional remedy.",
  },
  {
    id: "bj",
    name: "Indian Mustard",
    scientificName: "Brassica Juncea",
    image: bjImg,
    uses: "Digestive support, circulation support, anti-inflammatory use",
    description: "Indian mustard leaves and seeds are used in food and health practices.",
  },
  {
    id: "cc",
    name: "Karanda",
    scientificName: "Carissa Carandas",
    image: ccImg,
    uses: "Digestive support, antioxidant support, traditional wound care",
    description: "A thorny medicinal shrub with fruit and leaves used in folk remedies.",
  },
  {
    id: "cl",
    name: "Lemon",
    scientificName: "Citrus Limon",
    image: clImg,
    uses: "Vitamin C source, digestive aid, immune support",
    description: "Lemon leaves and fruit are aromatic and used for wellness.",
  },
  {
    id: "fa",
    name: "Roxburgh fig",
    scientificName: "Ficus Auriculata",
    image: faImg,
    uses: "Digestive support, anti-inflammatory use, traditional wound care",
    description: "A fig species used regionally for digestive and inflammatory conditions.",
  },
  {
    id: "fr",
    name: "Peepal Tree",
    scientificName: "Ficus Religiosa",
    image: frImg,
    uses: "Respiratory support, wound care, digestive support",
    description: "A culturally important tree used in several traditional preparations.",
  },
  {
    id: "hr",
    name: "Hibiscus",
    scientificName: "Hibiscus Rosa-sinensis",
    image: hrImg,
    uses: "Hair care, antioxidant support, blood pressure support",
    description: "Recognized for ornamental flowers and traditional wellness uses.",
  },
  {
    id: "j",
    name: "Jasmine",
    scientificName: "Jasminum",
    image: jasmineImg,
    uses: "Calming aroma, skin care, traditional pain relief",
    description: "Jasmine species are valued for fragrance and soothing applications.",
  },
  {
    id: "mc",
    name: "Mango",
    scientificName: "Mangifera Indica",
    image: mcImg,
    uses: "Antioxidant support, digestive support, traditional diabetes support",
    description: "Mango leaves are used traditionally and contain plant bioactives.",
  },
  {
    id: "mi",
    name: "Mint",
    scientificName: "Mentha",
    image: miImg,
    uses: "Digestive aid, breath freshener, headache relief",
    description: "An aromatic herb widely used for digestion, freshness, and cooling effects.",
  },
  {
    id: "mk",
    name: "Drumstick",
    scientificName: "Moringa Oleifera",
    image: mkImg,
    uses: "Nutritional tonic, anti-inflammatory support, immune support",
    description: "Moringa leaves are nutrient dense and used in food and traditional medicine.",
  },
  {
    id: "mo",
    name: "Jamaica Cherry-Gasagase",
    scientificName: "Muntingia Calabura",
    image: moImg,
    uses: "Antioxidant support, anti-inflammatory use, traditional fever support",
    description: "A fast-growing tree with leaves and fruit used in folk medicine.",
  },
  {
    id: "m",
    name: "Curry",
    scientificName: "Murraya Koenigii",
    image: curryImg,
    uses: "Digestive support, hair health, traditional diabetes support",
    description: "Aromatic culinary leaves with important traditional medicinal use.",
  },
  {
    id: "na",
    name: "Oleander",
    scientificName: "Nerium Oleander",
    image: naImg,
    uses: "Research-only toxic plant, traditional external use",
    description: "A toxic plant included for image recognition and botanical study.",
  },
  {
    id: "no",
    name: "Parijata",
    scientificName: "Nyctanthes Arbor-tristis",
    image: noImg,
    uses: "Fever support, joint comfort, anti-inflammatory use",
    description: "Traditionally used for fever, joint pain, and inflammatory conditions.",
  },
  {
    id: "ot",
    name: "Tulsi",
    scientificName: "Ocimum Tenuiflorum",
    image: otImg,
    uses: "Respiratory support, stress relief, immune support",
    description: "A sacred aromatic herb used in Ayurveda for respiratory and immune wellness.",
  },
  {
    id: "pa",
    name: "Betel",
    scientificName: "Piper Betle",
    image: paImg,
    uses: "Digestive support, oral freshness, antimicrobial use",
    description: "An aromatic leaf traditionally used after meals and in local remedies.",
  },
  {
    id: "pb",
    name: "Mexican Mint",
    scientificName: "Plectranthus Amboinicus",
    image: pbImg,
    uses: "Cough relief, digestive aid, anti-inflammatory support",
    description: "Thick aromatic leaves used traditionally for coughs and digestion.",
  },
  {
    id: "pg-pongamia",
    name: "Indian Beech",
    scientificName: "Pongamia Pinnata",
    image: pongamiaImg,
    uses: "Skin care, anti-inflammatory use, traditional wound care",
    description: "Leaves and seed oil have traditional medicinal and agricultural uses.",
  },
  {
    id: "pg-guava",
    name: "Guava",
    scientificName: "Psidium Guajava",
    image: guavaImg,
    uses: "Digestive support, antioxidant support, oral care",
    description: "Guava leaves are commonly used in folk remedies for digestive wellness.",
  },
  {
    id: "pp",
    name: "Pomegranate",
    scientificName: "Punica Granatum",
    image: ppImg,
    uses: "Antioxidant support, digestive support, heart wellness",
    description: "Known for antioxidant-rich leaves and fruit in traditional applications.",
  },
  {
    id: "sa",
    name: "Sandalwood",
    scientificName: "Santalum Album",
    image: saImg,
    uses: "Skin cooling, aromatic calming, traditional anti-inflammatory use",
    description: "Prized for fragrance and cooling traditional preparations.",
  },
  {
    id: "sc",
    name: "Jamun",
    scientificName: "Syzygium Cumini",
    image: scImg,
    uses: "Traditional diabetes support, digestive support, antioxidant support",
    description: "Leaves, bark, and fruit are used in traditional metabolic health practices.",
  },
  {
    id: "sj",
    name: "Rose Apple",
    scientificName: "Syzygium Jambos",
    image: sjImg,
    uses: "Digestive support, antioxidant support, traditional fever support",
    description: "A medicinal tree with aromatic leaves and edible fruit.",
  },
  {
    id: "td",
    name: "Crape Jasmine",
    scientificName: "Tabernaemontana Divaricata",
    image: tdImg,
    uses: "Traditional pain relief, skin care, anti-inflammatory use",
    description: "An ornamental medicinal shrub used in traditional remedies.",
  },
  {
    id: "tf",
    name: "Fenugreek",
    scientificName: "Trigonella Foenum-graecum",
    image: tfImg,
    uses: "Digestive support, metabolic support, lactation support",
    description: "Leaves and seeds are used in cooking and traditional health preparations.",
  },
];

export interface Prediction {
  imageName: string;
  predictedClass: string;
  confidence: number;
}

const classes = plantSamples.map((p) => p.name);

const randomSample = () => plantSamples[Math.floor(Math.random() * plantSamples.length)];

export const mockSinglePrediction = (file: File) => {
  const sample = randomSample();

  return {
    name: sample.name,
    scientificName: sample.scientificName,
    confidence: 0.94 + Math.random() * 0.05,
    description: sample.description,
    uses: sample.uses.split(", "),
    imageUrl: URL.createObjectURL(file),
  };
};

export const mockBatchPrediction = (files: File[]): Prediction[] =>
  files.map((f) => ({
    imageName: f.name,
    predictedClass: classes[Math.floor(Math.random() * classes.length)],
    confidence: 0.85 + Math.random() * 0.14,
  }));

export const modelComparison = [
  { model: "Modified ResNet50", accuracy: 92.4, params: "25.6M", inference: "42ms" },
  { model: "Multi-Scale VenationNet", accuracy: 95.1, params: "18.2M", inference: "38ms" },
  { model: "Dual Stream CNN + CBAM", accuracy: 96.8, params: "31.4M", inference: "55ms" },
  { model: "HybridNet-MSVD (Ours)", accuracy: 98.2, params: "22.7M", inference: "47ms" },
];
