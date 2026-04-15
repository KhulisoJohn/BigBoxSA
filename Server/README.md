

# 🚀 BigBoxSA Server API

Backend API for **BigBoxSA**, a full-stack marketplace platform that connects buyers and sellers, manages inventory, and supports scalable business operations.

Built using a **modular architecture** for scalability, maintainability, and production readiness.

---

# ⚙️ Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB (Mongoose)
* JWT Authentication
* Winston Logger
* Zod / Express Validator
* Helmet (Security)
* CORS

---

# 🧱 Architecture

This project follows a **modular / feature-based architecture**:

```id="arch1"
src/
 ├── config/         # Database, CORS, environment setup
 ├── modules/        # Feature modules (auth, users, products, etc.)
 │    ├── auth/
 │    ├── users/
 │    ├── products/
 │    └── orders/
 ├── middleware/     # Global middleware (auth, error handling, validation)
 ├── utils/          # Helper functions (logger, JWT, errors)
 ├── app.ts          # Express app setup
 └── server.ts       # Entry point
```

---

# 🚀 Features

* 🔐 JWT Authentication (secure login system)
* 🧾 Modular feature-based structure
* 🛡️ Security middleware (Helmet, CORS, rate limiting)
* 📊 Centralized logging (Winston)
* ⚡ Global error handling
* 🌐 RESTful API design
* 🗄️ MongoDB integration with Mongoose
* 📦 Scalable module system (easy feature expansion)

---

# ⚙️ Installation

## 1. Clone repository

```bash id="srv1"
git clone https://github.com/your-repo/BigBoxSA.git
cd Server
```

---

## 2. Install dependencies

```bash id="srv2"
npm install
```

---

## 3. Setup environment variables

Create a `.env` file:

```env id="srv3"
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

## 4. Run development server

```bash id="srv4"
npm run dev
```

Server runs on:

```
http://localhost:8080
```

---

## 5. Build for production

```bash id="srv5"
npm run build
```

---

## 6. Start production server

```bash id="srv6"
npm start
```

---

# 🌐 API Health Check

```http
GET /health
```

Response:

```json id="srv7"
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2026-04-15T12:00:00.000Z"
}
```

---

# 🔐 Authentication Flow (Planned / Active Modules)

* Register user
* Login user
* JWT token issuance
* Protected routes via middleware
* Role-based access control (buyer / seller / admin)

---

# 🧠 Middleware System

* `errorHandler` → centralized error handling
* `notFound` → 404 route handler
* `authMiddleware` → JWT validation
* `validateRequest` → input validation layer

---

# 🗄️ Database

MongoDB is used with Mongoose.

Connection handled in:

```
src/config/database.ts
```

Features:

* Auto reconnect
* Connection logging
* Timeout handling

---

# 🧪 Logging

Uses Winston logger:

* Console logging (dev)
* File logging (errors)

Logs stored in:

```
/logs/error.log
```

---

# 🚀 Deployment

Backend deployed on:

Render

### Build settings:

* Build command:

```bash
npm install && npm run build
```

* Start command:

```bash
npm start
```

* Root directory:

```
Server
```

---

# 🔐 Security Features

* Helmet (HTTP headers protection)
* CORS whitelist
* Rate limiting (express-rate-limit)
* Password hashing (bcrypt)
* JWT authentication

---

# 📌 Environment Variables

| Variable   | Description               |
| ---------- | ------------------------- |
| PORT       | Server port               |
| MONGO_URI  | MongoDB connection string |
| JWT_SECRET | Token signing secret      |
| NODE_ENV   | Environment mode          |

---

# 📈 Future Improvements

* Product service module
* Order management system
* Payment integration (optional)
* Real-time notifications (WebSockets)
* Admin dashboard APIs
* Audit logging system

---

# ⚡ Status

Backend is actively in development and already connected to production database and frontend.

---

# 💥 Summary

This is a **modular, production-ready Node.js backend** designed for scalability, not a tutorial project.

