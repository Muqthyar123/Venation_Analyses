# VenaLeaf AI 🌿

**Venation-Aware Multi-Modal Deep Learning for Medicinal Plant Species Recognition**

A modern, responsive frontend for an IEEE final-year research project that identifies medicinal plants using leaf venation patterns and deep learning.

## ✨ Features
- 🏠 Animated hero landing page with stats and workflow
- 📖 Detailed About page (models, preprocessing, accuracy table)
- 🔍 Single image prediction with drag-and-drop + venation/edge previews
- 📦 Multi-image batch prediction with progress bar + CSV export
- 🌱 Searchable sample dataset library
- ☎️ Contact page
- 🌗 Dark / light mode toggle
- 📱 Fully responsive with mobile hamburger menu
- 💎 Glassmorphism + soft shadows + smooth animations

## 🛠 Tech Stack
- React 19 + TanStack Start (file-based routing)
- Tailwind CSS v4 with OKLCH design tokens
- Lucide icons
- Mock API layer in `src/lib/api.ts` (swap with real endpoints)

## 📁 Structure
```
src/
├── assets/            # Hero image
├── components/        # Navbar, Footer, UploadDropzone, SectionHeader
├── hooks/             # useTheme
├── lib/
│   ├── api.ts         # API service (predictSingle, predictMultiple)
│   └── mock-data.ts   # Sample plants + mock predictions
├── routes/            # /, /about, /single, /multi, /dataset, /contact
└── styles.css         # Design tokens + utilities
```

## 🔌 API Integration
Replace mock calls in `src/lib/api.ts`:
- `POST /predict-single` — returns `{ name, confidence, description, uses }`
- `POST /predict-multiple` — returns array of `{ imageName, predictedClass, confidence }`

Set `VITE_API_URL` in your env to point to your backend.

## 🎨 Design System
All colors live in `src/styles.css` as OKLCH tokens. Edit `:root` / `.dark` to retheme — never hardcode colors in components.
