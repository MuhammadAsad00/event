import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export const Boothadd = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from URL parameters
  const user_id = useSelector((state) => state.auth.user_id);

  const [ExhibitorData, setExhibitorData] = useState([]);
  const [eventData, setEventData] = useState({});
  const [boothData, setBoothData] = useState([]);
  const [newBoothData, setNewBoothData] = useState({
    Booth_name: "",
    Company_name: "",
    Exhibitor: user_id,
    Event: id,
  });
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [alert, setAlert] = useState({ visible: false, message: "", type: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBoothData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const fetchEventData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/event/${id}`);
      if (!res.ok) throw new Error('Failed to fetch Event data');
      const data = await res.json();
      setEventData(data);
      // Check if form should be visible based on booth availability
      if (data.Booth_reseverd >= data.Booth_count) {
        setIsFormVisible(false);
      }
    } catch (error) {
      console.error('Error fetching Event data:', error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [id]);

  const fetchBoothData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/booth");
      if (!res.ok) throw new Error('Failed to fetch Booth data');
      const data = await res.json();
      setBoothData(data);
    } catch (error) {
      console.error('Error fetching Booth data:', error);
    }
  };

  useEffect(() => {
    fetchBoothData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/booth", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBoothData),
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
        setAlert({ visible: true, message: data.message, type: 'success' });
        setTimeout(() => {
          setAlert({ visible: false, message: "", type: "" });
          navigate("/Booth-show");
        }, 3000); // Hide alert after 3 seconds
      })
      .catch((error) => {
        setAlert({ visible: true, message: error.message, type: 'danger' });
      });
  };

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Basic form elements</h1>
          <h1 className="card-description">Event Name <b>{eventData.eventName}</b></h1>
          <h6 className="card-description">{eventData.Booth_reseverd} out {eventData.Booth_count} Booths are booked</h6>

          {alert.visible && (
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
              <strong>{alert.type === 'danger' ? 'Oops!' : 'Success!'}</strong> {alert.message}
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

          {isFormVisible ? (
            <form className="forms-sample" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputName1">Booth Name</label>
                <input
                  type="text"
                  required
                  name='Booth_name'
                  value={newBoothData.Booth_name}
                  onChange={handleInputChange}
                  className="form-control"
                  id="exampleInputName1"
                  placeholder="Booth Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword4">Company Name</label>
                <input
                  type="text"
                  required
                  name='Company_name'
                  value={newBoothData.Company_name}
                  onChange={handleInputChange}
                  className="form-control"
                  id="exampleInputPassword4"
                  placeholder="Company Name"
                />
              </div>
              <button type="submit" className="btn btn-primary mr-2">Submit</button>
            </form>
          ) : (
            <div className="alert alert-warning" role="alert">
              No booths available. Please check back later.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
