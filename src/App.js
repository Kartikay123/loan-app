import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import UserPage from './Component/applyUser/applyUser';
import LandingPage from './Component/LandingPage/landingPage';
import AdminPage from './Component/AdminPage/adminPage';
import AlreadyUserPage from './Component/AlreadyUser/alreadyUser';
import LoginForm from './Component/LoginAdmin/loginAdmin';


function App() {
  return (
    <div className="App" >
      <Routes>
        <Route index element={<LandingPage/>} />
        <Route path="/user" element={<UserPage/>} />
        <Route path="/admin-register" element={<LoginForm/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/already-user" element={<AlreadyUserPage/>} />
      </Routes>
    </div>
  );
}

export default App;
