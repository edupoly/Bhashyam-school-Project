import React, { useState } from 'react'
import { Form, Formik,Field } from 'formik'
import { useAddZonalMutation } from '../services/schoolZonalApi'
import { useGetbranchesQuery } from '../services/schoolApi';


function AddZonal() {
    var [zonalFn] = useAddZonalMutation();
    var {isLoading,data} = useGetbranchesQuery();
    // var selbranch = [];
    // console.log(selbranch);
    console.log(isLoading,data);
    var initialValues = {
        zonalname : '',
        mobile : '',
        branches : []
    }
    var onSubmit = (values)=>{
        // values.branches = selbranch;
        console.log(values);
        zonalFn(values).then((res)=>{
            console.log(res);
        })
    }
    function handleCheckbox(e,values,setValues){
        var { value, checked } = e.target;
        var updbranches;
        if(checked){
            updbranches = [...values.branches, value];
        }
        else{
            updbranches = values.branches.filter((branch) => branch !== value);
        }
        setValues(prevValues => {
            prevValues.branches = updbranches;
            return prevValues;
        })
    }

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {
            ({values,setValues})=>{
                return (
                    <div className="row justify-content-center" style={{ marginTop: '140px' }}>
                        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                            <div className='border border-light p-4 rounded shadow'>
                                <Form>
                                   <Field name='zonalname' id='zonalname' className='form-control p-2 mb-3' placeholder='Zonal Name'/><br />
                                   <Field name='mobile' id='mobile' className='form-control p-2 mb-3' placeholder='Mobile'/> <br />
                                   <div>
                                       <label className="form-label">Branches</label>
                                       {
                                         !isLoading && data?.map((d,i)=>{
                                            return (
                                                <div key={i}>
                                                      <Field name='branches' type='checkbox' 
                                                      value={d.branchname} 
                                                      className='form-check-input' 
                                                      checked={values.branches.includes(d.branchname)}
                                                      onChange={(e)=>{handleCheckbox(e,values,setValues)}}/>
                                                      <label htmlFor={d.branchname} className="form-check-label ms-2">
                                                        {d.branchname}
                                                      </label>
                                                </div>
                                            )
                                         })
                                       }
                                   </div>
                                   <button className='btn btn-primary w-100 mb-2'>Add Zonal</button>
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

export default AddZonal


// import React from 'react';
// import { Form, Formik, Field } from 'formik';
// import { useAddZonalMutation } from '../services/schoolZonalApi';
// import { useGetbranchesQuery } from '../services/schoolApi';

// function AddZonal() {
//   const [zonalFn] = useAddZonalMutation();
//   const { isLoading, data } = useGetbranchesQuery();

//   const initialValues = {
//     zonalname: '',
//     mobile: '',
//     branches: [] // Array to hold selected branches
//   };

//   const onSubmit = (values) => {
//     console.log('Form Values:', values);
//     zonalFn(values).then((res) => {
//       console.log('Response:', res);
//     });
//   };

//   const handleCheckboxChange = (e, values, setValues) => {
//     const { value, checked } = e.target;

//     // Update the branches array (don't replace it, just update)
//     const updatedBranches = checked
//       ? [...values.branches, value] // Add branch if checked
//       : values.branches.filter((branch) => branch !== value); // Remove branch if unchecked

//     // Directly update Formik state using setValues to update branches
//     setValues({ ...values, branches: updatedBranches });
//   };

//   return (
//     <div>
//       <Formik initialValues={initialValues} onSubmit={onSubmit}>
//         {({ values, setValues }) => (
//           <div className="row justify-content-center" style={{ marginTop: '140px' }}>
//             <div className="col-12 col-sm-8 col-md-6 col-lg-4">
//               <div className="border border-light p-4 rounded shadow">
//                 <Form>
//                   {/* Zonal Name */}
//                   <Field
//                     name="zonalname"
//                     id="zonalname"
//                     className="form-control p-2 mb-3"
//                     placeholder="Zonal Name"
//                   />
//                   <br />

//                   {/* Mobile */}
//                   <Field
//                     name="mobile"
//                     id="mobile"
//                     className="form-control p-2 mb-3"
//                     placeholder="Mobile"
//                   />
//                   <br />

//                   {/* Branches - Multiple Checkboxes */}
//                   <div className="mb-3">
//                     <label className="form-label">Branches</label>
//                     {!isLoading && data?.map((branch, index) => (
//                       <div key={index} className="form-check">
//                         <input
//                           type="checkbox"
//                           name="branches"
//                           value={branch.branchname}
//                           className="form-check-input"
//                           checked={values.branches.includes(branch.branchname)} // Ensure checkbox reflects selected state
//                           onChange={(e) => handleCheckboxChange(e, values, setValues)} // Directly update Formik state
//                         />
//                         <label htmlFor={branch.branchname} className="form-check-label ms-2">
//                           {branch.branchname}
//                         </label>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Submit Button */}
//                   <button type="submit" className="btn btn-primary w-100 mb-2">
//                     Add Zonal
//                   </button>
//                 </Form>
//               </div>
//             </div>
//           </div>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default AddZonal;
