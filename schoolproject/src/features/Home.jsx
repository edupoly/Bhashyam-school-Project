import React from 'react'
import { useDeleteBranchMutation, useGetbranchesQuery } from '../services/schoolApi'
import { Link } from 'react-router-dom';

function Home() {
    var {isLoading,data} = useGetbranchesQuery();
    console.log(isLoading,data);
    var [delbranchFn] = useDeleteBranchMutation();
    function delbranch(id){
      delbranchFn(id).then((res)=>{console.log(res)})
    }
  return (
    <div>
      {/* <h3>Bhashyam Public School</h3> */}
      <div>
       <h3 className='text-center my-4'>BRANCHES</h3>
       <table className='table table-bordered text-center container shadow-sm'>
         <thead>
            <tr>
                <th className='bg-light'>Branch</th>
                <th className='bg-light'>Principal Name</th>
                <th className='bg-light'>Mobile</th>
                <th className='bg-light'>Action</th>
            </tr>
         </thead> 
         <tbody>
            {
               !isLoading && data?.map((d,i)=>{
                    return <tr key={i}>
                        <td>{d.branchname}</td>
                        <td>{d.principalname}</td>
                        <td>{d.mobile}</td>
                        <td>
                            <Link to={`/editbranch/${d._id}`}><button className='btn btn-primary me-2'><i className="bi bi-pen"></i></button></Link>
                            <button className='btn btn-danger' onClick={()=>{delbranch(d._id)}}><i className="bi bi-trash"></i></button>
                        </td>
                    </tr>
                })
            }
         </tbody>          
       </table>              
      </div>
    </div>
  )
}

export default Home
