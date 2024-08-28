import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

export const Cateedite = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `http://localhost:8000/api/category/${id}`;
  const [newCateData, setNewCateData] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [alert, setAlert] = useState({ visible: false, message: "" });

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setNewCateData(data);
        const imageUrl = `http://localhost:8000/image/${data.cate_image}`;
        setOriginalImage(imageUrl);
        setPreviewImageUrl(imageUrl);
      })
      .catch((error) => console.error("Error fetching Category details:", error));
  }, [url]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCateData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const fileType = imageFile.type;
      if (!fileType.match(/^image\/(jpeg|jpg|png)$/)) {
        setAlert({ visible: true, message: 'Incorrect file type. Please upload a JPEG, JPG, or PNG file.' });
        e.target.value = null;
        setPreviewImageUrl(originalImage);
        setNewCateData((prevData) => ({
          ...prevData,
          cate_image: originalImage,
        }));
        return;
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageDataUrl = event.target.result;
          setPreviewImageUrl(imageDataUrl);
        };
        reader.readAsDataURL(imageFile);

        setNewCateData((prevData) => ({
          ...prevData,
          cate_image: imageFile,
        }));
      }
    }
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("cate_name", newCateData.cate_name);
    formData.append("cate_description", newCateData.cate_description);
    formData.append("cate_image", newCateData.cate_image);

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
        setAlert({ visible: true, message: data.message });
        setTimeout(() => {
          setAlert({ visible: false, message: "" });
          navigate("/Cate-show");
        }, 3000); // Hide alert after 3 seconds
      })
      .catch((error) => {
        setAlert({ visible: true, message: error.message });
      });
  };

  const handleDelete = () => {
    fetch(url, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(error.error);
          });
        }
        return res.json();
      })
      .then((data) => {
        setAlert({ visible: true, message: data.message });
        setTimeout(() => {
          setAlert({ visible: false, message: "" });
          navigate("/Cate-show");
        }, 3000); // Hide alert after 3 seconds
      })
      .catch((error) => {
        setAlert({ visible: true, message: error.message });
      });
  };

  if (!newCateData) {
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
          <h1 className="card-title">Basic form elements</h1>
          <h1 className="card-description">Category Edit</h1>
          {alert.visible && (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Holy guacamole!</strong> {alert.message}
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
          <form className="forms-sample" onSubmit={handleAdd}>
            <div className="form-group">
              <label htmlFor="exampleInputName1">Category Name</label>
              <input
                type="text"
                required
                name="cate_name"
                value={newCateData.cate_name}
                onChange={handleInputChange}
                className="form-control"
                id="exampleInputName1"
                placeholder="Enter Category Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword4">Category Description</label>
              <input
                type="text"
                required
                name="cate_description"
                value={newCateData.cate_description}
                onChange={handleInputChange}
                className="form-control"
                id="exampleInputPassword4"
                placeholder="Enter description"
              />
            </div>
            <div className="form-group">
              <label className="col-sm-2 col-sm-2 control-label">Category Image</label>
              <div className="col-sm-10">
                <input
                  type="file"
                  name="cate_image"
                  onChange={handleImageChange}
                  className="form-control"
                />
              </div>
            </div>
            {previewImageUrl && (
              <img src={previewImageUrl} height={150} alt="preview" />
            )}
            <button type="submit" className="btn btn-primary mr-2">Submit</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </form>
        </div>
      </div>
    </div>
  );
};
