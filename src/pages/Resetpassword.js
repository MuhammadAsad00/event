import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Resetpassword = () => {
  const location = useLocation();
  const initialEmail = location.state?.email || ''; // Get email from location state or default to an empty string
  const [userData, setUserData] = useState({
    User_email: initialEmail, // Initialize email from the passed state
    User_name: '',
    User_password: '',
  });
  const [alert, setAlert] = useState({
    visible: false,
    message: '',
    type: 'secondary',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const url = `http://localhost:8000/api/pass?email=${encodeURIComponent(initialEmail)}`;
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
      .then(() => {
        setAlert({
          visible: true,
          message: 'User updated successfully.',
          type: 'success',
        });
        setTimeout(() => {
          setAlert({ visible: false, message: '', type: 'secondary' });
          navigate("/Login");
        }, 2000);
      })
      .catch((error) => {
        setAlert({
          visible: true,
          message: 'Holy guacamole! You should check in on some of those fields below.',
          type: 'danger',
        });
        setTimeout(() => {
          setAlert({ visible: false, message: '', type: 'secondary' });
        }, 3000);
      });
  };

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Reset Password</h1>

          {alert.visible && (
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
              <strong>{alert.type === 'danger' ? 'Holy guacamole!' : 'Success!'}</strong> {alert.message}
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => setAlert({ visible: false, message: '', type: 'secondary' })}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}

          <form className="forms-sample" onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Your Email</label>
              <input
                type="email"
                required
                name="User_email"
                value={userData.User_email}
                onChange={handleInputChange}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputUsername">New Username</label>
              <input
                type="text"
                required
                name="User_name"
                value={userData.User_name}
                onChange={handleInputChange}
                className="form-control"
                id="exampleInputUsername"
                placeholder="New Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">New Password</label>
              <input
                type="password"
                required
                name="User_password"
                value={userData.User_password}
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
