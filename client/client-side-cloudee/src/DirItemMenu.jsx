import React, { useState, useRef, useEffect } from 'react';
import './DirItemMenu.css'; // Import your CSS file
import * as serviceAPI from './serviceAPI'


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
                    <li onClick={()=>{serviceAPI.deleteFile(fileFullName, deletePerm )}}>Delete</li>
                    <li>Option 2</li>
                    <li>Option 3</li>
                </ul>
            )}
        </div>
    );
};

export default DirItemMenu;
