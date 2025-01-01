import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useSearchParams} from 'react-router-dom'
import { useGetComplaintsByZonalQuery } from '../../services/schoolZonalApi'
import { useAssignComplaintMutation } from '../../services/complaintApi';
import { useGetbranchesQuery } from '../../services/schoolApi';
function Zonal() {
    var [search, setSearch] = useState('');
    var [selectBranch, setSelectBranch] = useState([]);
    var [selStatus, setSelStatus] = useState('all');
    var { isLoading, data, refetch } = useGetComplaintsByZonalQuery({
      branches: selectBranch,
      status: selStatus !== 'all' ? selStatus : null,
      mobile: search,
    });
    console.log("data:",data);
    var { isLoading: bLoading, data: bdata } = useGetbranchesQuery();
    var [assignFn] = useAssignComplaintMutation();
    var [assignclick,setAssignClick] = useState(false);
    function handleBranch(e) {
      var { value, checked } = e.target;
      setSelectBranch((prev) =>
        checked ? [...prev, value] : prev.filter((b) => b !== value)
      );
    }
  
    useEffect(()=>{
      refetch();
    },[data,assignclick,search,selStatus,selectBranch])

    function handleStatus(e) {
      setSelStatus(e.target.value);
    }
  
    function assignCom(id) {
      assignFn(id).then((res) => {
        console.log(res);
      });
      setAssignClick(prev=>!prev);
    }
    
    // console.log("branches2:",selectBranch)

  return (
    <div className='mt-3'>
      <h4 className='text-center my-4'>ZONAL OFFICER : {window.localStorage.getItem('name')}</h4>
            <div className="d-flex justify-content-center mb-3">
              <input type="text" className="form-control p-2 w-25 w-md-25" placeholder="Mobile Number" value={search} onChange={(e) => setSearch(e.target.value)}  />
            </div>
      <div  className='d-flex flex-wrap'>
         <div className='col-12 col-md-3 p-3'>
            {
               !bLoading && bdata?.map((d,i)=>{
                    return (
                      <div key={i}>
                        <input type="checkbox" value={d.branchname} className='form-check-input'
                        checked={selectBranch.includes(d.branchname)} onChange={handleBranch}/>
                        <label htmlFor={d.branchname} className='form-check-label ms-3 mb-2'>
                          {d.branchname}
                        </label>
                      </div>
                    )
               })
            }
         </div>
         <div className='col-12 col-md-9 p-3'>
            <div >
                <div className="d-flex flex-wrap mb-4">
                  {
                    ['all', 'assigned', 'accepted', 'solved', 'closed'].map((status) => {
                      return (
                              <label key={status} className="me-2">
                                <input type="radio" value={status} checked={selStatus === status} onChange={handleStatus} className="ms-3"/>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </label>
                      )
                    })
                  }
                </div>
            </div>
            <div className="table-responsive">
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
                          !isLoading && data?.map((b,i)=>{
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
                                                [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'registered'
                                                && <>
                                                  <button className='btn btn-warning' onClick={()=>{assignCom(b._id)}}>Assign To Principal</button>
                                                </>
                                            }
                                            {
                                                [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'assigned'
                                                && <>
                                                  <b>Waiting for Acceptance</b>
                                                </>
                                            }
                                            {
                                                [...b.status].sort((a,b)=> { return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'accepted'
                                                && <>
                                                    <b>Processing</b>
                                                </>
                                            }
                                            {
                                                [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'solved'
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
      </div>
    </div>
  )
}

export default Zonal

