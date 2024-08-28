import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export const Previous = () => {

    const [protData, seteventData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for event name search
    const [searchDate, setSearchDate] = useState(""); // State for event date search
    const role = useSelector((state) => state.auth.role);
    
    const url = "http://localhost:8000/api/event";
  
    const fetcheventData = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => {
                // Filter the data to show only upcoming events
                const upcomingEvents = d.filter(event => new Date(event.eventDate) < new Date());
                
                seteventData(upcomingEvents);
            });
    };

    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const formatTime = (dateString) => {
        const options = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: true 
        };
        return new Date(dateString).toLocaleTimeString("en-US", options);
    };

    const toISODate = (dateString) => {
        return new Date(dateString).toISOString().split('T')[0];
    };

    // Filtered events based on search term and date
    const filteredEventData = protData.filter((dataObj) => {
        const eventNameMatch = dataObj.eventName.toLowerCase().includes(searchTerm.toLowerCase());
        const eventDateMatch = searchDate === "" || toISODate(dataObj.eventDate) === searchDate;
        return eventNameMatch && eventDateMatch;
    });

    useEffect(() => {
        fetcheventData();
    }, []);

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="page-header">
                    <h1 className="card-title">Previous Events</h1>
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
                                                placeholder="Search events by name" 
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)} // Update event name search term
                                            />
                                            <input 
                                                type="date" 
                                                className="form-control ml-2" 
                                                placeholder="Search by date" 
                                                value={searchDate}
                                                onChange={(e) => setSearchDate(e.target.value)} // Update event date search term
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
                                                <th>Event Name</th>
                                                <th>Event Date</th>
                                                <th>Status</th>
                                                <th>Booth</th>
                                                <th>Speaker Name</th>
                                                {/* <th>Time Start</th>
                                                <th>Time End</th> */}
                                                <th>Duration</th>
                                                <th>Location</th>
                                                <th>Category</th>
                                                <th>View</th>
                                                {role === "Admin" && (
                                                    <>
                                                        <th>Status</th>
                                                    </>
                                                )}
                                                {role === "Exhibitor" && (
                                                    <>
                                                        {/* <th>Book</th> */}
                                                    </>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredEventData.map((dataObj, index) => (
                                                <tr key={dataObj._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{dataObj.eventName}</td>
                                                    <td>{formatDate(dataObj.eventDate)}</td>
                                                    <td>{dataObj.status}</td>
                                                    <td>{dataObj.Booth_count}</td>
                                                    <td>{dataObj.Speaker_name}</td>
                                                    {/* <td>{formatTime(dataObj.timeStart)}</td>
                                                    <td>{formatTime(dataObj.timeEnd)}</td> */}
                                                    <td>{dataObj.duration}</td>
                                                    <td>{dataObj.location.Location_name}</td>
                                                    <td>{dataObj.category.cate_name}</td>
                                                    {role === "Admin" && (
                                                        <>
                                                            <td>
                                                                <Link to={`/Event-view/${dataObj._id}`}>
                                                                    <div className="badge badge-outline-info">View</div>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <Link to={`/Event-status/${dataObj._id}`}>
                                                                    <div className="badge badge-outline-warning">Status</div>
                                                                </Link>
                                                            </td>
                                                        </>
                                                    )}
                                                    {role === "Exhibitor" && (
                                                        <>
                                                              <td>
                                                                <Link to={`/Event-view/${dataObj._id}`}>
                                                                    <div className="badge badge-outline-info">View</div>
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
};
