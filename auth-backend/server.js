require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// impoirt routes
const authRoutes = require("./routes/authRoutes");

// mount routes

app.use("/api/auth", authRoutes);

// import req packages

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

// connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));


// signup API

// app.post("/api/auth/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
      
//       email,
//       password: hashedPassword 
//     });

//     await user.save();

//     res.json({
//       message: "User registered successfully ✅"
//     });

//   } catch (error) {
//     res.status(500).json({ error: "Signup failed" });
//   }
// });

// login API
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { userId: user._id },
//       "secretkey",
//       { expiresIn: "1h" }
//     );

//     res.json({
//       message: "Login successful ✅",
//       token: token
//     });

//   } catch (error) {
//     res.status(500).json({ error: "Login failed" });
//   }
// });

//  verify token middleware

// const verifyToken = (req, res, next) => {
//   const token = req.headers["authorization"];

//   if (!token) {
//     return res.status(403).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, "secretkey");

//     req.userId = decoded.userId;

//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // 👈 extract real token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};


// create protected route

app.get("/api/auth/profile", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to protected route 🔐",
    userId: req.userId
  });
});

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

