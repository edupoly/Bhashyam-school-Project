import React from 'react'
import { Form, Formik,Field } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { useZonalLoginMutation } from '../../services/schoolZonalApi';


function ZonalLogin() {
    var [zonallogFn] = useZonalLoginMutation();
    var navigate = useNavigate();
    var initialValues = {
        // zonalname : '',
        mobile : ''
    }
    var onSubmit = (values)=>{
        console.log(values);
        zonallogFn(values).then((res)=>{
            console.log(res.data);
            window.localStorage.setItem("token",res.data.token);
            if(res.data.role=='princpal'){

                navigate('/princpal')
            }else{
                
                navigate('/zonals')
            }
        })
    }
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {
            ()=>{
                return (
                    <div className="row justify-content-center" style={{ marginTop: '140px' }}>
                        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                            <div className='border border-light p-4 rounded shadow'>
                                <h3 className="text-center mb-4">ZONAL LOGIN</h3>
                                <Form>
                                    {/* <Field name='zonalname' className='form-control p-2 mb-2'placeholder='Zonal Name'/><br /> */}
                                    <Field name='mobile' className='form-control p-2' placeholder='Mobile'/><br />
                                    <button className='btn btn-info w-100 mb-2'>Login</button>
                                    {/* <h6 className="text-center mt-3">
                                       Don't have an account ? <Link to='/signup' className='text-decoration-none'>Signup</Link>
                                    </h6> */}
                                </Form>
                            </div>
                        </div>
                    </div>
                )
            }
        }
      </Formik>
    </div>
  )
}

export default ZonalLogin
