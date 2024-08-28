import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

export const Locationedite = () => {
 
  const navigate = useNavigate();
  const {id} = useParams();
  const url = `http://localhost:8000/api/location/${id}`;
  const [newLocData, setNewLocData] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [originalImage, setOrignalImage] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) =>{
        setNewLocData(data);
      const imageUrl =`http://localhost:8000/image/${data.Image}`;
    setOrignalImage(imageUrl);
    setPreviewImageUrl(imageUrl);
    })
      .catch((error) => console.error("Error fetching Category details:", error));
  }, [url]);

  const handleinputChange = (e) => {
    const { name, value } = e.target;
    setNewLocData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const fileType = imageFile.type;
      if (!fileType.match(/^image\/(jpeg|jpg|png)$/)) {
        alert('Incorrect file type. Please upload a JPEG, JPG, or PNG file.');
        e.target.value = null;
        setPreviewImageUrl(originalImage);
        setNewLocData((prevData) => ({
          ...prevData,
          Image:originalImage,
        }));
        return;
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageDataUrl = event.target.result;
          setPreviewImageUrl(imageDataUrl);
        };
        reader.readAsDataURL(imageFile);

        setNewLocData((prevData) => ({
          ...prevData,
          Image:imageFile,
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
        alert(data.message);
        navigate("/Location-show");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  



  if (!newLocData) {
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
      <h1 className="card-description"> Location Edit </h1>
        <form className="forms-sample" onSubmit={handleAdd}>
          <div className="form-group">
            <label htmlFor="exampleInputName1">Location Name</label>
            <input type="text" required name='Location_name' value={newLocData.Location_name} onChange={handleinputChange} className="form-control" id="exampleInputName1" placeholder="User Name" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword4">City</label>
            <input type="text" required name='City' value={newLocData.City} onChange={handleinputChange} className="form-control" id="exampleInputPassword4" placeholder="User Password" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword4">Locality</label>
            <input type="text" required name='Locality' value={newLocData.Locality} onChange={handleinputChange} className="form-control" id="exampleInputPassword4" placeholder="User Password" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword4">Area</label>
            <input type="text" required name='Area' value={newLocData.Area} onChange={handleinputChange} className="form-control" id="exampleInputPassword4" placeholder="User Password" />
          </div>
          <div className="form-group">
              <label className="col-sm-2 col-sm-2 control-label">Image</label>
              <div className="col-sm-10">
                <input type="file"  name="Image"    onChange={handleImageChange} className="form-control" />
              </div>
            </div>
            {previewImageUrl ?
              ( <img src={previewImageUrl} height={150} alt="preview"/>): null
            }
          
          <div className="form-group">
            <label htmlFor="exampleInputPassword4">Booth</label>
            <input type="text" required name='suggested_booth_count' value={newLocData.suggested_booth_count} onChange={handleinputChange} className="form-control" id="exampleInputPassword4" placeholder="User Password" />
          </div>

          <button type="submit" className="btn btn-primary mr-2">Submit</button>
        
        </form>
      </div>
    </div>
  </div>
  );
};

