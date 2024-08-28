import React from 'react'
import { useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
export const Usershow = () => {

    const [my_name,setmy_name]=useState([])
  function abc(){
    return fetch(`http://localhost:8000/api/user`)
    .then((res) =>res.json())
    .then ((data)=>setmy_name(data));
  };
  useEffect(()=>{
    abc();
  },[]);

  const delUser=(id)=>{
    const confirmed=window.confirm("Are you sure you want to delete this User");
    if(!confirmed){
      return;
    }
    fetch(`http://localhost:8000/api/user/${id}`,{
      method:"DELETE",
    })
    .then(()=>{
      alert("Data deleted successfully");
      return abc();
    })
    .catch((error)=>{
      console.error("Error deleting user:",error);
      alert("Error deleting User. Please try again.");
    });
  };

  if(my_name === ""){
return (
     <section id="main-content">
  <section className="wrapper">
    <h3><i className="fa fa -angle-right"/>Data Not Found</h3>
    </section>
    </section>
)}
else{
  return (
  <div className="main-panel">
  <div className="content-wrapper">
    <div className="page-header">
    <h1 className="card-title">User Show</h1>
    
   
    </div>
    <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
          
           
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Change Status</th>
                    <th>Delete</th>
                    
                  </tr>
                </thead>
                <tbody>
                {my_name.map((item,index)=>(
                  <tr>
                    <td key={index}>{index+1}</td>
                    <td>{item.User_name}</td>
                    <td>{item.User_email}</td>
                    <td>{item.User_contact}</td>
                    <td>{item.role}</td>
                    <td>{item.User_status}</td>
                    <td>
                <Link to={`/User-Edite/${item._id}`}> <div class="badge badge-outline-warning">Status</div> </Link>
               </td>
               <td>
              <Link><div onClick={() => delUser(item._id)} class="badge badge-outline-danger">Delete</div></Link>
                    </td>
                    
                  </tr>
))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div></div></div>


  )
}
}