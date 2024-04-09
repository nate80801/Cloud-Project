const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({ // middleware
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); //where things will be stored
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // make sure not to change filename
    }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload; // to be used in server.js

