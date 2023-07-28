const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/Users");
const Package = require("./models/Package");
const downloader = require("image-downloader");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const app = express();
const jwtSecret = "someRandomStringYouCanEnterHere";
const { verifyToken } = require("./middleware");
const Booking = require("./models/Booking");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
// To be used to upload files from client to uploads folder
app.use(express.static(`${__dirname}/uploads`));
const photosMiddleware = multer({ dest: "uploads" });
app.use(cors(corsOptions));
app.use(cookieParser());
//To show the uploaded media through browser
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
  const { name, email, _id } = req.user;
  res.status(200).json({ name, email, _id });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  //Using the library image-downloader
  const newName = "photo" + Date.now() + ".jpg";
  await downloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.status(200).json(newName);
});

app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  // Using multer Library to upload photos from client
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname, filename } = req.files[i];
    const newFileName =
      "photo" + Date.now() + "." + originalname.split(".").slice(-1);
    const newPath = "uploads/" + newFileName;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newFileName);
  }
  res.json(uploadedFiles);
});

app.post("/places", verifyToken, async (req, res) => {
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    price,
  } = req.body;

  try {
    const placeDoc = await Package.create({
      owner: req.user._id,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      price,
    });

    return res.status(200).json(placeDoc);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.put("/package", verifyToken, (req, res) => {
  const {
    id,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    price,
  } = req.body;

  Package.findById(id)
    .then((placeDoc) => {
      if (req.user._id == placeDoc.owner.toString()) {
        placeDoc.set({
          title,
          address,
          photos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          price,
        });
        placeDoc.save();
        return res.status(200).json("Document Updated");
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json("Invalid ID");
    });
});

app.get("/owner-packages", verifyToken, async (req, res) => {
  const id = req.user._id;
  const response = await Package.find({ owner: id });
  return res.status(200).json(response);
});

app.get("/packages/:id", async (req, res) => {
  const { id } = req.params;
  Package.findById(id)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

app.get("/packages", async (req, res) => {
  const pack = await Package.find();
  res.status(200).json(pack);
});

app.post("/bookings", (req, res) => {
  const { packageId, name, email, number, price } = req.body;
  Booking.create({
    packageId,
    name,
    email,
    number,
    price,
  })
    .then((res) => {
      res.status(200).json(res);
    })
    .catch((err) => {
      res.status(500).json("Error Occurred");
    });
});

app.listen(4000);
