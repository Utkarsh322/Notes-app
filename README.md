# Indigo Notes 🚀

A high-performance, ultra-premium full-stack notes application built with **React Native (Expo)** and **Node.js**, featuring a stunning **Indigo & Midnight** aesthetic.

![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React Native](https://img.shields.io/badge/React_Native-0.83.2-61DAFB.svg?logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-55.0.6-000020.svg?logo=expo&logoColor=white)

## ✨ Features

- **Indigo Midnight Theme**: A sleek, high-contrast dark mode using deep slate and vibrant violet accents.
- **Premium UI/UX**: Custom-designed components with soft shadows, glassmorphism borders, and refined typography.
- **Secure Authentication**: JWT-based Signup and Login with persistent session management.
- **Dynamic Workspaces**: Personal note management with instant search and category tagging.
- **Fluid CRUD Operations**: Seamlessly create, edit, and manage thoughts with an intuitive interface.
- **Cross-Platform**: Optimized experience for both iOS and Android using Expo.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **State**: React Context API
- **Navigation**: React Navigation v7
- **Icons**: Lucide React Native
- **Styling**: Native StyleSheet with Indigo Tokens

### Backend
- **Engine**: Node.js & Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: JWT, Bcrypt.js
- **Architecture**: MVC Pattern

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- MongoDB (Local or Atlas)
- Expo Go (For mobile testing)

### 1. Backend Setup
1. `cd backend`
2. `npm install`
3. Configure `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/indigo-notes
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
4. `npm run dev`

### 2. Frontend Setup
1. `cd frontend`
2. `npm install`
3. Update `src/services/api.ts` with your machine's local IP address.
4. `npx expo start`

## 📁 Project Structure

```
.
├── backend/             # Express API
│   ├── models/          # Mongoose Schemas
│   ├── routes/          # API Endpoints
│   └── server.js        # Entry Point
└── frontend/            # React Native App
    ├── src/
    │   ├── theme/       # Design System Tokens
    │   ├── components/  # Atomic UI Components
    │   ├── screens/     # Screen-level Logic
    │   └── context/     # Global State Management
    └── App.tsx          # Main Entry
```

---
Elevated by **Antigravity** 🌌
