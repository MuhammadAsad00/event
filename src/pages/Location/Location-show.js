import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export const Locationshow = () => {
    const url = "http://localhost:8000/api/location";
    const [LocData, setLocData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for locality search
    const role = useSelector((state) => state.auth.role);

    const fetchLocData = () => {
      return fetch(url)
        .then((res) => res.json())
        .then((d) => setLocData(d));
    };

    useEffect(() => {
        fetchLocData();
    }, []);

    const delLoc = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this location?");
        if (!confirmed) {
            return; 
        }

        fetch(`http://localhost:8000/api/location/${id}`, {
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
            return fetchLocData();
        })
        .catch((error) => {
            alert(error.message);
        });
    };

    // Filter locations based on search term
    const filteredLocData = LocData.filter((dataObj) => 
        dataObj.Locality.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="page-header">
                {role === "Admin" && (
                    <Link to={`/Location-add`} className="btn btn-primary btn-md">Insert A new Location</Link>
                    )}
                    <h1 className="card-title">Location Show</h1>

                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <ul className="navbar-nav w-100">
                                    <li className="nav-item w-100">
                                        <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Search by locality" 
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                                            />
                                                {/* Reload Button */}
                                                <button 
                                                type="button" 
                                                className="btn btn-secondary ml-2" 
                                                onClick={() => window.location.reload()} // Reload the page
                                                title="Reload Page"
                                            >
                                                Reload
                                            </button>
                                        </form>
                                    </li>
                                </ul>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>City</th>
                                                <th>Locality</th>
                                                <th>Area</th>
                                                <th>Image</th>
                                                <th>Booth</th>
                                                {role === "Admin" && (
                                                    <>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredLocData.map((dataObj, index) => (
                                                <tr key={dataObj._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{dataObj.Location_name}</td>
                                                    <td>{dataObj.City}</td>
                                                    <td>{dataObj.Locality}</td>
                                                    <td>{dataObj.Area}</td>   
                                                    <td>
                                                        <img src={`http://localhost:8000/image/${dataObj.Image}`} height={100} width={150} alt=""/>
                                                    </td>
                                                    <td>{dataObj.suggested_booth_count}</td>
                                                    {role === "Admin" && (
                                                        <>
                                                            <td>
                                                                <Link to={`/Location-edite/${dataObj._id}`}>
                                                                    <div className="badge badge-outline-warning">Edit</div>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <div onClick={() => delLoc(dataObj._id)} className="badge badge-outline-danger">Delete</div>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
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
