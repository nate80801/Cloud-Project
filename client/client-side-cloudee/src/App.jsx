import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


function App() {

  const API = axios.create({
    baseURL : 'http://localhost:3000'
  });

  const [userFiles, setUserFiles] = useState([]) // Array of files

  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState(''); // Name of folder the user wants to create

  const FolderComponent = ()=>{
    return(
      <ul>
        {folders.map((folder,index)=> (<li key={index}>{folder}</li>))}
      </ul>
    );
  };


  

  const basicGetTest = ()=>{
  API.get('/')
  .then(response =>{ //Promise approach
    console.log('Get successful: ', response.data);
  })
  .catch(error=>{
    console.log('Get ERROR: ', error);})
  };


  const handleSubmit = async (event) =>{
    event.preventDefault();

    const formData = new FormData();
    [...userFiles].map((file, ind)=>{
      formData.append('file', file);
    })

    try{
      const response = await API.post('/upload_files', formData); //async approach to api calls
      console.log(response.data);
    } catch(error) {
      console.log("Error uploading: ", error);
    }
  };





  return (
    <>
      <h1>Hello World</h1>
      <button onClick={basicGetTest}>Get Test</button>
      <button onClick={()=>{console.log(userFiles)}}> Console.Log userFiles</button>
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">

        <input id='file-input'  multiple type='file' name='file' onChange = {(e)=>{
          console.log("type: " + e.type);
          console.log(e.target.files);
          setUserFiles(e.target.files);
        }}/>

        <input type='submit' value='Submit'/>
      </form>

      
      <form onSubmit={(e)=>{
        e.preventDefault();
        setFolders([...folders, e.target.foldername.value]);
      }}>

        <label htmlFor='folder-name-input'>Create Folder:</label>

        <input id='folder-name-input' type='text' name='foldername' onChange={(e) =>{
          setFolderName(e.target.foldername);
        }}/>

        <input type='submit' value='Create'/>
      </form>
      <FolderComponent/>

    </>
  )
}

export default App
