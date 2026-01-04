# MERN Authentication System 🔐

A full-stack **MERN Authentication Project** with secure user authentication, JWT-based sessions, email support (Gmail), and a modern React frontend. This project is structured with separate **backend** and **frontend** folders and is suitable for learning or production-ready authentication workflows.

---


## 🚀 Features

* User Signup & Login
* JWT Authentication (Access Tokens)
* Secure Password Hashing
* Email Support using Gmail (Password reset / notifications)
* Zustand for global auth state management (frontend)
* Axios with cookies support
* Environment-based configuration
* Clean separation of frontend & backend

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (JSON Web Tokens)
* bcrypt
* Nodemailer
* dotenv

### Frontend

* React (Vite)
* Zustand (State Management)
* Axios
* Tailwind CSS
* Framer Motion

---

## ⚙️ Environment Variables (.env)

Create a `.env` file in the **root directory** and configure the following variables:

```env
MONGO_URI=your_mongodb_connection_string

PORT=5000
JWT_SECRET=mysecretkey
NODE_ENV=development

GMAIL_USER=yourgmail@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password

CLIENT_URL=http://localhost:5173
```

### 🔑 Variable Explanation

| Variable             | Description                                 |
| -------------------- | ------------------------------------------- |
| `MONGO_URI`          | MongoDB connection string                   |
| `PORT`               | Backend server port                         |
| `JWT_SECRET`         | Secret key for signing JWT tokens           |
| `NODE_ENV`           | Environment mode (development / production) |
| `GMAIL_USER`         | Gmail address used to send emails           |
| `GMAIL_APP_PASSWORD` | Gmail App Password (not normal password)    |
| `CLIENT_URL`         | Frontend URL for CORS & redirects           |

> ⚠️ **Important:** Use a Gmail **App Password**, not your normal Gmail password.

---

## 📦 Installation

1️⃣ Install Root Dependencies

From the root folder, run: 
npm install

2️⃣ Start Backend Server

Go to the backend folder:

cd backend
npm run dev


3️⃣ Setup & Start Frontend

Open a new terminal, then:

cd frontend
npm install
npm run dev

Frontend will run on:

http://localhost:5173
