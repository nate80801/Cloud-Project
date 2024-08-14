import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserSelection from './UserSelection.jsx'
import App from './App.jsx'
import './index.css'


export default function Main() {

  return (
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserSelection/>}/>
        <Route path="/users/:username" element={<App/>}/>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main/>);

