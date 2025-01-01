import React, { useEffect, useState } from 'react'
import { useGetComplaintsByBranchQuery } from '../../services/schoolZonalApi'
import { useAssignComplaintMutation } from '../../services/complaintApi';

function SecondZonal() {
  var {isLoading,data} = useGetComplaintsByBranchQuery();
  console.log(isLoading,data);
  var [selBranch,setSelBranch] = useState([]);
  var [assignFn] = useAssignComplaintMutation();

  function assignCom(id){
    assignFn(id).then((res)=>{
      console.log(res);
    })
  }
  useEffect(()=>{
    if(data){
      var fil = data.filter( f => f.branch === 'Nizampet' || f.branch === 'Quthbullapur' || f.branch === 'Uppal Depot' || f.branch === 'Dilsukhnagar');
      setSelBranch(fil);
    }
  },[data])
  return (
    <div>
      <h4 className='text-center my-4'>SECOND ZONAL OFFICER</h4>
      <div>
        <table className='table table-bordered text-center container shadow-sm'>
            <thead>
                 <tr>
                      <th>Student Name</th>
                      <th>Mobile</th>
                      <th>Branch</th>
                      <th>Complaint</th>
                      <th>Status</th>
                      <th>Action</th>
                 </tr>
            </thead>
            <tbody>
                {
                     selBranch?.map((b,i)=>{
                         return (
                             <tr key={i}>
                                 <td>{b.studentname}</td>
                                 <td>{b.mobile}</td>
                                 <td>{b.branch}</td>
                                 <td>{b.complaint}</td>
                                 <td>
                                     { [...b.status].sort((a,b)=>{ return a.timestamp<b.timestamp ? 1:-1})[0].code}
                                 </td>
                                 <td>
                                     {
                                       [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'registered'
                                       && <>
                                          <button className='btn btn-warning' onClick={()=>{assignCom(b._id)}}>Assign To Principal</button>
                                       </>
                                     }
                                     {
                                       [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'assigned'
                                       && <>
                                          <b>Waiting for Acceptance</b>
                                       </>
                                     }
                                     {
                                       [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'accepted'
                                       && <>
                                          <b>Processing</b>
                                       </>
                                     }
                                     {
                                       [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'solved'
                                       && <>
                                          <b>Waiting for Closed</b>
                                       </>
                                     }
                                     {
                                       [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'closed'
                                       && <>
                                          <b>Complaint Closed</b>
                                       </>
                                     }
                                 </td>
                             </tr>
                         )
                     })
                }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default SecondZonal