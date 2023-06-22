// import logo from './logo.svg'
import{Route,Routes,Navigate,BrowserRouter} from 'react-router-dom';
import './App.css'
import bootstarp from 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import Signup from './componets/signup/Signup'
import Chat from './componets/Chat'
import Login from './componets/signin/Signin'
import React from 'react'
import Home from './componets/Home';
import { AuthContext } from './componets/AuthContext';
import { useState,useContext } from 'react';
import Viewprofile from './componets/Viewprofile';
import Forgotten_password from './componets/Forgotten_password';
function App() {
  var loginu =localStorage.getItem("loginuser");
 
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      
      
      { loginu && <Route path="/" exact element={<Home />}/>}
      <Route  path="/forgot" element={<Forgotten_password/>} />
     <Route  path="/signup" element={<Signup/>} />
     <Route  path="/login" element={<Login/>} />
     <Route path="/" exact element={<Navigate replace to="/login"/>}/>
     <Route  path="/h" element={<Viewprofile/>} />
      
    </Routes>
    </BrowserRouter>
      {/* <Main_work/> */}
      {/* <Token/> */}

      {/* <Chat sender="keyur@gmail.com" reciver="now12@gmail.com"/>
      <Showchat  sender="keyur@gmail.com" reciver="now12@gmail.com"/>


      <Chat sender="manav@gmail.com" reciver="keyur@gmail.com"/>
      <Showchat  sender="manav@gmail.com" reciver="keyur@gmail.com"/> */}
      {/* <header className="App-header">  */}
      {/* <Signup/> */}
      {/* <Main/> */}
      {/* <Chat sender_id="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImppQGdtYWlsLmNvbSIsImlhdCI6MTY2NzQxMjY0MX0.XdgQpwKBgFEduTxa6Of9Ke76JpRbIuAYqpi3rQJe_NM" reciver_id="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImppdkBnbWFpbC5jb20iLCJpYXQiOjE2Njc0MTI4ODJ9.08jTzc85ap51zGFf6BzQKlYRfrVP8k-7XtGug5VfTS4"/> */}
      {/* </header> */}
      {/* <Login/> */}
    </div>
  )
}

export default App
