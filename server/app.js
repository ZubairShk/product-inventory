const express = require("express");
const db = require("./config/db.config");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const routes = require("./routes/product.routes");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: "upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

app.use("/product", express.static("upload/images"));
app.post("/fileUpload", upload.single("product"), (req, res) =>
  res.status(201).json({
    success: true,
    message: "file uploaded",
    path_url: `http://localhost:${process.env.PORT}/product/${req.file.filename}`,
  })
);

app.use("/product", routes);

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.listen(process.env.PORT, () =>
  console.log(">---- server started on : port - " + process.env.PORT + "---->")
);
