require("dotenv").config();
const express = require ("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.json());
const connectDB =  require("./config/db");
const authRoutes =  require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// connectDB();

let isConnected = false;
async function connectToMongoDB(){
  try{
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  }catch(error){
    console.error("MongoDB connection failed:", error);
  }
}
//add middleware
app.use((req, res, next) => {
  if(!isConnected){
    connectToMongoDB();
  }next();
});

//Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
// error handler
app.use((err, req, res, next) => {
  console.error('Upload error:', err);
  return res.status(400).json({
    message: err.message || "Upload error",
  });
});



// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

module.exports = app;