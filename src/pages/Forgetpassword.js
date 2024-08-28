import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Forgetpassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({ visible: false, message: '' });
  const navigate = useNavigate();
  const url = `http://localhost:8000/api/user`;

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ User_email: email }),
    })
      .then((res) => {
        if (res.status === 404) {
          throw new Error('Email not found');
        } else if (res.status === 500) {
          throw new Error('Internal Server Error');
        }
        return res.json();
      })
      .then(() => {
        setAlert({
          visible: true,
          message: 'Email exists, proceed with password reset.',
        });
        setTimeout(() => {
          setAlert({ visible: false, message: '' });
          // Pass the email to Resetpassword
          navigate('/Resetpassword', { state: { email } });
        }, 3000); // Hide alert after 3 seconds
      })
      .catch((error) => {
        setAlert({
          visible: true,
          message: 'Hey! You should check email  again.',
        });
        setTimeout(() => {
          setAlert({ visible: false, message: '' });
        }, 3000); // Hide alert after 3 seconds
      });
  };

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Forgot Password</h1>

          {alert.visible && (
            <div className="alert alert-primary alert-dismissible fade show" role="alert">
              {alert.message}<strong>!!!</strong>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => setAlert({ visible: false, message: '' })}
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
                value={email}
                onChange={handleInputChange}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter your email"
              />
            </div>
            <button type="submit" className="btn btn-primary mr-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
