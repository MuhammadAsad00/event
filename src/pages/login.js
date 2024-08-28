import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../auth/authSlice';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newUserData, setNewUserData] = useState({
    User_email: "",
    User_password: "",
  });

  const [alert, setAlert] = useState({ visible: false, message: "", type: "success" });

  const auth = useSelector((state) => state.auth);
  const { status, error, message } = auth;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(newUserData));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      setAlert({ visible: true, message: message, type: 'success' });
      setTimeout(() => {
        setAlert({ visible: false, message: "", type: 'success' });
        navigate('/dashboard'); // Navigate after alert is hidden
      }, 1000); // Show the alert for 3 seconds
    } else if (status === 'failed') {
      setAlert({ visible: true, message: error, type: 'danger' });
      setTimeout(() => {
        setAlert({ visible: false, message: "", type: 'danger' });
      }, 3000); // Show the alert for 3 seconds
    }
  }, [status, error, navigate, message]);

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="row w-100 m-0">
          <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
            {/* Render the overlay and alert conditionally */}
            {alert.visible && (
              <>
                <div className="alert-overlay" />
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                  {alert.message}
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => setAlert({ visible: false, message: "", type: alert.type })}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </>
            )}

            <div className="card col-lg-4 mx-auto">
              <div className="card-body px-5 py-5">
                <h3 className="card-title text-left mb-3">Login</h3>
                <form className="forms-sample" onSubmit={handleLogin}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail3">Email address</label>
                    <input
                      type="email"
                      required
                      name='User_email'
                      value={newUserData.User_email}
                      onChange={handleInputChange}
                      className="form-control"
                      id="exampleInputEmail3"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword4">User Password</label>
                    <input
                      type="password"
                      required
                      name='User_password'
                      value={newUserData.User_password}
                      onChange={handleInputChange}
                      className="form-control"
                      id="exampleInputPassword4"
                      placeholder="Password"
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block enter-btn">Login</button>
                  </div>
                  <p className="sign-up">Forgetpassword?<a href="/Forgetpassword"> Forgot password </a></p>
                  <p className="sign-up">Don't have an Account?<a href="/Register"> Register </a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
