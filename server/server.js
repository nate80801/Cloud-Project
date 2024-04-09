const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;


const upload = require('./upload');

app.use(cors());



app.get("/", (req, res) =>{
  try {
    res.send("Bello World ;)");
    console.log("Basic get-test was gotten");
  }
  catch (e) {
    console.error("Basic get test error occured: ", e.message);
  }  
});

app.get("/uploads", (req, res)=>{
  try {res.send("This is where your uploads would be");}
  catch (e) {
    console.error("Error getting files from server: ", e);
  }
})

app.post("/upload_file_single", upload.single('file'), (req, res) =>{
  try  {res.send("File uploaded");}
  catch (e) {
    console.error("Single file upload error: ", e);
  }
})

app.post("/upload_files", upload.array('file'), (req, res) =>{
  try {
    console.log(req.files.length + ' files added');
    res.send("Files uploaded successfully");
  }
  catch(e){
    console.error("File upload error: ", e);
  }
})



app.listen(PORT, ()=>{console.log("Listening at port " + PORT)});

