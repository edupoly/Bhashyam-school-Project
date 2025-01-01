import React from 'react'
import { Field, Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    
    var navigate = useNavigate();
    var initialValues = {
        name :'',
        email : '',
        password : ''
    }
    var onSubmit = (values)=>{
        console.log(values);
        // signupFn(values).then((res)=>{
        //     console.log(res);
        //     navigate('/login')
        // })
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
                                <h1 className="text-center mb-4">SIGNUP</h1>
                                <Form>
                                    <Field name='name' className='form-control p-2 mb-2'placeholder='Name'/><br />
                                    <Field type='text' name='email' className='form-control p-2' placeholder='Email'/><br />
                                    <Field type='password' name='password' className='form-control p-2 mb-3' placeholder='Password'/><br />
                                    <button className='btn btn-info w-100 mb-2'>Signup</button>
                                    <h6 className="text-center mt-3">
                                       Already have an account ? <Link to='/login' className='text-decoration-none'>Login</Link>
                                    </h6>
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

export default Signup
