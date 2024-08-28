import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const UserEdite = () => {
  const [alert, setAlert] = useState({ visible: false, message: "" });
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `http://localhost:8000/api/user/${id}`;
  const [newUserData, setNewUserData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setNewUserData(data))
      .catch((error) => console.error("Error fetching User details:", error));
  }, [url]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/api/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    })
      .then((res) => {
        if (res.status === 409) {
          throw new Error("User already exists");
        } else if (res.status === 500) {
          throw new Error("Internal Server Error");
        }
        return res.json();
      })
      .then((data) => {
        setAlert({ visible: true, message: "User updated successfully" });
        setTimeout(() => {
          setAlert({ visible: false, message: "" });
          navigate("/User-show");
        }, 3000);
      })
      .catch((error) => {
        setAlert({ visible: true, message: error.message });
      });
  };

  if (!newUserData) {
    return (
      <section id="main-content">
        <section className="wrapper">
          <div className="row mt">
            <div className="col-lg-12">
              <div className="form-panel">
                <h4 className="mb">
                  <i className="fa fa-angle-right" /> Loading...
                </h4>
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
          <h1 className="card-title">Update User Status</h1>

          {/* Alert section */}
          {alert.visible && (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Notification:</strong> {alert.message}
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => setAlert({ visible: false, message: "" })}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}

          <form className="forms-sample" onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="exampleSelectStatus">User Status</label>
              <select
                name="User_status"
                value={newUserData.User_status}
                onChange={handleInputChange}
                className="form-control"
                id="exampleSelectStatus"
              >
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary mr-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
