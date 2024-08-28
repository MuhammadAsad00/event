import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export const Cateshow = () => {
  const url = "http://localhost:8000/api/category";
  const [cateData, setCateData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [alert, setAlert] = useState({ visible: false, message: "", type: "" }); // State for alert
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [categoryToDelete, setCategoryToDelete] = useState(null); // State for category ID to delete
  const role = useSelector((state) => state.auth.role);

  const fetchCateData = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setCateData(d));
  };

  useEffect(() => {
    fetchCateData();
  }, []);

  const showModal = (id) => {
    setCategoryToDelete(id);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setCategoryToDelete(null);
  };

  const delCat = () => {
    fetch(`http://localhost:8000/api/category/${categoryToDelete}`, {
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
      setAlert({ visible: true, message: data.message, type: "danger" });
      hideModal();
      return fetchCateData();
    })
    .catch((error) => {
      setAlert({ visible: true, message: error.message, type: "danger" });
      hideModal();
    });
  };

  // Filtered categories based on search term
  const filteredCateData = cateData.filter((dataObj) => 
    dataObj.cate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataObj.cate_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="page-header">
        {role === "Admin" && (
          <Link to={`/cate-add`} className="btn btn-primary btn-md">Insert A new Category</Link>
        )}
          <h1 className="card-title">Category Show</h1>

        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                {alert.visible && (
                  <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.message} <strong>!!!</strong>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                      onClick={() => setAlert({ visible: false, message: "", type: "" })}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                )}

                {modalVisible && (
                  <div className="modal fade show" style={{ display: 'block' }} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Confirm Delete</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          Are you sure you want to delete this category?
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={hideModal}>Cancel</button>
                          <button type="button" className="btn btn-danger" onClick={delCat}>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <ul className="navbar-nav w-100">
                  <li className="nav-item w-100">
                    <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search categories" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
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
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        
                        {role === "Admin" && (
                          <>
                            <th>Edit</th>
                            <th>Delete</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCateData.map((dataObj, index) => (
                        <tr key={dataObj._id}>
                          <td>{index + 1}</td>
                          <td>{dataObj.cate_name}</td>
                          <td>{dataObj.cate_description}</td>
                          <td>
                            <img 
                              src={`http://localhost:8000/image/${dataObj.cate_image}`} 
                              height={100} 
                              width={150} 
                              alt={dataObj.cate_name} 
                            />
                          </td>
                        
                          {role === "Admin" && (
                            <>
                              <td>
                                <Link to={`/Cate-edite/${dataObj._id}`}> 
                                  <div className="badge badge-outline-warning">Edit</div> 
                                </Link>
                              </td>
                              <td>
                                <div 
                                  onClick={() => showModal(dataObj._id)} 
                                  className="badge badge-outline-danger"
                                  style={{ cursor: 'pointer' }} // Added cursor style for better UX
                                >
                                  Delete
                                </div>
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
