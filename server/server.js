const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = 3000;


app.use(cors());

//configure multer middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination directory for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original filename
    }
});
const upload = multer({storage: storage});

app.get("/", (req, res) =>{
    res.send("Bello World ;)");
});

app.get("/uploads", (req, res)=>{
    res.send("This is where your uploads would be");
})

app.post("/upload_file_single", upload.single('file'), (req, res) =>{
    res.send("File uploaded");
})



app.listen(PORT, ()=>{console.log("Listening at port " + PORT)});

