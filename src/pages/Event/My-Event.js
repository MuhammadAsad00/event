import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export const Myevent = () => {

  const user_id = useSelector((state) => state.auth.user_id);
  console.log("my user"+user_id)
    const url = `http://localhost:8000/api/myevent/${user_id}`;
    const [eventData, setEventData] = useState([]);
    const role = useSelector((state) => state.auth.role);

    const fetchEventData = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => setEventData(d))
            .catch((error) => {
                console.error('Error fetching event data:', error);
            });
    };

    useEffect(() => {
        fetchEventData();
    }, []);

    const delEvent = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this Event?");
        if (!confirmed) {
            return; 
        }

        fetch(`http://localhost:8000/api/event/${id}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.message);
                });
            }
            return response.json();
        })
        .then((data) => {
            alert(data.message);
            return fetchEventData();
        })
        .catch((error) => {
            alert(error.message);
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

    // Remove the filtering logic
    // Use the full eventData list directly
    const displayedEventData = eventData;

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="page-header">
                    <Link to={`/Event-add`} className="btn btn-primary btn-md">Insert A new Event</Link>
                    <h1 className="card-description">My Events</h1>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                {/* Remove search form */}
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
                                                {role === "Admin" && (
                                                    <>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </>
                                                )}
                                                {role === "Exhibitor" && (
                                                    <>
                                                        <th>Book</th>
                                                    </>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayedEventData.map((dataObj, index) => (
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
                                                    <td>
                                                                <Link to={`/Booth-show/${dataObj._id}`}>
                                                                    <div className="badge badge-outline-info">Booth</div>
                                                                </Link>
                                                            </td>
                                                    {role === "Admin" && (
                                                        <>
                                                            <td>
                                                                <Link to={`/Event-edite/${dataObj._id}`}>
                                                                    <div className="badge badge-outline-warning">Edit</div>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <div onClick={() => delEvent(dataObj._id)} className="badge badge-outline-danger">Delete</div>
                                                            </td>
                                                        </>
                                                    )}
                                                    {role === "Exhibitor" && (
                                                        <>
                                                            <td>
                                                                <Link to={`/Booth-add/${dataObj._id}`}>
                                                                    <div className="badge badge-outline-warning">Book</div>
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
