import React, { useEffect, useState } from 'react'
import { useComplaintClosedMutation, useGetbranchByMobileQuery, useGetComplaintsQuery } from '../services/complaintApi'
import { useGetbranchesQuery } from '../services/schoolApi';

function Callcenter() {
    var [search,setSearch] = useState('');
    var [selbranch,setSelBranch] = useState([]);
    var [selstatus,setSelStatus] = useState('all');
    var {isLoading,data,refetch} = useGetComplaintsQuery({
        branches: selbranch,
        status: selstatus !== "all" ? selstatus : null,
        mobile: search,
    });
    console.log(isLoading,data);

    var { isLoading:bLoading, data:bdata } = useGetbranchesQuery();
    var [closedFn] = useComplaintClosedMutation();
    // var {isLoading : bloading ,data : mdata} = useGetbranchByMobileQuery(search);
    var [click,setClick] = useState(false);
    useEffect(() => {
        refetch();
    }, [selbranch, selstatus, search,click]);
    
    function comclosed(id){
        closedFn(id).then((res)=>{
            console.log(res);
        })
        setClick(prev => !prev);
    }

    function handleBranch(e){
        const { value, checked } = e.target;
        setSelBranch((prev) =>
          checked ? [...prev, value] : prev.filter((b) => b !== value)
        );
    };

    function handleStatus(e){
        setSelStatus(e.target.value);
    }
  return (
    <div>
        <h3 className='text-center my-4'>COMPLAINTS</h3>
        <div className="d-flex justify-content-center mb-3">
            <input type="text" className='form-control p-2 w-25 w-md-25' placeholder='Mobile Number'
            value={search} onChange={(e)=>{ setSearch(e.target.value)}}/>
        </div>
        <div className='d-flex flex-wrap'>
            <div className='col-12 col-md-3 p-3'>
                 {
                     !bLoading && bdata?.map((b,i)=>{
                        return (
                            <div key={i}>
                                <input type="checkbox" value={b.branchname} className='form-check-input'
                                checked={selbranch.includes(b.branchname)}  onChange={handleBranch}/>
                                <label htmlFor={b.branchname} className='form-check-label ms-3 mb-2'>
                                    {b.branchname}
                                </label>
                            </div>
                        )
                     })
                 }
            </div>
           <div className='col-12 col-md-9 p-3'>
               <div>
                      <div className="d-flex flex-wrap mb-4">
                        {/* <h5>Filter by Status:</h5> */}
                        <label>
                            <input type="radio" value='all' checked={selstatus === 'all'} onChange={handleStatus} className='ms-3' /> All
                        </label>
                        <label>
                            <input type="radio" value='assigned' checked={selstatus === 'assigned'} onChange={handleStatus}className='ms-3' /> Assigned
                        </label>
                        <label>
                            <input type="radio" value='accepted' checked={selstatus === 'accepted'} onChange={handleStatus} className='ms-3' /> Pending
                        </label>
                        <label>
                            <input type="radio" value='solved' checked={selstatus === 'solved'} onChange={handleStatus} className='ms-3' /> Solved
                        </label>
                        <label>
                            <input type="radio" value='closed' checked={selstatus === 'closed'} onChange={handleStatus} className='ms-3' /> Closed
                        </label>
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
                         </tr>   
                     </thead>
                     <tbody>
                        {
                            !isLoading && data?.map((d,i)=>{
                                return (
                                    <tr key={i}>
                                        <td>{d.studentname}</td>
                                        <td>{d.mobile}</td>
                                        <td>{d.branch}</td>
                                        <td>{d.complaint}</td>
                                        <td>
                                            {
                                                [...d.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'solved'
                                                ? (
                                                    <button className='btn btn-success' onClick={()=>{comclosed(d._id)}}>Close</button>
                                                ) : [...d.status].sort((a,b)=>{return a.timestamp < b.timestamp ? 1 : -1})[0].code !== 'closed' 
                                                ? ( <b>Pending</b> ) : null
                                            }
                                            { 
                                                [...d.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'closed'
                                                && <> <b>Complaint Closed</b> </>
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

export default Callcenter

