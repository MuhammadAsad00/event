import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const EventBoothshow = () => {
  const navigate = useNavigate();
  const [ExhibitorData, setExhibitorData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [boothData, setBoothData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const user_id = useSelector((state) => state.auth.user_id);
  const role = useSelector((state) => state.auth.role);
  const { id } = useParams(); // Get the event ID from the URL

  const fetchData = async () => {
    try {
      // Fetch all necessary data
      const [exhibitorRes, eventRes, boothRes] = await Promise.all([
        fetch("http://localhost:8000/api/user"),
        fetch("http://localhost:8000/api/event"),
        fetch(`http://localhost:8000/api/booth/${id}`),
      ]);

      if (!exhibitorRes.ok || !eventRes.ok || !boothRes.ok) throw new Error('Failed to fetch data');

      const [exhibitorData, eventData, boothData] = await Promise.all([
        exhibitorRes.json(),
        eventRes.json(),
        boothRes.json(),
      ]);

      setExhibitorData(exhibitorData);
      setEventData(eventData);
      setBoothData(boothData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const filteredBoothData = boothData.filter((booth) =>
    booth.Booth_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const delBooth = async (boothId) => {
    try {
      const res = await fetch(`http://localhost:8000/api/booth/${boothId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete booth');
      // Refresh booth data after deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting booth:', error);
    }
  };

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="page-header">
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
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
                                <div 
                                  onClick={() => delBooth(booth._id)} 
                                  className="badge badge-outline-danger" 
                                  style={{ cursor: 'pointer' }}
                                >
                                  Delete
                                </div>
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
};
