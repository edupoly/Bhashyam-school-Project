import React from 'react'
import { Link } from 'react-router-dom'

function HomeLogin() {
  return (
    <div className='text-center d-flex'>
      <div className='w-75'>
        <img src="https://i.ytimg.com/vi/Ks7fFQoresM/maxresdefault.jpg" alt="" width='95%' />
      </div>
      <div className='d-flex justify-content-center align-items-center w-25'>
        {/* <div className='me-2'>
            <Link to='/zonalofficer'><button className='btn btn-primary'>Zonal officer</button></Link>
        </div> */}
        <div>
            <Link to='/login'><button className='btn btn-primary'>Login</button></Link>
        </div>
      </div>
    </div>
  )
}

export default HomeLogin
