

# 📦 BigBoxSA Client

Frontend for **BigBoxSA**, a modern marketplace platform connecting buyers and sellers in one ecosystem.

Built with:

* React
* TypeScript
* Vite
* Tailwind CSS

---

# 🚀 Features

* ⚡ Fast Vite development environment
* 🎨 Tailwind CSS utility-first styling
* 🔗 REST API integration with backend (Render)
* 📱 Responsive UI for mobile and desktop
* 🧩 Scalable folder structure for production apps

---

# 🧱 Tech Stack

* React 18+
* TypeScript
* Vite
* Tailwind CSS
* Axios (API requests)

---

# 📁 Project Structure

```
client/
 ├── src/
 │   ├── api/            # Axios API layer
 │   ├── assets/         # Images, icons, static files
 │   ├── components/     # Reusable UI components
 │   ├── pages/          # Route pages
 │   ├── layouts/        # Page layouts
 │   ├── hooks/          # Custom hooks
 │   ├── utils/          # Helper functions
 │   ├── App.tsx
 │   ├── main.tsx
 │   └── index.css
 ├── public/
 ├── vite.config.ts
 ├── package.json
 └── tsconfig.json
```

---

# ⚙️ Setup Instructions

## 1. Install dependencies

```bash
npm install
```

---

## 2. Run development server

```bash
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

## 3. Build for production

```bash
npm run build
```

---

## 4. Preview production build

```bash
npm run preview
```

---

# 🌐 Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=https://your-backend.onrender.com
```

---

# 🔌 API Configuration

Axios instance setup:

```ts
// src/api/client.ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
```

---

# 🎨 Tailwind Setup

Tailwind is configured using Vite plugin.

### `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### `src/index.css`

```css
@import "tailwindcss";
```

---

# 🚀 Deployment (Vercel)

This project is deployed on:

Vercel

### Steps:

1. Push code to GitHub
2. Import repo in Vercel
3. Set root directory to:

   ```
   client
   ```
4. Build command:

   ```
   npm run build
   ```
5. Output directory:

   ```
   dist
   ```

---

# 🔗 Backend Integration

Backend API runs on:

* Render (Node.js + Express + MongoDB)

Ensure CORS is configured properly:

```ts
origin: [
  "http://localhost:5173",
  "https://your-vercel-app.vercel.app"
]
```

---

# 🧠 Notes

* Do NOT use localhost in production API calls
* Always use environment variables for API URLs
* Run `npm run build` before deploying

---

# 📌 Future Improvements

* Authentication (JWT)
* Role-based dashboards (buyer/seller/admin)
* Product listing system
* Cart & checkout flow
* Real-time notifications

---

# ⚡ Status

Frontend is in active development and connected to production backend.

