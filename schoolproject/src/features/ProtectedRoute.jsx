import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function ProtectedRoute({element : Component,allowedRoles}) {
    // var navigate = useNavigate();
    var token = window.localStorage.getItem('token');
    var role = window.localStorage.getItem('role');
    if(!token || !allowedRoles.includes(role)){
        return <Navigate to='/login'/>
    }
  return Component
}

export default ProtectedRoute
