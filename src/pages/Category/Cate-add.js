import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Cateadd = () => {
  const [newCateData, setNewCateData] = useState({
    cate_name: "",
    cate_description: "",
    cate_image: null,
  });

  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [alert, setAlert] = useState({ visible: false, message: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const fileType = imageFile.type;
      if (!fileType.match(/^image\/(jpeg|jpg|png)$/)) {
        setAlert({ visible: true, message: "Incorrect file type. Please upload a JPEG, JPG, or PNG file." });
        e.target.value = null;
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

    fetch("http://localhost:8000/api/category", {
      method: "POST",
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

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Basic form elements</h1>
          <h1 className="card-description">Category Add</h1>
          {alert.visible && (
            <div className="alert alert-primary alert-dismissible fade show" role="alert">
            {alert.message}<strong>!!!</strong>
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
                  required
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
          </form>
        </div>
      </div>
    </div>
  );
};
