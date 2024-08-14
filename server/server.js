const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const PORT = 3000;



const upload = require('./upload'); // multer module,
const userRouter = require('./routes/users'); // route for users

app.use(bodyParser.json());
app.use(cors());
app.use('/users', userRouter);





app.get("/", (req, res) =>{
  // Use (or don't use) to test connection to the server
  try {
    res.send("Bello World ;)");
    console.log("Basic get-test was gotten");
  }
  catch (e) {
    console.error("Basic get test error occured: ", e.message);
  }  
});

// Caller must provide location
// Used to list all files in a given location
app.get("/ls", (req, res)=>{
  
  console.log("Reading from location: ", req.query.location);
  let resFiles = [];
  // withFileTypes configuration will make sure that resFile is objects not just the file names
  fs.readdir(req.query.location,{withFileTypes: true}, (err, files) => {
    if (err)
      console.log("Error reading uploads: ", err);
    else {
      files.map((file)=>{
        resFiles.push({"file" : file, "isDirectory" : file.isDirectory()});
      })
      res.send(resFiles);
    }
  })
})

// Used to create a new folder given a folderName (name including path)
app.post("/mkdir" , (req, res) => {
  console.log("Trying to create folder: ", req.body.folderName);
  fs.mkdir(req.body.folderName, (err)=>{
    if (err){
      console.log("/mkdir error: ", err);
    }
    else res.send("Successfuly created folder: " + req.body.folderName);
  });
})



// Upload file(s) to a given location
app.post("/upload_files", upload.array('file'), (req, res) =>{
  try {
    console.log(req.files.length + ' files added');
    console.log(req.files);
    res.send("Files uploaded successfully");

    req.files.forEach( (file)=>{
      console.log("old path: ", file.path);
      console.log("Moving...");
      
      
      
      fs.rename(file.path, req.body.location + file.filename, (err=>{
        if(err) console.error(err);
        else console.log("new path: ", file.path);
      }));

    })
    
    

  }
  catch(e){
    console.error("File upload error: ", e);
  }
})

// Delete a singular file/directory
app.delete("/singleFile", (req, res) => {
  fs.rm(req.body.fileFullName, {recursive: true}, (err)=>{
    if(err){
      console.log("/singleFile: error deleting: ", err);
      return;
    }
    
    res.send(("Successfully deleted: " + req.body.fileFullName));
  })
})



app.listen(PORT, ()=>{console.log("Listening at port " + PORT)});

