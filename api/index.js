const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const app = express();
const jwtSecret = "someRandomStringYouCanEnterHere";
const { verifyToken } = require("./middleware");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Connecting to Mongoose
if (process.env.NODE_ENV != "test") {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to DB successfully!");
    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(time);
  } catch {
    console.error("Error occurred while connecting to DB");
  }
}

app.get("/", (req, res) => {
  res.status(200).json("working");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
    });
    res.status(200).json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passwordIdValid = bcrypt.compareSync(password, userDoc.password);
    if (passwordIdValid) {
      jwt.sign({ id: userDoc._id }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token)
          .json({ userDoc, message: "Login Successful" });
      });
    } else {
      res.status(401).json({
        accessToken: null,
        message: "Invalid Password",
      });
    }
  } else {
    res.status(404).json("User not found");
  }
});

app.get("/profile", verifyToken, (req, res) => {
  if (!req.user && req.message === null) {
    return res.status(403).json({
      message: "Invalid JWT Token",
    });
  } else if (!req.user && req.message !== null) {
    return res.status(403).json({
      message: req.message,
    });
  }
  const {name, email, _id} = req.user;
  res.status(200).json({name, email, _id});
});

app.listen(4000);
