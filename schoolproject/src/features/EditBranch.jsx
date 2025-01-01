import React, { useEffect, useState } from 'react'
import { Form, Formik,Field } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetbranchesQuery, useUpdatebranchMutation } from '../services/schoolApi';

function EditBranch() {
    var {id} = useParams();
    var {isLoading,data} = useGetbranchesQuery();
    console.log("update",isLoading,data);
    var [updbranchFn] = useUpdatebranchMutation();
    var navigate = useNavigate();

    var [bdata,setBData] = useState({
        branchname : '',
        principalname : '',
        mobile : '',
        image : ''
    });
    useEffect(()=>{
        if(data && id){
            var editBranch = data.find((b)=> b._id === id);
            if(editBranch){
                setBData({
                    branchname : editBranch.branchname,
                    principalname : editBranch.principalname,
                    mobile : editBranch.mobile,
                    image : editBranch.image || ''
                })
            }
        }
    },[data,id])

    var onSubmit = (values)=>{
        console.log(values);
        updbranchFn({id : id,updbranch : values})
        .then((res)=>{
            console.log(res);
            navigate('/home');
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
      <Formik initialValues={bdata} enableReinitialize={true} onSubmit={onSubmit}>
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
                                          <Field name='image' className='form-control p-2 mb-3' placeholder='Image'/> <br />
                                          <button className='btn btn-primary w-100 mb-2'>Update Branch</button>
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

export default EditBranch
