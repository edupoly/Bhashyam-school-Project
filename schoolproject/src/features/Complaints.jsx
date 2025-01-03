import React from 'react'
import { Form, Formik,Field } from 'formik'
import { useGetbranchesQuery } from '../services/schoolApi'
import { useAddComplaintMutation } from '../services/complaintApi';
import { useNavigate } from 'react-router-dom';

function Complaints() {
    var {isLoading,data} = useGetbranchesQuery();
    var [addComplaintFn] = useAddComplaintMutation();
    console.log(isLoading,data);
    var navigate = useNavigate();
    var initialValues = {
        studentname : '',
        mobile : '',
        branch : '',
        complaint : ''
    }
    var onSubmit = (values)=>{
        console.log(values);
        addComplaintFn(values).then((res)=>{
            console.log(res);
        })
        navigate('/allcomplaints');
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
                                    <Field name='studentname' className='form-control p-2 mb-3' placeholder='Student Name' /><br />
                                    <Field name='mobile' className='form-control p-2 mb-3' placeholder='Mobile' /> <br />
                                    <div>
                                      <Field as='select' name='branch' className='form-control p-2 mb-3' placeholder='Branch'>
                                        <option value="">Select a Branch</option>
                                        {
                                            !isLoading && data?.map((d,i)=>{
                                                return (
                                                    <option value={d.branchname} key={i}>
                                                        {d.branchname}
                                                    </option>
                                                )
                                            })
                                        }
                                      </Field><br />
                                    </div>
                                    <Field name='complaint' className='form-control p-2 mb-3'placeholder='Complaint' /><br />
                                    <button className='btn btn-primary w-100 mb-2'>Add Complaint</button>
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

export default Complaints
