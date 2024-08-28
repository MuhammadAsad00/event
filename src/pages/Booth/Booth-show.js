import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const Boothshow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ExhibitorData, setExhibitorData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [boothData, setBoothData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const user_id = useSelector((state) => state.auth.user_id);
  const role = useSelector((state) => state.auth.role); // Assuming you have a role in your Redux state
  
  const fetchExhibitorData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/user");
      if (!res.ok) throw new Error('Failed to fetch Exhibitor data');
      const data = await res.json();
      setExhibitorData(data);
    } catch (error) {
      console.error('Error fetching Exhibitor data:', error);
    }
  };

  useEffect(() => {
    fetchExhibitorData();
  }, []);

  const fetcheventData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/event");
      if (!res.ok) throw new Error('Failed to fetch Event data');
      const data = await res.json();
      setEventData(data);
    } catch (error) {
      console.error('Error fetching Event data:', error);
    }
  };

  useEffect(() => {
    fetcheventData();
  }, []);

  const fetchboothData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/booth?Event=${id}`);
      if (!res.ok) throw new Error('Failed to fetch Booth data');
      const data = await res.json();
      setBoothData(data);
    } catch (error) {
      console.error('Error fetching Booth data:', error);
    }
  };

  useEffect(() => {
    fetchboothData();
  }, []);

  const filteredBoothData = boothData.filter((booth) =>
    booth.Booth_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const delBooth = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/booth/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete booth');
      fetchboothData(); // Refresh booth data
    } catch (error) {
      console.error('Error deleting booth:', error);
    }
  };

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="page-header">
          {/* <Link to={`/booth-add`} className="btn btn-primary btn-md">Add New Booth</Link> */}
          <h1 className="card-title">Booth Management</h1>
          <h1 className="card-description">Manage Booths</h1>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <ul className="navbar-nav w-100">
                  <li className="nav-item w-100">
                    <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search booths" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                      />
                          {/* Reload Button */}
                          <button 
                                                type="button" 
                                                className="btn btn-secondary ml-2" 
                                                onClick={() => window.location.reload()} // Reload the page
                                                title="Reload Page"
                                            >
                                                Reload
                                            </button>
                    </form>
                  </li>
                </ul>
                
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Booth Name</th>
                        <th>Company Name</th>
                        <th>Exhibitor</th>
                        <th>Event</th>
                        {/* <th>Booth</th> */}
                        {role === "Admin" && (
                          <>
                            <th>Edit</th>
                            <th>Delete</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBoothData.map((booth, index) => (
                        <tr key={booth._id}>
                          <td>{index + 1}</td>
                          <td>{booth.Booth_name}</td>
                          <td>{booth.Company_name}</td>
                          <td>{booth.Exhibitor.User_name}</td>
                          <td>{booth.Event.eventName}</td>
                          <td>{booth.Booth}</td>
                          {role === "Admin" && (
                            <>
                              <td>
                                <Link to={`/booth-edit/${booth._id}`}> 
                                  <div className="badge badge-outline-warning">Edit</div> 
                                </Link>
                              </td>
                              <td>
                                <Link>
                                  <div 
                                    onClick={() => delBooth(booth._id)} 
                                    className="badge badge-outline-danger"
                                  >
                                    Delete
                                  </div>
                                </Link>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
