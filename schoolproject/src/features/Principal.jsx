import React, { useEffect, useState } from 'react'
import { useGetbranchesQuery, useGetcomplaintsBranchQuery } from '../services/schoolApi';
import { useAcceptComplaintMutation, useSolvingComplaintMutation } from '../services/complaintApi';

function Principal() {
  var [search,setSearch] = useState('');
  var [selstatus,setSelStatus] = useState('all');
  var [filcom,setFilCom] = useState([]);
  
  var {isLoading,data,refetch} =  useGetcomplaintsBranchQuery({
    status: selstatus !== 'all' ? selstatus : null,
    mobile: search,
  });

  console.log(isLoading,data);
  var [acceptFn] = useAcceptComplaintMutation();
  var [solveFn] = useSolvingComplaintMutation();
  var [accclick,setAccClick] = useState(false);         
  var [solclick,setSolClick] = useState(false);         
  function acceptCom(id){
    acceptFn(id).then((res)=>{
      console.log(res);
    })
  }

  function solveCom(id){
    solveFn(id).then((res)=>{
      console.log(res);
    })
  }
  useEffect(()=>{
    if(data){
      var filter = data?.filter((com) => {
        var newstatus = [...com.status].sort((a,b)=> { return a.timestamp < b.timestamp ? 1 : -1})[0];
        return ['assigned','accepted','solved','closed'].includes(newstatus.code);
      })
      setFilCom(filter);
    }
  },[data])

  useEffect(()=>{
    refetch();
  },[search,filcom,selstatus,accclick,solclick])

  function handleStatus(e){
    setSelStatus(e.target.value)
  }
  function handleSearch(e){
    setSearch(e.target.value)
  }
  useEffect(() => {
    refetch();
  }, [search, selstatus, refetch]);
  return (
    <div>
       <h4 className='text-center my-4'>PRINCIPAL : {window.localStorage.getItem('name')}</h4>
       <div className="d-flex justify-content-center mb-3">
          <input type="text" className='form-control p-2 w-25 w-md-25' placeholder='Mobile Number'
          value={search} onChange={handleSearch}/>
       </div>
       <div>
            <div>
                <div className='d-flex flex-wrap justify-content-center mb-4'>
                  <div>
                        <label className="me-2">
                            <input type="radio" value='all' checked={selstatus === 'all'} onChange={handleStatus} className='ms-2' /> All
                        </label>
                        <label className="me-2">
                            <input type="radio" value='assigned' checked={selstatus === 'assigned'} onChange={handleStatus} className='ms-2' /> Assigned
                        </label>
                        <label className="me-2">
                            <input type="radio" value='accepted' checked={selstatus === 'accepted'} onChange={handleStatus}   className='ms-2' /> Pending
                        </label>
                        <label className="me-2">
                            <input type="radio" value='solved' checked={selstatus === 'solved'} onChange={handleStatus}   className='ms-2' /> Solved
                        </label>
                        <label className="me-2">
                            <input type="radio" value='closed' checked={selstatus === 'closed'} onChange={handleStatus}   className='ms-2' /> Closed
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
                                        <th>Action</th>
                                  </tr>
                            </thead>
                            <tbody>
                                {
                                    filcom?.map((d,i)=>{
                                          var newstatus =  [...d.status].sort((a,b)=>{return a.timestamp<b.timestamp ? 1:-1})[0];
                                        
                                          return (
                                            <tr key={i}>
                                                <td>{d.studentname}</td>
                                                <td>{d.mobile}</td>
                                                <td>{d.branch}</td>
                                                <td>{d.complaint}</td>
                                                <td>
                                                    { newstatus.code}
                                                </td>
                                                <td>
                                                  {
                                                    newstatus.code === 'assigned'
                                                    && <>
                                                        <button className='btn btn-warning shadow' onClick={()=>{acceptCom(d._id)}}>Accept</button>
                                                    </>
                                                  }
                                                  {
                                                    newstatus.code === 'accepted'
                                                    && <>
                                                        <button className='btn btn-warning shadow' onClick={()=>{solveCom(d._id)}}>Solve</button>
                                                    </>
                                                  }
                                                  {
                                                    newstatus.code === 'solved'
                                                    && <>
                                                        <b>Waiting for Closed</b>
                                                    </>
                                                  } 
                                                  {
                                                    newstatus.code === 'closed'
                                                    && <>
                                                        <b>Closed</b>
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

export default Principal
