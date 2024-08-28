import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

export const Eventview = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const url = `http://localhost:8000/api/event/${id}`; // Use the ID in the API endpoint

  const [eventData, setEventData] = useState(null); // Single event object
  const role = useSelector((state) => state.auth.role);

  // Fetch event data by ID
  const fetchEventData = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => setEventData(data));
  };

  useEffect(() => {
    fetchEventData(); // Fetch the data when the component mounts
  }, [id]); // Re-fetch if the ID changes

  const delEvent = () => {
    const confirmed = window.confirm("Are you sure you want to delete this Event?");
    if (!confirmed) {
      return;
    }

    fetch(url, { // Use the same URL, which includes the event ID
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
      // Redirect or handle post-deletion behavior
    })
    .catch((error) => {
      alert(error.message);
    });
  };

  const formateDate = (dateString) =>{
    const options = { day: "2-digit", month: "2-digit", year:"numeric"};
    return new Date(dateString).toLocaleDateString("en-US", options);
}

const formatTime = (dateString) => {
    const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true // Use 'false' for 24-hour format
    };
    return new Date(dateString).toLocaleTimeString("en-US", options);
} 

  if (!eventData) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="page-header">
          {/* <Link to={`/Event-add`} className="btn btn-primary btn-md">Insert A new Event</Link> */}
          <h1 className="card-title">{eventData.eventName}</h1>
          <h1 className="card-description">Event details</h1>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Event Name</th>
                        <td>{eventData.eventName}</td>
                      </tr>
                      <tr>
                        <th>Event Date</th>
                        <td>{formateDate(eventData.eventDate)}</td>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <td>{eventData.status}</td>
                      </tr>
                      <tr>
                        <th>Booth</th>
                        <td>{eventData.Booth_count}</td>
                      </tr>
                      <tr>
                        <th>Speaker Name</th>
                        <td>{eventData.Speaker_name}</td>
                      </tr>
                      {/* <tr>
                        <th>Time Start</th>
                        <td>{formatTime(eventData.timeStart)}</td>
                      </tr>
                      <tr>
                        <th>Time End</th>
                        <td>{formatTime(eventData.timeEnd)}</td>
                      </tr> */}
                      <tr>
                        <th>Duration</th>
                        <td>{eventData.duration}</td>
                      </tr>
                      {/* <tr>
                        <th>Location</th>
                        <td>{eventData.location.Location_name}</td>
                      </tr>
                      <tr>
                        <th>Category</th>
                        <td>{eventData.category.cate_name}</td>
                      </tr> */}
                      {/* {role === "Admin" && (
                        <>
                          <tr>
                            <th>Edit</th>
                            <td>
                              <Link to={`/Event-edite/${eventData._id}`}>
                                <div className="badge badge-outline-warning">Edit</div>
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <th>Delete</th>
                            <td>
                              <div onClick={delEvent} className="badge badge-outline-danger">Delete</div>
                            </td>
                          </tr>
                        </>
                      )} */}
                    </thead>
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
