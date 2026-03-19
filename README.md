# ⚙️ Expense Tracker Backend

A secure backend API for the Expense Tracker application built using Node.js, Express, and MongoDB with JWT-based authentication.

---

## 🚀 Features

* 🔐 JWT-based authentication
* 🔒 Password hashing using bcrypt
* 📊 Manage income and expenses
* 📁 File upload support (Multer)
* 📄 Export data using XLSX
* 🌐 RESTful API design
* 🛡️ Secure and scalable architecture

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (Authentication)
* Bcrypt.js (Password hashing)
* Multer (File uploads)
* XLSX (Data export)

---

## 📂 Project Structure

```bash
|--api/
|  └── server.js     # Entry point
│
├── models/          # Database schemas
├── controllers/     # Business logic
├── routes/          # API endpoints
├── middleware/      # Auth middleware
├── config/          # DB configuration
       
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/iparigoel/expense_tracker-backend.git
cd expense-tracker-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

---

## ▶️ Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

Server runs on:

```
http://localhost:3000
```

---

## 🔑 API Overview

### Authentication

* Register user
* Login user

### Transactions

* Add income
* Add expense
* Get recent transactions
* Get all transactions

### Additional Features

* Upload files (if used)
* Export data to Excel

---

## 🔐 Security Features

* Password hashing using bcrypt
* JWT token verification
* Protected routes with middleware

---

## 📌 Future Improvements

* Rate limiting
* Email verification
* Role-based access
* API documentation (Swagger)

---

## 🤝 Contributing

Feel free to fork and contribute!

---

## 📄 License

MIT License
