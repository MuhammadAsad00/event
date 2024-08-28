import React, { useEffect, useState } from 'react'
import  App  from '../App';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../auth/authSlice';
import { useDispatch } from 'react-redux';
import { Changepass } from './ChangePass';


export const Sidebar = () => {
  // const [protData, setEventData] = useState([]);

  // const url = "http://localhost:8000/api/event";
  
  // const fetchEventData = () => {
  //   return fetch(url)
  //     .then((res) => res.json())
  //     .then((d) => setEventData(d));
  // };

  // useEffect(() => {
  //     fetchEventData();
  // }, []);

  const dispatch = useDispatch();

  const logout_method = () => {
  
    dispatch(logout());
window.location.href="/"
  };


  const Goto_Changepass = () => {
window.location.href="/ChangePass"
  };



  

  const auth = useSelector((state) => state.auth);
  const { user,role,token } = auth;


   if (token){

    return (
      <div className="container-scroller">
    {role == "Admin" && (    <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
            <a className="sidebar-brand brand-logo" href="/"><img src="assets/images/logo3.png" alt="logo" /></a>
            <a className="sidebar-brand brand-logo-mini" href="/"><img src="assets/images/logo3-mini.png" alt="logo" /></a>
          </div>
          <ul className="nav">
            <li className="nav-item profile">
              <div className="profile-desc">
                <div className="profile-pic">
                  <div className="count-indicator">
                    <img className="img-xs rounded-circle " src="assets/images/faces/face15.jpg" alt />
                    <span className="count bg-success" />
                  </div>
                  <div className="profile-name">
                    <h5 className="mb-0 font-weight-normal">{user}</h5>
                    <span>{role}</span>
                  </div>
                </div>
                {/*  */}
              </div>
            </li>
            <li className="nav-item nav-category">
             
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" href="/">
                <span className="menu-icon">
                  <i className="mdi mdi-speedometer" />
                </span>
                <span className="menu-title">Dashboard</span>
              </a>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" data-toggle="collapse" href="#ui-basic1" aria-expanded="false" >
                <span className="menu-icon">
                  <i className="mdi mdi-laptop" />
                </span>
                <span className="menu-title">User</span>
                <i className="menu-arrow" />
              </a>
              <div className="collapse" id="ui-basic1">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="/user-add">Add User</a></li>
                  <li className="nav-item"> <a className="nav-link" href="/user-show">Show User</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" data-toggle="collapse" href="#ui-basic2" aria-expanded="false">
                <span className="menu-icon">
                  <i className="mdi mdi-laptop" />
                </span>
                <span className="menu-title">Category</span>
                <i className="menu-arrow" />
              </a>
              <div className="collapse" id="ui-basic2">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="/Cate-add">Add Category</a></li>
                  <li className="nav-item"> <a className="nav-link" href="/Cate-show">Show Category</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" data-toggle="collapse" href="#ui-basic3" aria-expanded="false" >
                <span className="menu-icon">
                  <i className="mdi mdi-laptop" />
                </span>
                <span className="menu-title">Location</span>
                <i className="menu-arrow" />
              </a>
              <div className="collapse" id="ui-basic3">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="/Location-add">Add Location</a></li>
                  <li className="nav-item"> <a className="nav-link" href="/Location-show">Show Location</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" data-toggle="collapse" href="#ui-basic4" aria-expanded="false">
                <span className="menu-icon">
                  <i className="mdi mdi-laptop" />
                </span>
                <span className="menu-title">Event</span>
                <i className="menu-arrow" />
              </a>
              <div className="collapse" id="ui-basic4">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="/Event-show">Show Event</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item menu-items">
              {/* <NavLink  to="/">
                <span className="menu-icon">
                  <i className="mdi mdi-playlist-play" />
                </span>
                <span className="menu-title">Form Elements</span>
              </NavLink> */}
            </li>
            
          </ul>
        </nav>)}
      

        {role == "Organizer" && (    <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
            <a className="sidebar-brand brand-logo" href="index.html"><img src="assets/images/logo3.png" alt="logo" /></a>
            <a className="sidebar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo-mini.svg" alt="logo" /></a>
          </div>
          <ul className="nav">
            <li className="nav-item profile">
              <div className="profile-desc">
                <div className="profile-pic">
                  <div className="count-indicator">
                    <img className="img-xs rounded-circle " src="assets/images/faces/face15.jpg" alt />
                    <span className="count bg-success" />
                  </div>
                  <div className="profile-name">
                    <h5 className="mb-0 font-weight-normal">{user}</h5>
                    <span>{role}</span>
                  </div>
                </div>
            
              </div>
            </li>
            <li className="nav-item nav-category">
              <span className="nav-link">Navigation</span>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" href="/">
                <span className="menu-icon">
                  <i className="mdi mdi-speedometer" />
                </span>
                <span className="menu-title">Dashboard</span>
              </a>
            </li>
        
            <li className="nav-item menu-items">
              <a className="nav-link" href="/Cate-show">
                <span className="menu-icon">
                  <i className="mdi mdi-laptop" />
                </span>
                <span className="menu-title">Category</span>
              </a>
              {/* <div className="collapse" id="ui-basic2">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="/Cate-show">Show Category</a></li>
                </ul>
              </div> */}
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link"  aria-expanded="false" href="/Location-show">
                <span className="menu-icon">
                  <i className="mdi mdi-laptop" />
                </span>
                <span className="menu-title">Location</span>
               
              </a>
              {/* <div className="collapse" id="ui-basic3">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="/Location-show">Show Location</a></li>
                </ul>
              </div> */}
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" data-toggle="collapse" href="#ui-basic4" aria-expanded="false">
                <span className="menu-icon">
                  <i className="mdi mdi-laptop" />
                </span>
                <span className="menu-title">Event</span>
                <i className="menu-arrow" />
              </a>
            
              <div className="collapse" id="ui-basic4">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="/Event-add">Add Event</a></li>
                  <li className="nav-item"> <a className="nav-link" href="/Event-show">All Event</a></li>
                  <li className="nav-item"> <a className="nav-link" href="/My-Event">My Event</a></li>
                </ul>
              </div>
                 
            </li>
            <li className="nav-item menu-items">
              {/* <NavLink  to="/">
                <span className="menu-icon">
                  <i className="mdi mdi-playlist-play" />
                </span>
                <span className="menu-title">Form Elements</span>
              </NavLink> */}
            </li>
            
          </ul>
        </nav>)}


        {role == "Exhibitor" && (    <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
            <a className="sidebar-brand brand-logo" href="index.html"><img src="assets/images/logo3.png" alt="logo" /></a>
            <a className="sidebar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo-mini.svg" alt="logo" /></a>
          </div>
          <ul className="nav">
            <li className="nav-item profile">
              <div className="profile-desc">
                <div className="profile-pic">
                  <div className="count-indicator">
                    <img className="img-xs rounded-circle " src="assets/images/faces/face15.jpg" alt />
                    <span className="count bg-success" />
                  </div>
                  <div className="profile-name">
                    <h5 className="mb-0 font-weight-normal">{user}</h5>
                    <span>{role}</span>
                  </div>
                </div>
              
              </div>
            </li>
            <li className="nav-item nav-category">
              <span className="nav-link">Navigation</span>
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link" href="/">
                <span className="menu-icon">
                  <i className="mdi mdi-speedometer" />
                </span>
                <span className="menu-title">Dashboard</span>
              </a>
            </li>
        
            <li className="nav-item menu-items">
              <a className="nav-link" href="/Cate-show">
                <span className="menu-icon">
                  <i className="mdi mdi-laptop" />
                </span>
                <span className="menu-title">Category</span>
              </a>
              {/* <div className="collapse" id="ui-basic2">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="/Cate-show">Show Category</a></li>
                </ul>
              </div> */}
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link"  aria-expanded="false" href="/Location-show">
                <span className="menu-icon">
                  <i className="mdi mdi-laptop" />
                </span>
                <span className="menu-title">Location</span>
               
              </a>
              {/* <div className="collapse" id="ui-basic3">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="/Location-show">Show Location</a></li>
                </ul>
              </div> */}
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link"  href="/Upcoming-Events" aria-expanded="false">
                <span className="menu-icon">
                  <i className="mdi mdi-laptop" />
                </span>
                <span className="menu-title">Event</span>
              </a>
              {/* <div className="collapse" id="ui-basic4">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="/Event-show">Show Event</a></li>
                </ul>
              </div> */}
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link"  href="/Previous-Events" aria-expanded="false">
                <span className="menu-icon">
                  <i className="mdi mdi-laptop" />
                </span>
                <span className="menu-title">Previous Evenets</span>
              </a>
             
            </li>
            <li className="nav-item menu-items">
              <a className="nav-link"  href="/Booth-show" aria-expanded="false">
                <span className="menu-icon">
                  <i className="mdi mdi-laptop" />
                </span>
                <span className="menu-title">My Booths</span>
              </a>
             
            </li>
            
          </ul>
        </nav>)}

        <div className="container-fluid page-body-wrapper">
        
          <nav className="navbar p-0 fixed-top d-flex flex-row">
            <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
              <a className="navbar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo3-mini.png" alt="logo" /></a>
            </div>
            <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
              <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                <span className="mdi mdi-menu" />
              </button>
              {/* <ul className="navbar-nav w-100">
                <li className="nav-item w-100">
                  <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                    <input type="text" className="form-control" placeholder="Search products" />
                  </form>
                </li>
              </ul> */}
              <ul className="navbar-nav navbar-nav-right">
                <li className="nav-item dropdown d-none d-lg-block">
                  {/* <a className="nav-link btn btn-success create-new-button" id="createbuttonDropdown" data-toggle="dropdown" aria-expanded="false" href="#">+ Create New Project</a> */}
                  <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="createbuttonDropdown">
                    <h6 className="p-3 mb-0">Projects</h6>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-file-outline text-primary" />
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1">Software Development</p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-web text-info" />
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1">UI Development</p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-layers text-danger" />
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1">Software Testing</p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <p className="p-3 mb-0 text-center">See all projects</p>
                  </div>
                </li>
                <li className="nav-item nav-settings d-none d-lg-block">
                  {/* <a className="nav-link" href="#">
                    <i className="mdi mdi-view-grid" />
                  </a> */}
                </li>
               
                <li className="nav-item dropdown border-left">
                  {/* <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                    <i className="mdi mdi-bell" />
                    <span className="count bg-danger" />
                  </a> */}
                  <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                    <h6 className="p-3 mb-0">Notifications</h6>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-calendar text-success" />
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject mb-1">Event today</p>
                        <p className="text-muted ellipsis mb-0"> Just a reminder that you have an event today </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-settings text-danger" />
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject mb-1">Settings</p>
                        <p className="text-muted ellipsis mb-0"> Update dashboard </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-link-variant text-warning" />
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject mb-1">Launch Admin</p>
                        <p className="text-muted ellipsis mb-0"> New admin wow! </p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <p className="p-3 mb-0 text-center">See all notifications</p>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link" id="profileDropdown" href="#" data-toggle="dropdown">
                    <div className="navbar-profile">
                      <img className="img-xs rounded-circle" src="assets/images/faces/face15.jpg" alt />
                      <p className="mb-0 d-none d-sm-block navbar-profile-name">{user}</p>
                      <i className="mdi mdi-menu-down d-none d-sm-block" />
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="profileDropdown">
                    <h6 className="p-3 mb-0">Profile</h6>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-lock text-success" />
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p onClick={Goto_Changepass} className="preview-subject mb-1">Change Password</p>
                      </div>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className="mdi mdi-logout text-danger" />
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p onClick={logout_method} className="preview-subject mb-1">Log out</p>
                      </div>
                    </a>
                  
                  </div>
                </li>
              </ul>
              <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                <span className="mdi mdi-format-line-spacing" />
              </button>
            </div>
          </nav>
        
          <App/>
         
        </div>
      
      </div>
        )
  }
  else{
    return(
      <App/>
    )
  }

}

