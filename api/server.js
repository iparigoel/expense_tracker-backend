// require("dotenv").config();
// const express = require ("express");
// const cors = require("cors");
// const path = require("path");
// const app = express();
// const mongoose = require("mongoose");
// app.use(express.json());
// // const connectDB =  require("./config/db");
// const authRoutes =  require("../routes/authRoutes");
// const incomeRoutes = require("../routes/incomeRoutes");
// const expenseRoutes = require("../routes/expenseRoutes");
// const dashboardRoutes = require("../routes/dashboardRoutes");
// app.use(
//     cors({
//         origin: process.env.CLIENT_URL || "*",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//     })
// );

// // connectDB();

// let isConnected = false;
// async function connectToMongoDB(){
//   try{
//     await mongoose.connect(process.env.MONGO_URL, {
//       serverSelectionTimeoutMS: 10000,
//       socketTimeoutMS: 45000,
//       keepAlive: true,
//       keepAliveInitialDelay: 300000,
//     });
//     isConnected = true;
//     console.log("MongoDB connected successfully");
//   }catch(error){
//     console.error("MongoDB connection failed:", error);
//   }
// }
// connectToMongoDB();
// //add middleware
// // app.use((req, res, next) => {
// //   if(!isConnected){
// //     connectToMongoDB();
// //   }next();
// // });

// // async function connectToMongoDB() {
// //   if (isConnected) return;

// //   try {
// //     const db = await mongoose.connect(process.env.MONGO_URL);
// //     isConnected = db.connections[0].readyState;
// //     console.log("MongoDB connected successfully");
// //   } catch (error) {
// //     console.error("MongoDB connection failed:", error);
// //   }
// // }


// //Server uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/income", incomeRoutes);
// app.use("/api/v1/expense", expenseRoutes);
// app.use("/api/v1/dashboard", dashboardRoutes);
// // test route
// app.get("/api/test", (req, res) => {
//   res.json({ message: "Backend live!" });
// });
// // error handler
// app.use((err, req, res, next) => {
//   console.error('Upload error:', err);
//   return res.status(400).json({
//     message: err.message || "Upload error",
//   });
// });



// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

// module.exports = (req, res) => {
//   app(req, res);
// };
// // module.exports = async (req, res) => {
// //   await connectToMongoDB();
// //   app(req, res);
// // };

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Import Routes
// Since server.js is in 'api/' and routes are in 'routes/', going back one level (../) is CORRECT.
const authRoutes = require("../routes/authRoutes");
const incomeRoutes = require("../routes/incomeRoutes");
const expenseRoutes = require("../routes/expenseRoutes");
const dashboardRoutes = require("../routes/dashboardRoutes");

// Database Connection
let isConnected = false;
async function connectToMongoDB() {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

// FIX: Uploads folder path
// __dirname is '.../backend/api'. We need to go up to '.../backend/uploads'
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend Live on Vercel" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  return res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

// CRITICAL FIX: Export for Vercel
// We await the DB connection inside the handler so the request doesn't fail
module.exports = async (req, res) => {
  await connectToMongoDB();
  app(req, res);
};