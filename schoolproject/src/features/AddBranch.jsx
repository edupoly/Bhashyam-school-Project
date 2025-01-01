import React from 'react'
import { Form, Formik,Field } from 'formik'
import { useAddBranchMutation } from '../services/schoolApi'

function AddBranch() {
    var [addbranchFn] = useAddBranchMutation();

    var initialValues = {
        branchname : '',
        principalname : '',
        mobile : '',
        principal_id : '',
        password : ''
    }
    var onSubmit = (values)=>{
        console.log(values);
        addbranchFn(values).then((res)=>{
            console.log(res);
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
                                <Form>
                                    <Field name='branchname' className='form-control p-2 mb-3' placeholder='Branch Name'/> <br />
                                    <Field name='principalname' className='form-control p-2 mb-3' placeholder='Principal Name' /> <br />
                                    <Field name='mobile' className='form-control p-2 mb-3' placeholder='Mobile'/> <br />
                                    <Field name='principal_id' className='form-control p-2 mb-3' placeholder='Principal ID'/> <br />
                                    <Field name='password' className='form-control p-2 mb-3' placeholder='Password'/> <br />
                                    <button className='btn btn-primary w-100 mb-2'>Add Branch</button>
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

export default AddBranch
