import { useState } from "react";
import Popup from 'reactjs-popup';
import './UserSelection.css'


function UserSelection() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState('');

    const CurrentUsers = ()=>{
        return users.map((user, index) =>(<button className="UserBtn">{user}</button>));
    }

    const handleCreateUserSubmit = () =>{
        if(newUser == '') return;
        setUsers([...users, newUser]);

    }


    return(<>
    <div className="flexContainer">
        <CurrentUsers/>
        <Popup style={{backgroundColor: 'blue'}} trigger = {<button className="UserBtn">New User</button>} modal nested>
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