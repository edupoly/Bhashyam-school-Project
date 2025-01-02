import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import AdminHome from "./features/Navbars/AdminHome";
import Home from "./features/Home";

import { useEffect, useState } from "react";
import Navbar from "./features/Navbar";


function App() {
  // var [role,setRole] = useState('');
  // useEffect(()=>{
  //   var Role = window.localStorage.getItem('role') || '';
  //   setRole(Role);
  // },[])
  return (
    <div>
    
      {/* <h3>Bhashyam School</h3> */}
      {/* <HomeLogin></HomeLogin> */}
      {/* { 
         role==""?<AdminHome></AdminHome>:null
      }
      {
         role === 'principal' ? <PrincipalNavbar/> :''
      }
      {
         role === 'Customercare' ? <CustomerNavbar/> : ''
      }
      {
        role === 'Admin' ? <AdminNavbar/> :''
      }
      {
        role === 'zonalofficer' ? <ZonalOfficerNavbar/> :''
      } */}
      <Navbar></Navbar>
      <Outlet />
    </div>
      
  );
}

export default App;
