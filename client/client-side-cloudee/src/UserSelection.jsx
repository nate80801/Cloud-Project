import { useState, useEffect } from "react";
import App from "./App.jsx";
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import axios from 'axios'
import './UserSelection.css'



function UserSelection() {


    const API = axios.create({
        baseURL : 'http://localhost:3000/users'
    });



    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState('');
    const [currentUser, setCurrentUser] = useState('');

    useEffect( // initialize the array of users we have
        ()=>{fetchUsers();},
        []
    );

    const fetchUsers = ()=>{
        API.get('/list')
        .then(response=>{
            // get the current state of the users list
            console.log('Get Users Successful: ', response.data);
            setUsers(response.data.users);
        })
        .catch(error=>{
            console.log('Error getting users: ', error);
        })
    };

    const CurrentUsers = ()=>{
        return users.map((user, index) =>(
        <Link style={{
            display: 'flex'
        }} to={`/users/${user}`}>
        <button className="UserBtn" id={user}>{user}</button>
        </Link>
        ));
    }

    const handleCreateUserSubmit = () =>{
        console.log('new user: ', newUser);
        if(newUser == '') return;
        const new_name = {
            new_user: newUser
        }
        API.post('/newuser', new_name)
        .then(response=>{
            // We successfully posted to the server, then we want to update our hook
            
            console.log("Reponse: ", response.data);
            fetchUsers();
        })
        .catch(err=>{
            console.error(err);
        })
        // Send a POST request to server to add user
        //setUsers([...users, newUser]);
    }


    return(<>
        
    <div className="flexContainer">
        <CurrentUsers/>
        <Popup trigger = {<button className="UserBtn">New User</button>} modal nested>
        {
            close => (
                <div className='modalBackdrop' style={{
                backgroundColor: 'grey',
                height: '50vh',
                width: '50vw',
                display: 'flex',
                justifyContent: 'center',
                alignContent:'center'
                }}>

                
                    <form style={{
                        display:'flex',
                        justifyContent:'center',
                        flexDirection:'column',
                        gap:'1vh'
                        
                    }}>
                        <label>Name</label>
                        <input type='text' onChange={(e)=> setNewUser(e.target.value)}/>
                        <button
                        onClick= //On click = submit, setUserName, close()
                            {() => {
                                handleCreateUserSubmit();
                                close();
                                }}>
                                Create User
                        </button>
                    </form>
                </div>
            )
        }
        </Popup>


    </div>
</>)
}



export default UserSelection