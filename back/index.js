const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
var cors = require('cors')

app.use(cors({
  origin: 'http://localhost:3000'
}));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.array("files"), (req, res) => {
  const text = req.body.text;
  const files = req.files;

  // Write the files to the file system
  files.forEach((file) => {
    if (file.buffer) {
      fs.writeFile(`uploads/${file.filename}`, file.buffer, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      console.error("Error: file buffer is undefined");
    }
  });

  // Do something with the text here
  // ...

  res.send({ message: "Upload successful" });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});

