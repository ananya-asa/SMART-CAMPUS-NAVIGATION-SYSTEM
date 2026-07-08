# 🧭 MAARGAM – Smart Campus Navigation System

<p align="center">
  <img src="public/NObg.png" width="180" alt="MAARGAM Logo">
</p>

<h3 align="center">
Navigate Smarter. Reach Faster.
</h3>

<p align="center">
An intelligent campus navigation platform built for <strong>St Joseph Engineering College (SJEC), Vamanjoor</strong>.
</p>

<p align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge\&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge\&logo=vite)
![Mapbox](https://img.shields.io/badge/Mapbox-GL%20JS-black?style=for-the-badge\&logo=mapbox)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

</p>

---

# 📖 About

**MAARGAM** is a smart campus navigation platform developed for **St Joseph Engineering College (SJEC), Vamanjoor**.

The application enables students, faculty, visitors, and staff to navigate the campus effortlessly using real-time GPS tracking, shortest-path routing, interactive indoor navigation, and an immersive 3D campus map.

Designed as a **Progressive Web Application (PWA)**, MAARGAM provides a seamless experience across desktops and mobile devices while making campus exploration intuitive, fast, and reliable.

---

# ✨ Features

## 🗺️ Outdoor Campus Navigation

Explore the entire SJEC campus through an interactive Mapbox-powered map.

### Highlights

* Interactive 3D campus map
* 40+ mapped campus locations
* Smart location search
* Dark masked campus boundary
* Smooth fly-to animations
* Multiple viewing modes

Supported Views

* 🌍 3D View
* 🛰 Satellite View
* 🌙 Night Mode
* 🗺 Classic 2D

---

## 🚶 Intelligent Route Planning

Plan the shortest walking route between any two campus locations.

Features include

* Dijkstra's shortest-path algorithm
* Walking distance calculation
* Estimated travel time
* Automatic nearest-node detection
* Optimized campus graph routing

---

## 📍 Live GPS Tracking

Real-time user location tracking using the browser's Geolocation API.

Features

* Live GPS marker
* Heading indicator
* Accuracy circle
* Campus boundary detection
* Automatic route updates

---

## 🏢 Indoor Navigation

Navigate inside Academic Blocks with ease.

Supported Features

* Room search
* Floor-wise navigation
* Faculty cabin locator
* Step-by-step directions
* Stair guidance
* Room information

Supports

* Academic Block 2
* Academic Block 3

---

## 👨‍🏫 Faculty Locator

Quickly locate faculty cabins and staff rooms.

Search using

* Faculty name
* Cabin number
* Department
* Staff room

---

## 👥 Role-Based Experience

Choose your campus role before entering.

Available Roles

* 🎓 Student
* 👨‍🏫 Faculty
* 👤 Visitor
* 🛡 Admin

Each role enters the same navigation system with contextual identification.

---

## 📱 Progressive Web App

Install MAARGAM like a native application.

Features

* Offline-friendly caching
* Fast loading
* Mobile optimized
* Installable on Android
* Secure HTTPS support

---

# 📸 Screenshots

<img width="1919" height="1029" alt="Screenshot 2026-07-08 202639" src="https://github.com/user-attachments/assets/fb71586b-48d4-4aba-ae5f-e41f2a75e978" />
<img width="1917" height="1027" alt="Screenshot 2026-07-08 202650" src="https://github.com/user-attachments/assets/171fcc51-05fa-4bdd-841c-d5e2767a70d7" />
<img width="1916" height="1022" alt="Screenshot 2026-07-08 202722" src="https://github.com/user-attachments/assets/62e122a8-1db2-4c18-8b61-ddbea40e157c" />


# 🛠 Tech Stack

### Frontend

* React 18
* Vite 7
* React Router 7

### Maps & Navigation

* Mapbox GL JS
* Dijkstra's Algorithm
* Geolocation API

### UI

* Lucide React
* Lottie React

### Progressive Web App

* vite-plugin-pwa

---

# 🏗 Architecture

```text
User
   │
   ▼
Welcome Screen
   │
   ▼
Role Selection
   │
   ▼
Interactive Map
   │
   ├── Search
   ├── GPS Tracking
   ├── Route Planner
   ├── Indoor Navigation
   └── Faculty Locator
           │
           ▼
Campus Data (JSON)
           │
           ▼
Shortest Path Engine
           │
           ▼
Mapbox Rendering
```

---

# 📂 Project Structure

```text
sjec-campus-nav/

├── public/
│   ├── campus-data.json
│   ├── indoor-data.json
│   └── NObg.png
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── MapView.jsx
│   │   └── LottieAnimation.jsx
│   │
│   ├── pages/
│   │   ├── Welcome.jsx
│   │   ├── SelectRole.jsx
│   │   └── MapPage.jsx
│   │
│   ├── constants/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── vite.config.js
└── package.json
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/sjec-campus-nav.git
```

## Install Dependencies

```bash
npm install
```

## Configure Environment

Create a `.env` file.

```env
VITE_MAPBOX_TOKEN=your_public_mapbox_token
```

## Start Development Server

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

---

# 🔄 Application Workflow

```text
Welcome Screen
        │
        ▼
Role Selection
        │
        ▼
Interactive Campus Map
        │
        ├── Search Location
        ├── Plan Route
        ├── Track GPS
        ├── Indoor Navigation
        └── Faculty Locator
```

---

# 🌟 Highlights

* 🗺 Interactive 3D Campus Map
* 📍 Live GPS Navigation
* 🚶 Shortest Path Routing
* 🏢 Indoor Room Navigation
* 👨‍🏫 Faculty Locator
* 🔍 Smart Search
* 📱 Progressive Web App
* ⚡ Fast React + Vite Architecture

---

# 🔮 Future Enhancements

* Voice Navigation
* Turn-by-Turn Walking Guidance
* Classroom Timetable Integration
* Event & Seminar Navigation
* Parking Availability
* Emergency Assistance
* Accessibility Routes
* Multi-language Support
* QR Code Building Navigation
* AI-Powered Campus Assistant

---

# 🤝 Contributing

Contributions are always welcome!

1. Fork this repository
2. Create a feature branch

```bash
git checkout -b feature/YourFeature
```

3. Commit your changes

```bash
git commit -m "Add Your Feature"
```

4. Push to your branch

```bash
git push origin feature/YourFeature
```

5. Open a Pull Request

---



# 💡 Inspiration

> *"Finding your destination should never be confusing."*

MAARGAM was built to simplify campus navigation by combining interactive maps, real-time location services, intelligent routing algorithms, and modern web technologies into one seamless experience.

---

## ⭐ Support

If you found this project useful or interesting, consider giving it a **⭐ Star** on GitHub. Your support encourages future improvements and new features.
