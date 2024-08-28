import logo from './logo.svg';
import './App.css';
import { Dashboard } from './Dashboard';
import { Useradd } from './pages/User/User-add';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { Sidebar } from './pages/Sidebar';
import { Usershow } from './pages/User/User-show.js';
import { UserEdite } from './pages/User/User-Edite';
import { Cateadd } from './pages/Category/Cate-add';
import { Cateshow } from './pages/Category/Cate-show';
import { Cateedite } from './pages/Category/Cate-edite';
import { Locationadd } from './pages/Location/Location-add';
import { Locationshow } from './pages/Location/Location-show';
import { Locationedite } from './pages/Location/Location-edite';
import { Eventadd } from './pages/Event/Event-add';
import { Eventshow } from './pages/Event/Event-show';
import { Eventedite } from './pages/Event/Event-edite';
import { Login } from './pages/login';
import { Register } from './pages/Register';
import { Boothadd } from './pages/Booth/Booth-add';
import { Eventview } from './pages/Event/Event-view.js';
import { Changepass } from './pages/ChangePass.js';
import { Boothshow } from './pages/Booth/Booth-show.js';
import { Myevent } from './pages/Event/My-Event';
import { Eventstatus } from './pages/Event/Event-status';
import { Upcoming } from './pages/Event/Upcoming-Events.js';
import { Previous } from './pages/Event/Previous-Events.js';
import { Forgetpassword,  } from './pages/Forgetpassword.js';
import { Resetpassword } from './pages/Resetpassword.js';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { EventBoothshow } from './pages/Booth/EventBooth-show';



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = useSelector((state) => state.auth.token)
 

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/" />;
  };

  return (

 <BrowserRouter>
  <Routes>
  <Route path="/" element={ token ? <Dashboard/> : <Login/> }/>
   <Route path="/dashboard" element={<PrivateRoute><Dashboard /> </PrivateRoute>}/>
   <Route path="/User-add" element={<Useradd/>}/>
   <Route path="/User-show" element={<Usershow/>}/>
   <Route path="/User-Edite/:id" element={<UserEdite/>}/>
    
   <Route path="/Cate-add" element={<Cateadd/>}/>
   <Route path="/Cate-show" element={<Cateshow/>}/>
   <Route path="/Cate-edite/:id" element={<Cateedite/>}/> 

   <Route path="/Location-add" element={<Locationadd/>}/>
   <Route path="/Location-show" element={<Locationshow/>}/>
   <Route path="/Location-edite/:id" element={<Locationedite/>}/> 
   
   <Route path="/Event-add" element={<Eventadd/>}/>
   <Route path="/Event-show" element={<Eventshow/>}/>
   <Route path="/Event-edite/:id" element={<Eventedite/>}/> 
   <Route path="/Event-status/:id" element={<Eventstatus/>}/> 
   <Route path="/Event-view/:id" element={<Eventview/>}/> 
   <Route path="/My-Event" element={<Myevent/>}/> 
   <Route path="/Upcoming-Events" element={<Upcoming/>}/> 
   <Route path="/Previous-Events" element={<Previous/>}/> 

   <Route path="/Booth-add" element={<Boothadd/>}/> 
   <Route path="/Booth-show/:id" element={<Boothshow/>}/> 
   <Route path="/EventBooth-show/:id" element={<EventBoothshow/>}/> 

   
   <Route path="/Forgetpassword" element={<Forgetpassword/>}/>
   <Route path="/Register" element={<Register/>}/>

   <Route path="/ChangePass" element={<Changepass/>}/> 
   <Route path="/Resetpassword" element={<Resetpassword/>}/>
   </Routes>
 </BrowserRouter>
  );
}

export default App;
