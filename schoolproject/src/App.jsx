import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import AdminHome from "./features/Navbars/AdminHome";
import Home from "./features/Home";
import ZonalOfficerNavbar from "./features/Navbars/ZonalOfficerNavbar";
import AdminNavbar from "./features/Navbars/AdminNavbar";
import PrincipalNavbar from "./features/Navbars/PrincipalNavbar";
import CustomerNavbar from "./features/Navbars/CustomerNavbar";
import { useEffect, useState } from "react";


function App() {
  var [role,setRole] = useState('');
  useEffect(()=>{
    var Role = window.localStorage.getItem('role') ||'';
    setRole(Role);
  },[])
  return (
    <div>
    
      {/* <h3>Bhashyam School</h3> */}
      {/* <HomeLogin></HomeLogin> */}
      { 
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
      }
      <Outlet />
    </div>
      
  );
}

export default App;
