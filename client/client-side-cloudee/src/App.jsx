import React, { useState, useRef, useEffect } from 'react';
import './DirItemMenu.css';
import {useParams} from 'react-router-dom'
import './App.css'
import axios from 'axios'
import * as serviceAPI from './serviceAPI'


const App = (props)=> {
  const {username} = useParams();
  

  const API = axios.create({
    baseURL : 'http://localhost:3000'
  });
  
  // Files that the user is attempting to upload
  const [userFiles, setUserFiles] = useState([]); // Array of files

  // Location will be the actual structure, location string is what will be passed into the servers
  const [location, setLocation] = useState(["storage", username ]);
  const [locationString, setLocationString] = useState(location.join('/') + '/');

  // Home of the user's storage
  const locationHome = `storage/${username}/`;

  // Files that are in the current directory
  const [dirFiles, setDirFiles] = useState([]);

  // Used to read from the directory on server
  const reload = async ()=>{
    console.log("Reloading: ", locationString);

    let filesArr = await serviceAPI.readFromLocation(locationString);
    setDirFiles(filesArr);
  }

  // Changing location will result in a reload and will update the location string
  useEffect(() =>{
    console.log("Location changed: ", location);
    setLocationString(location.join('/') + '/');
  }, [location]);

  useEffect(()=>{
    reload();
  }, [locationString])


// meatball menu for directory items
const DirItemMenu = ({fileFullName, deletePerm}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
      setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
      }
  };

  useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

  return (
      <div className="meatball-menu" ref={menuRef}>
          <button className="meatball-icon" onClick={toggleMenu}>
              &#x22EE;
          </button>
          {isOpen && (
              <ul className="meatball-dropdown">
                  <li onClick={async ()=>{await serviceAPI.deleteFile(fileFullName, deletePerm ); reload();}}>Delete</li>
                  <li>Option 2</li>
                  <li>Option 3</li>
              </ul>
          )}
      </div>
  );
};


  const DirectoryFiles = ()=>{
    return(

      <div className='directoryDisplayContainer'>
        <button className="dirItem" onClick={()=>{
          // This button takes you back a directory if possible
          if (locationString != locationHome){
            const newLocation = [...location];
            newLocation.pop();
            setLocation(newLocation);
          }
        }}>...</button>

        
        {dirFiles.map((f, index)=>{
          // Go through the files in current directory and assign them as a directory class or normal file
          const className = f.isDirectory? "directory" : "file";
          const fileAttributes = f.isDirectory? 
          {
            className: "directory",
            onClick: () => {
              setLocation([...location, f.file.name])
            }
          } 
          : 
          {
            className: "file",
            onClick: ()=>{

            }
          };
          return (
            <div className="dirItemDiv">
              <button 
                className={"dirItem " + fileAttributes.className} 
                onClick={fileAttributes.onClick}
                onContextMenu={
                  (e)=>{
                    e.preventDefault();
                    console.log("Right Click");
                  }
                }
                >
                {f.file.name}
              
              </button>
              <DirItemMenu fileFullName={`${locationString}${f.file.name}`} deletePerm={false}/>
            </div>

          );
        })}
      </div>
    );
  }




  return (
    <>  
      <h1>Hello {username}.</h1>
      <button onClick={()=>reload()}>Refresh</button>
      <button onClick={()=>{console.log(userFiles)}}> Console.Log userFiles</button>
      <button onClick={()=>{console.log(locationString)}}> Console.Log location</button>



      <form onSubmit={async (event)=>{
        event.preventDefault();
        await serviceAPI.uploadFiles([...userFiles], locationString);
        reload();
      }} method="POST" encType="multipart/form-data">
        <input id='file-input'  multiple type='file' name='file' onChange = {(e)=>{
          setUserFiles(e.target.files);
        }}/>

        <input type='submit' value='Submit'/>
      </form>

      
      <form onSubmit={async (e)=>{
        // Add new folder to list of folders, add it to server storage
        e.preventDefault();
        await serviceAPI.createFolder(e.target.foldername.value, locationString);
        reload()
      }}>

        <label htmlFor='folder-name-input'>Create Folder:</label>
        <input id='folder-name-input' type='text' name='foldername'/>

        <input type='submit' value='Create'/>
      </form>

      <DirectoryFiles/>

    </>
  )
}

export default App
