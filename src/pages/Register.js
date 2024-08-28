import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [newUserData, setNewUserData] = useState({
    User_name: "",
    User_password: "",
    User_contact: "",
    User_email: "",
    role: "",
    User_status: ""
  });

  const [errors, setErrors] = useState({}); // State for holding validation errors

  const handleinputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newUserData.User_name) newErrors.User_name = "Username is required.";
    if (!newUserData.User_password || newUserData.User_password.length < 6) {
      newErrors.User_password = "Password is required and must be at least 6 characters.";
    }
    if (!newUserData.User_email || !/\S+@\S+\.\S+/.test(newUserData.User_email)) {
      newErrors.User_email = "A valid email is required.";
    }
    if (!newUserData.User_contact || !/^\d{10}$/.test(newUserData.User_contact)) {
      newErrors.User_contact = "A valid 10-digit contact number is required.";
    }
    if (!newUserData.role) newErrors.role = "Role is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, proceed with submission
      fetch("http://localhost:8000/api/user", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserData),
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
          alert(data.message);
          navigate("/login");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="row w-100 m-0">
          <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
            <div className="card col-lg-4 mx-auto">
              <div className="card-body px-5 py-5">
                <h3 className="card-title text-left mb-3">Register</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">User Name</label>
                    <input
                      type="text"
                      required
                      name='User_name'
                      value={newUserData.User_name}
                      onChange={handleinputChange}
                      className={`form-control ${errors.User_name ? 'is-invalid' : ''}`}
                      id="exampleInputName1"
                      placeholder="Name"
                    />
                    {errors.User_name && <div className="invalid-feedback">{errors.User_name}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword4">User Password</label>
                    <input
                      type="password"
                      required
                      name='User_password'
                      value={newUserData.User_password}
                      onChange={handleinputChange}
                      className={`form-control ${errors.User_password ? 'is-invalid' : ''}`}
                      id="exampleInputPassword4"
                      placeholder="Password"
                    />
                    {errors.User_password && <div className="invalid-feedback">{errors.User_password}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail3">Email address</label>
                    <input
                      type="email"
                      required
                      name='User_email'
                      value={newUserData.User_email}
                      onChange={handleinputChange}
                      className={`form-control ${errors.User_email ? 'is-invalid' : ''}`}
                      id="exampleInputEmail3"
                      placeholder="Email"
                    />
                    {errors.User_email && <div className="invalid-feedback">{errors.User_email}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="exampleInputPhone">User Contact</label>
                    <input
                      type="tel"
                      required
                      name='User_contact'
                      value={newUserData.User_contact}
                      onChange={handleinputChange}
                      className={`form-control ${errors.User_contact ? 'is-invalid' : ''}`}
                      id="exampleInputPhone"
                      placeholder="Contact"
                    />
                    {errors.User_contact && <div className="invalid-feedback">{errors.User_contact}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="exampleSelectGender">Role</label>
                    <select
                      name='role'
                      required
                      value={newUserData.role}
                      onChange={handleinputChange}
                      className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                      id="exampleSelectGender"
                    >
                      <option value="" disabled>Choose Role</option>
                      <option value="Organizer">Organizer</option>
                      <option value="Exhibitor">Exhibitor</option>
                    </select>
                    {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block enter-btn">Register</button>
                  </div>
                  
                  <p className="sign-up text-center">Already have an Account? <a href="/login">Sign In</a></p>
                 
                </form>
              </div>
            </div>
          </div>
          {/* content-wrapper ends */}
        </div>
        {/* row ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>
  );
}
