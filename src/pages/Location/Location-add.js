import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Locationadd = () => {
  const [newLocData, setnewLocData] = useState({
    Location_name: "",
    City: "",
    Locality: "",
    Area: "",
    Image: null,
    suggested_booth_count: "",
  });

  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [alert, setAlert] = useState({ visible: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleinputChange = (e) => {
    const { name, value } = e.target;
    setnewLocData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const fileType = imageFile.type;
      if (!fileType.match(/^image\/(jpeg|jpg|png)$/)) {
        setAlert({
          visible: true,
          message: "Incorrect file type. Please upload a JPEG, JPG, or PNG file.",
          type: "danger",
        });
        e.target.value = null;
        return;
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageDataUrl = event.target.result;
          setPreviewImageUrl(imageDataUrl);
        };
        reader.readAsDataURL(imageFile);

        setnewLocData((prevData) => ({
          ...prevData,
          Image: imageFile,
        }));
      }
    }
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Location_name", newLocData.Location_name);
    formData.append("City", newLocData.City);
    formData.append("Locality", newLocData.Locality);
    formData.append("Area", newLocData.Area);
    formData.append("Image", newLocData.Image);
    formData.append("suggested_booth_count", newLocData.suggested_booth_count);

    fetch("http://localhost:8000/api/location", {
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
        setAlert({
          visible: true,
          message: "Location added successfully!",
          type: "success",
        });
        setTimeout(() => {
          setAlert({ visible: false, message: "", type: "" });
          navigate("/location-show");
        }, 3000); // Hide alert after 3 seconds
      })
      .catch((error) => {
        setAlert({
          visible: true,
          message: error.message,
          type: "danger",
        });
      });
  };

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Basic form elements</h1>
          <h1 className="card-description"> Location Add </h1>
          {alert.visible && (
            <div
              className={`alert alert-${alert.type} alert-dismissible fade show`}
              role="alert"
            >
              {alert.message}
              <strong>!!!</strong>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => setAlert({ visible: false, message: "", type: "" })}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <form className="forms-sample" onSubmit={handleAdd}>
            <div className="form-group">
              <label htmlFor="exampleInputName1">Location Name</label>
              <input
                type="text"
                required
                name="Location_name"
                value={newLocData.Location_name}
                onChange={handleinputChange}
                className="form-control"
                id="exampleInputName1"
                placeholder="Enter Location Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword4">City</label>
              <input
                type="text"
                required
                name="City"
                value={newLocData.City}
                onChange={handleinputChange}
                className="form-control"
                id="exampleInputPassword4"
                placeholder="Enter City"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword4">Locality</label>
              <input
                type="text"
                required
                name="Locality"
                value={newLocData.Locality}
                onChange={handleinputChange}
                className="form-control"
                id="exampleInputPassword4"
                placeholder="Enter Locality"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword4">Area</label>
              <input
                type="text"
                required
                name="Area"
                value={newLocData.Area}
                onChange={handleinputChange}
                className="form-control"
                id="exampleInputPassword4"
                placeholder="Enter Area in Sqft"
              />
            </div>
            <div className="form-group">
              <label className="col-sm-2 col-sm-2 control-label">Image</label>
              <div className="col-sm-10">
                <input
                  type="file"
                  required
                  name="Image"
                  onChange={handleImageChange}
                  className="form-control"
                />
              </div>
            </div>
            {previewImageUrl ? (
              <img src={previewImageUrl} height={150} alt="preview" />
            ) : null}
            <div className="form-group">
              <label htmlFor="exampleInputPassword4">Booth</label>
              <input
                type="number"
                required
                name="suggested_booth_count"
                value={newLocData.suggested_booth_count}
                onChange={handleinputChange}
                className="form-control"
                id="exampleInputPassword4"
                placeholder="Enter Booth"
              />
            </div>

            <button type="submit" className="btn btn-primary mr-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
