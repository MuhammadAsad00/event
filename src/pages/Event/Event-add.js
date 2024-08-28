import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Eventadd = () => {
  const navigate = useNavigate();
  const [locData, setLocData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [alert, setAlert] = useState({ visible: false, message: "", type: "" }); // Add type property
  const today = new Date().toISOString().split('T')[0];
  const user_id = useSelector((state) => state.auth.user_id);

  const [newEventData, setNewEventData] = useState({
    eventName: "",
    eventDate: "",
    status: "",
    Booth_count: "",
    Speaker_name: "",
    timeStart: "",
    timeEnd: "",
    duration: "",
    session: [],
    location: "",
    category: "",
    proposed_by: user_id
  });

  // Fetch location data
  const fetchLocData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/location");
      if (!res.ok) throw new Error('Failed to fetch location data');
      const data = await res.json();
      setLocData(data);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  useEffect(() => {
    fetchLocData();
  }, []);

  // Fetch category data
  const fetchCatData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/category");
      if (!res.ok) throw new Error('Failed to fetch category data');
      const data = await res.json();
      setCatData(data);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  useEffect(() => {
    fetchCatData();
  }, []);

  // Calculate duration between two times (formatted as "60 mins" or "1 hour")
  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return '';

    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    // Convert times to minutes
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    // Calculate duration in minutes
    const durationMinutes = endTotalMinutes - startTotalMinutes;

    if (durationMinutes < 0) {
      return 'Invalid duration'; // End time is before start time
    }

    // Convert minutes to hours and minutes
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    // Format the duration
    let result = '';
    if (hours > 0) result += `${hours} hour${hours > 1 ? 's' : ''} `;
    if (minutes > 0) result += `${minutes} minute${minutes > 1 ? 's' : ''}`;

    return result.trim() || '0 minutes'; // Handle zero duration
  };

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEventData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      // Calculate the duration if timeStart and timeEnd are both available
      if (name === 'timeStart' || name === 'timeEnd') {
        const { timeStart, timeEnd } = updatedData;
        if (timeStart && timeEnd) {
          const duration = calculateDuration(timeStart, timeEnd);
          updatedData.duration = duration;
        } else {
          updatedData.duration = '';
        }
      }

      return updatedData;
    });
  };

  // Add a new session to the form
  const addSession = () => {
    setNewEventData({
      ...newEventData,
      session: [...newEventData.session, { timeStart: "", timeEnd: "", duration: "" }]
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/event", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEventData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(error.error);
          });
        }
        return res.json();
      })
      .then((data) => {
        setAlert({ visible: true, message: data.message, type: "success" }); // Set type to "success"
        setTimeout(() => {
          setAlert({ visible: false, message: "", type: "" });
          navigate("/Event-show");
        }, 3000); // Hide alert after 3 seconds
      })
      .catch((error) => {
        setAlert({ visible: true, message: error.message, type: "danger" }); // Set type to "danger"
      });
  };

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h1 className="card-description">Events Add</h1>
          {alert.visible && (
            <div className={`alert alert-dismissible fade show ${alert.type === "danger" ? "alert-danger" : "alert-primary"}`} role="alert">
              {alert.message}
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => setAlert({ visible: false, message: "", type: "" })}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <form className="forms-sample" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventName">Event Name</label>
              <input
                type="text"
                required
                name='eventName'
                value={newEventData.eventName}
                onChange={handleInputChange}
                className="form-control"
                id="eventName"
                placeholder="Event Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDate">Event Date</label>
              <input
                type="date"
                required
                name="eventDate"
                value={newEventData.eventDate}
                onChange={handleInputChange}
                className="form-control"
                id="eventDate"
                placeholder="Event Date"
                min={today} // Restrict the date to today or future
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <div className="col-sm-10">
                <select
                  name="category"
                  value={newEventData.category}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="" disabled>Choose Category</option>
                  {catData.map((category, i) => (
                    <option key={i} value={category._id}>{category.cate_name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <div className="col-sm-10">
                <select
                  name="location"
                  value={newEventData.location}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="" disabled>Choose Location</option>
                  {locData.map((location, i) => (
                    <option key={i} value={location._id}>{location.Location_name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="Booth_count">Booth Count</label>
              <input
                type="number"
                required
                name='Booth_count'
                value={newEventData.Booth_count}
                onChange={handleInputChange}
                className="form-control"
                id="Booth_count"
                placeholder="Booth Count"
              />
            </div>
            <div className="form-group">
              <label htmlFor="timeStart">Time Start</label>
              <input
                type="time"
                required
                name='timeStart'
                value={newEventData.timeStart}
                onChange={handleInputChange}
                className="form-control"
                id="timeStart"
              />
            </div>
            <div className="form-group">
              <label htmlFor="timeEnd">Time End</label>
              <input
                type="time"
                required
                name='timeEnd'
                value={newEventData.timeEnd}
                onChange={handleInputChange}
                className="form-control"
                id="timeEnd"
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                type="text" // Use text for duration to accommodate formatted duration
                required
                name='duration'
                value={newEventData.duration}
                readOnly
                className="form-control"
                id="duration"
                placeholder="Duration"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Speaker_name">Speaker Name</label>
              <input
                type="text"
                required
                name='Speaker_name'
                value={newEventData.Speaker_name}
                onChange={handleInputChange}
                className="form-control"
                id="Speaker_name"
                placeholder="Speaker Name"
              />
            </div> 
            <button type="submit" className="btn btn-primary mr-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
