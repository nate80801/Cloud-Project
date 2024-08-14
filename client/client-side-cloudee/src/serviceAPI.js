import './App.css'
import axios from 'axios'



const API = axios.create({
    baseURL : 'http://localhost:3000'
});

// Pass in the event, array of files, and location to upload
// Submit functions should pass in the event
export const uploadFiles = async (files, location) =>{

    const formData = new FormData();

    files.map((file, ind) =>{
        formData.append('file', file);
    })

    formData.append('location', location);

    try{
        const response = await API.post('/upload_files', formData); //async approach to api calls
        console.log(response.data);
    } catch(error) {
        console.log("Error uploading: ", error);
    }
}

// Create a folder with foldername in given location
export const createFolder = async (folderName, location) => {

    let folderPath = location + folderName;
    try{
        const response = await API.post('/mkdir', {'folderName': folderPath});
        console.log(response.data);
    } catch(error) {
        console.log("Error creating new folder: ", error);
    }
}

// Given the location return all content
export const readFromLocation = async (location) => {
    try{
        const response = await API.get('/ls', {params: {location: location}});
        return(response.data);
    } catch(error) {
        console.log("Error reading from location: ", error)
    }
}

export const deleteFile = async (fileFullName, deletePerm) => {
    try {
        console.log("Deleting file: ", fileFullName);
        const response = await API.delete('/singleFile', {data: {fileFullName: fileFullName , deletePerm: deletePerm}});
        return response.data;
    } catch (error) {
        console.log("Error deleting a file: ", error);
    }
}  
