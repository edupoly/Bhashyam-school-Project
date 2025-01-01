import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './features/Home.jsx';
import Navbar from './features/Navbar.jsx';
import AddBranch from './features/AddBranch.jsx';
import AddZonal from './features/AddZonal.jsx';
import Complaints from './features/Complaints.jsx';
import Callcenter from './features/Callcenter.jsx';
import ZonalOfficers from './features/Zonalofficers/ZonalOfficers.jsx';
import FirstZonal from './features/Zonalofficers/FirstZonal.jsx';
import SecondZonal from './features/Zonalofficers/SecondZonal.jsx';
import ThirdZonal from './features/Zonalofficers/ThirdZonal.jsx';
import Login from './features/Login.jsx';
import Signup from './features/Signup.jsx';
import Principal from './features/Principal.jsx';
import EditBranch from './features/EditBranch.jsx';
import HomeLogin from './features/Auth/HomeLogin.jsx';
import ZonalLogin from './features/Auth/ZonalLogin.jsx';
import Zonal from './features/Zonalofficers/Zonal.jsx';
import AdminHome from './features/Navbars/AdminHome.jsx';
import AdminNavbar from './features/Navbars/AdminNavbar.jsx';
import ProtectedRoute from './features/ProtectedRoute.jsx';


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [
      
          {
            path : '/',
            element : <HomeLogin/>,
          },
          {
            path:'/home',
            element:<Home/>
          },
          {
            path :'/editbranch/:id',
            element : <EditBranch/>
          },
          {
            path : '/addbranch',
            element : <AddBranch/>
          },
          {
            path : '/addzonal',
            element :<AddZonal/>
          },
          {
            path:'/complaint',
            element : <Complaints/>
          },
          {
            path : '/allcomplaints',
            element : <ProtectedRoute element={<Callcenter/>} allowedRoles={['Customercare']}/>
          },
          {
            path :'/zonals',
            element : <Zonal/>
          },
          {
            path: '/principal',
            element : <Principal/>
          },
          {
            path : '/zonalofficer',
            element : <ZonalLogin/>
          }
        ,
      
      {
        path : '/login',
        element : <Login/>
      }
    ]
  },
  
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
