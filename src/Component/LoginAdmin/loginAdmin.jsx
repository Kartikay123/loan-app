import AdminRegistrationForm from '../AdminRegister/adminRegister';
import './loginAdmin.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const LoginForm = () => {
    const navigate= useNavigate();
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingStudentsData = localStorage.getItem('AdminData');
        console.log(existingStudentsData);
        if (existingStudentsData) {
            const students = JSON.parse(existingStudentsData);
            const foundAdmin = students.find((student) => student.email.trim() === email.trim());

            if (foundAdmin) {
                alert('Login successful!');
               
                navigate('/admin');
                
            } else {
                alert('Invalid email.');
            }
        } else {
            alert('No registered users found.');
        }
    };

    useEffect(() => {
        // Convert the existing adminData into an array if it's not already in array format
        const existingAdminData = localStorage.getItem('AdminData');
        if (existingAdminData && !Array.isArray(JSON.parse(existingAdminData))) {
            const adminDataArray = [JSON.parse(existingAdminData)];
            localStorage.setItem('AdminData', JSON.stringify(adminDataArray));
        }
    }, []);

    return (
        <div>
            <h1>Admin Registration/Login Page</h1>
            <div className='admin-container'>
                <AdminRegistrationForm />
                <div className="cart-login">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="cart-item-login">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <button className='btn' type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
