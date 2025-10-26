# 🧩 Multi-Framework Ticket Management Application

This repository contains **three distinct implementations** of a full-featured **Ticket Management Web Application**, built with **React**, **Vue.js**, and a **server-side Twig (PHP)** setup.  
The core challenge was to **enforce a uniform layout, design language, and user experience** across all three technology stacks.

The application includes:

- A landing page
- A secure (simulated) authentication system
- A high-level dashboard
- A full **CRUD** interface for managing tickets (Create, Read, Update, Delete)

---

## 📁 Project Structure

The repository is organized into separate directories for each implementation, plus a folder for shared assets:

```arduino
/ticket-management-app
├── /react-app # React + Vite + Tailwind CSS implementation
├── /vue-app # Vue.js + Vite + Tailwind CSS implementation
├── /twig-app # Twig + PHP + Tailwind CSS implementation
├── /shared-assets # SVGs and images used across all projects
└── README.md # This file
```

---

## 🚀 How to Run an Implementation

Each implementation is **self-contained**.  
To run a specific version, navigate to its directory and follow the setup instructions in its local `README.md` file.

### Example for React:

```bash
cd react-app
npm install
npm run dev
```

### Example for Vue:

```bash
cd vue-app
npm install
npm run dev
```

### Example for Twig/PHP:

```bash
cd twig-app
composer install
npm install
# In one terminal, run the CSS watcher
npm run watch
# In another terminal, run the PHP server
php -S localhost:8000 -t public
```

### 🖼️ /shared-assets/

This folder contains assets that are identical across all three implementations to maintain visual consistency.

```arduino
/shared-assets
├── hero-wave.svg             # The wavy background for the hero section
├── decorative-circle-1.svg   # A decorative circle element
├── decorative-circle-2.svg   # Another decorative circle
└── ... (other shared images or icons)
```
