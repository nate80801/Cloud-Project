import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


function App() {

  const API = axios.create({
    baseURL : 'http://localhost:3000'
  });

  const [userFiles, setUserFiles] = useState() // ARray of files
  
  const handleSubmit = (userFile)=>{
    let formData = new FormData();
    formData.append('file', userFile);


    // Post to the server
    API.post('/upload_file_single', formData)
    .then(response => {
      console.log('File upload successfully: ', response.data);
    })
    .catch(error => {
      console.log('File upload ERROR: ', error);
    })
    
  }

  return (
    <>
      <h1>Hello World</h1>
      <button onClick={()=>{
        API.get('/')
        .then(response =>{
          console.log('Get successful: ', response.data);
        })
        .catch(error=>{
          console.log('Get ERROR: ', error);
        })
      }}>Get Test</button>
      <form onSubmit={(event)=> {event.preventDefault(); handleSubmit(userFiles);}} method="POST" encType="multipart/form-data">
        <input id='single-file' display="display: none;" type='file' name='file' onChange = {(e)=>{
          console.log("type: " + e.type);
          setUserFiles(e.target.files[0]);
        }}/>
        <input type='submit' value='Submit'></input>
      </form>

    </>
  )
}

export default App
