import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Changepass = () => {
  const user_id = useSelector((state) => state.auth.user_id);
  const url = `http://localhost:8000/api/pass/${user_id}`; // API endpoint
  
  const [userData, setUserData] = useState(null); // Single user object
  const [alert, setAlert] = useState({
    visible: false,
    message: '',
    type: 'secondary',
  });

  const navigate = useNavigate(); // Navigate function for routing

  // Fetch user data by ID
  const fetchUserData = () => {
    return fetch(`http://localhost:8000/api/user/${user_id}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  };

  useEffect(() => {
    fetchUserData(); // Fetch the data when the component mounts
  }, [user_id]); // Re-fetch if the ID changes

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleUpdate = (event) => {
    event.preventDefault();
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (res.status === 409) {
          throw new Error("User already exists");
        } else if (res.status === 500) {
          throw new Error("Internal Server Error");
        }
        return res.json();
      })
      .then((updatedData) => {
        setAlert({
          visible: true,
          message: "Password updated successfully!",
          type: "success",
        });
        setTimeout(() => {
          setAlert({ visible: false, message: '', type: 'secondary' });
          navigate("/"); // Navigate to the user list page
        }, 2000);
      })
      .catch((error) => {
        setAlert({
          visible: true,
          message: error.message,
          type: "danger",
        });
        setTimeout(() => {
          setAlert({ visible: false, message: '', type: 'secondary' });
        }, 2000);
      });
  };

  if (!userData) {
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
          <h1 className="card-title">Change Password</h1>

          {/* Conditionally render the alert */}
          {alert.visible && (
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
              <strong>{alert.type === 'danger' ? 'Holy guacamole!' : 'Success!'}</strong> {alert.message}
              <button type="button" className="close" onClick={() => setAlert({ visible: false, message: '', type: 'secondary' })} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}

          <form className="forms-sample" onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Your Name</label>
              <input
                type="text"
                required
                name="User_name"
                value={userData.User_name || ''}
                onChange={handleInputChange}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="User Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Your Email</label>
              <input
                type="email"
                required
                name="User_email"
                value={userData.User_email || ''}
                onChange={handleInputChange}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="User Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">New Password</label>
              <input
                type="password"
                required
                name="User_password"
                value={userData.User_password || ''}
                onChange={handleInputChange}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="New Password"
              />
            </div>
            <button type="submit" className="btn btn-primary mr-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
