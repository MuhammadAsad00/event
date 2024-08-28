import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const [showevent, setDash_user] = useState([]);
  const [showcategory, setdash_decoration] = useState([]);
  const [showuser, setdash_user] = useState([]);
  const [protData, seteventData] = useState([]);

  const url = "http://localhost:8000/api/event";
  

  const fetcheventData = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => {
        // Filter the data to show only upcoming events
        const upcomingEvents = d.filter(event => new Date(event.eventDate) > new Date());
        seteventData(upcomingEvents);
      });
  };



const fetchevent = () => {
  return fetch("http://localhost:8000/api/dash_event")
  .then((res) => res.json())
  .then((d) => setDash_user(d));
  };
  
  
  const fetchcategory = () => {
  return fetch("http://localhost:8000/api/dash_category")
  .then((res) => res.json())
  .then((d) => setdash_decoration(d));
  };

  
  const fetchuser = () => {
    return fetch("http://localhost:8000/api/dash_user")
    .then((res) => res.json())
    .then((d) => setdash_user(d));
    };
  useEffect(() => {
    fetchevent();
   fetchcategory();
   fetchuser();
   fetcheventData();

  // fetchdecoration();
  // fetchuser();
  
  }, []);
  
  return (
    <div className="main-panel">
  <div className="content-wrapper">
   
    <div className="row">
      <div className="col-sm-4 grid-margin">
        <div className="card">
          <div className="card-body">
            <h5>Our Total Evenets</h5>
            <div className="row">
              <div className="col-8 col-sm-12 col-xl-8 my-auto">
                <div className="d-flex d-sm-block d-md-flex align-items-center">
                  <h2 className="mb-0">{showevent.event}</h2>
                  <p className="text-success ml-2 mb-0 font-weight-medium"></p>
                </div>
                <h6 className="text-muted font-weight-normal"></h6>
              </div>
              <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                <i className="icon-lg mdi mdi-codepen text-primary ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-4 grid-margin">
        <div className="card">
          <div className="card-body">
            <h5>Our Total Categories</h5>
            <div className="row">
              <div className="col-8 col-sm-12 col-xl-8 my-auto">
                <div className="d-flex d-sm-block d-md-flex align-items-center">
                  <h2 className="mb-0">{showcategory.category}</h2>
                  <p className="text-success ml-2 mb-0 font-weight-medium"></p>
                </div>
                <h6 className="text-muted font-weight-normal"></h6>
              </div>
              <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                <i className="icon-lg mdi mdi-wallet-travel text-danger ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-4 grid-margin">
        <div className="card">
          <div className="card-body">
            <h5>User</h5>
            <div className="row">
              <div className="col-8 col-sm-12 col-xl-8 my-auto">
                <div className="d-flex d-sm-block d-md-flex align-items-center">
                  <h2 className="mb-0">{showuser.user}</h2>
         
                </div>
                <h6 className="text-muted font-weight-normal"></h6>
              </div>
              <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                <i className="icon-lg mdi mdi-monitor text-success ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between">
              <h4 className="card-title mb-1"> Upcoming Events</h4>
              <p className="text-muted mb-1">Time And Date</p>
            </div>
            <div className="row">
            {protData.map((dataObj, index) => (
              <div className="col-12" key={index}>
                <div className="preview-list">
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-primary">
                        <i className="mdi mdi-file-document" />
                      </div>
                    </div>
                    <div className="preview-item-content d-sm-flex flex-grow">
                      <div className="flex-grow">
                      <Link to={`/Event-view/${dataObj._id}`}> <h6 className="preview-subject"> {dataObj.eventName}</h6></Link>
                        <p className="text-muted mb-0"> {dataObj.category.cate_name}</p>
                      </div>
                      <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                        <p className="text-muted">{dataObj.timeStart}</p>
                        <p className="text-muted mb-0">{dataObj.eventDate} </p>
                      </div>
                    </div>
                  </div>
          
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  
  </div>
  {/* content-wrapper ends */}
  {/* partial:partials/_footer.html */}
  <footer className="footer">
    <div className="d-sm-flex justify-content-center justify-content-sm-between">
    </div>
  </footer>
  {/* partial */}
</div>
  )
}
