import React from 'react'

import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Eventedite = () => {
    const navigate = useNavigate();
    const [locData, setLocData] = useState([]);
    const [catData, setCatData] = useState([]);
    const { id } = useParams();
    const url = `http://localhost:8000/api/event/${id}`;
    const[newEventData, setNewEventData] =useState(null) ;
    const role = useSelector((state) => state.auth.role);

    const formatTime = (isoString) => {
      // Create a Date object from the ISO string
      const date = new Date(isoString);
      
      // Extract hours, minutes, seconds, and milliseconds
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      const seconds = date.getUTCSeconds().toString().padStart(2, '0');
      const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    
      // Format as "HH:mm:ss.SSS"
      return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    };


    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setNewEventData(data))
        .catch((error) => console.error("Error fetching Eventgory details:", error));
    }, [url])
    
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
    const handleinputChange = (e) => {                                                                                                         
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
  
    // Handle session changes
    const handleSessionChange = (index, e) => {
      const { name, value } = e.target;
      const updatedSessions = [...newEventData.session];
      updatedSessions[index] = {
        ...updatedSessions[index],
        [name]: value
      };
  
      // Update duration for session
      if (name === 'timeStart' || name === 'timeEnd') {
        const { timeStart, timeEnd } = updatedSessions[index];
        if (timeStart && timeEnd) {
          updatedSessions[index].duration = calculateDuration(timeStart, timeEnd);
        } else {
          updatedSessions[index].duration = '';
        }
      }
  
      setNewEventData({
        ...newEventData,
        session: updatedSessions
      });
    };
  
    // Add a new session to the form
    const addSession = () => {
      setNewEventData({
        ...newEventData,
        session: [...newEventData.session, { timeStart: "", timeEnd: "", duration: "" }]
      });
    };
  
    // Update duration for initial load
    
  
    // Handle form submission
    const handleAdd = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("eventName", newEventData.eventName);
      formData.append("eventDate", newEventData.eventDate);
      formData.append("status", newEventData.status);
      formData.append("Booth_count", newEventData.Booth_count);
      formData.append("Speaker_name", newEventData.Speaker_name);
      formData.append("timeStart", newEventData.timeStart);
      formData.append("timeEnd", newEventData.timeEnd);
      formData.append("duration", newEventData.duration);
      formData.append("session", newEventData.session);
      formData.append("location", newEventData.location);
      formData.append("category", newEventData.category);
      fetch(url, {
        method: 'PUT',
        body: formData,
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
          alert(data.msg);
          navigate("/Event-show");
        })
        .catch((error) => {
          alert(error.msg);
        });
    };

  


  if (!newEventData) {
    return (
      <section id="main-content">
        <section className="wrapper">
          <div className="row mt">
            <div className="col-lg-12">
              <div className="form-panel">
                <h4 className="mb"><i className="fa fa-angle-right" /> Loading...</h4>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }

  return (

    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title"></h4>
          <form className="forms-sample" onSubmit={handleAdd}>
            <div className="form-group">
              <label htmlFor="eventName">Event Name</label>
              <input
                type="text"
                required
                name='eventName'
                value={newEventData.eventName}
                onChange={handleinputChange}
                className="form-control"
                id="eventName"
                placeholder="Event Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDate">Event Date</label>
              <input
                type="date"
                name='eventDate'
                value={newEventData.eventDate}
               
                onChange={handleinputChange}
                className="form-control"
                id="eventDate"
                placeholder="Event Date"
              />
            </div>
            {role === "Admin" &&(
                <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  name='status'
                  value={newEventData.status}
                  onChange={handleinputChange}
                  className="form-control"
                  id="status"
                >
                  <option value="" disabled>Choose Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Pending">Decline</option>
                </select>
              </div>
            )}

           
            <div className="form-group">
              <label htmlFor="Booth_count">Booth Count</label>
              <input
                type="number"
                required
                name='Booth_count'
                value={newEventData.Booth_count}
                onChange={handleinputChange}
                className="form-control"
                id="Booth_count"
                placeholder="Booth Count"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Speaker_name">Speaker Name</label>
              <input
                type="text"
                required
                name='Speaker_name'
                value={newEventData.Speaker_name}
                onChange={handleinputChange}
                className="form-control"
                id="Speaker_name"
                placeholder="Speaker Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="timeStart">Time Start</label>
              <input
                type="time"
                name='timeStart'
                value={newEventData.timeStart}
                onChange={handleinputChange}
                className="form-control"
                id="timeStart"
              />
            </div>
            <div className="form-group">
              <label htmlFor="timeEnd">Time End</label>
              <input
                type="time"
                name='timeEnd'
                value={newEventData.timeEnd}
                onChange={handleinputChange}
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
              <label htmlFor="location">Location</label>
              <div className="col-sm-10">
                <select
                  name="location"
                  value={newEventData.location}
                  onChange={handleinputChange}
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
              <label htmlFor="category">category</label>
              <div className="col-sm-10">
                <select
                  name="category"
                  value={newEventData.category}
                  onChange={handleinputChange}
                  className="form-control"
                  required
                >
                  <option value="" disabled>Choose category</option>
                  {catData.map((category, i) => (
                    <option key={i} value={category._id}>{category.cate_name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mr-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
                  
}