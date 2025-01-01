import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminHome() {
   
    var navigate = useNavigate();
    function logout(){
        window.localStorage.clear();
        navigate('/');
    }

  return (
    <div>
         <div>
      <nav className="navbar navbar-expand-lg bg-light shadow" style={{background:'linear-gradient(69.9deg, rgb(76, 79, 106) 3.2%, rgb(118, 124, 163) 97.6%)'}}>
        <div className="container-fluid">
            <Link to='/' className="navbar-brand text-light">INTERNATIONAL SCHOOL</Link>
            <Link className="navbar-brand text-light" to="/home">Home</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className='nav-item'>
                    <Link to='/allcomplaints' className="nav-link text-light">Customer Care</Link>
                </li> */}
                {/* <li className='nav-item'>
                    <Link to='/zonals' className="nav-link text-light">Zonal Officers</Link>
                </li> */}
                {/* <li className='nav-item'>
                    <Link to='/principal' className="nav-link text-light">Principal</Link>
                </li> */}
            </ul>
            {/* <form className="d-flex" role="search">
                <button className="btn btn-outline-light">Logout</button>
            </form> */}
            <ul className="navbar-nav  mb-2 mb-lg-0">
                {/* <li className='nav-item'>
                    <Link to='/addbranch' className="nav-link text-light">Add Branch</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/addzonal' className="nav-link text-light">Add ZEO</Link>
                </li> */}
                {/* <li className='nav-item'>
                    <Link to='/complaint' className="nav-link text-light">Add Complaint</Link>
                </li> */}
                <li className='nav-item'>
                    <Link to='/' className="btn btn-outline-light" onClick={logout}>Logout</Link>
                </li>
            </ul>
            </div>
        </div>
      </nav>

      
    </div>

    </div>
  )
}

export default AdminHome
