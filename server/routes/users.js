// users.js

const express = require('express');
const fs = require('fs');
const router = express.Router();

const userListPath = '/home/mono/Documents/side-ops/cloud-strive/server/data/userlist.json';



// Define user routes
router.get('/list', async (req, res) => {
    // TODO: Print out a list of users
    fs.readFile(userListPath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Error reading users');
    }
    res.json(JSON.parse(data));
    });
});


router.post('/newuser', (req, res) => {
    // TODO: Add to JSON data
    console.log("request body: \n", req.body);

    if(!req.body) console.error("Could not retrieve new user's name");
    const new_user = req.body.new_user;

    // response should be a string i guess
    fs.readFile(userListPath, 'utf-8', (err, data)=>{
        if(err) console.error(err);

        // Write to the data 
        const data_object = JSON.parse(data); //turn data into a javascript object
        data_object.users = [...data_object.users, req.body.new_user]
        
        // Add to json data of users
        fs.writeFile(userListPath, JSON.stringify(data_object), 'utf-8', (err)=>{
            if(err) console.log(err);
            res.send("Post request: Written successfully to userlist.json");
        });

        //Lastly, create a directory for the user
        fs.mkdir(`storage/${req.body.new_user}/`, (err)=>{
            if(err) console.error(err);
            else console.log("Created directory for new user");
        })
        
    })
});


router.put('/edituser', (req, res) => {
    // TODO: Edit an existing user
})

router.delete('deleteuser', (req, res)=>{
    // TODO: delete a user
})



router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send(`User ID: ${userId}`);
});

module.exports = router;