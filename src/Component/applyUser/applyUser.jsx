import React, { useState } from 'react';
import './applyUser.css';
import { Link } from 'react-router-dom';

const UserPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        amount: '',
        term: '',
        applicationDate: '', // New field for application date
    });

    const [students, setStudents] = useState([]);
    const [repaymentSchedule, setRepaymentSchedule] = useState([]);
    const [showRepaymentSchedule, setShowRepaymentSchedule] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const studentDetails = {
            email: formData.email,
            amount: formData.amount,
            term: formData.term,
            applicationDate: formData.applicationDate,
            isApproved: false,
            isAdmin: false,
        };

        // Add new student details to the array
        setStudents([...students, studentDetails]);

        // Calculate weekly repayment and schedule
        const weeklyRepayment = formData.amount / formData.term;
        const schedule = generateRepaymentSchedule(
            formData.applicationDate,
            formData.term,
            weeklyRepayment
        );

        // Set the repayment schedule
        setRepaymentSchedule(schedule);
        setShowRepaymentSchedule(true);

        const existingStudentsData = localStorage.getItem('studentData');
        let allStudents = [];

        if (existingStudentsData) {
            allStudents = JSON.parse(existingStudentsData);
        }

        // Add new student details to the array with additional fields
        allStudents.push({
            ...studentDetails,
            isApproved: false,
            isAdmin: false,
        });

        // Set the updated data in localStorage
        localStorage.setItem('studentData', JSON.stringify(allStudents));

        // Clear the form after submission
        setFormData({
            email: '',
            amount: '',
            term: '',
            applicationDate: '',
        });
    };
    // Function to generate the repayment schedule
    const generateRepaymentSchedule = (startDate, term, weeklyRepayment) => {
        const schedule = [];
        let currentDate = new Date(startDate);

        for (let i = 0; i < term; i++) {
            schedule.push({
                date: new Date(currentDate).toLocaleDateString(),
                amount: weeklyRepayment.toFixed(2),
            });
            currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
        }
        return schedule;
    };

    
    return (
        <div className='userinfo'>

            <div className='card-user'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Email: {/* Changed label to reflect 'Email' */}
                            <br />
                            <input
                                type="text" // Assuming email as text input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Amount:
                            <br />
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Loan Term:
                            <br />
                            <input
                                type="number"
                                name="term"
                                value={formData.term}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label >
                            Application Date:
                            <br />
                            <input
                                type="date"
                                name="applicationDate"
                                value={formData.applicationDate}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button className='btn' type="submit">Apply for Loan</button>
                </form>
            </div>
            {showRepaymentSchedule && (
                <div className='repayment-schedule'>
                    <>
                        {students.length > 0 && (
                            <button className='btn' style={{ marginBottom: '20px' }}>
                                {students[students.length - 1].isApproved ? 'Approved' : 'Pending'}
                            </button>
                        )}
                    </>
                    <h2>Repayment Schedule</h2>
                    <div className='schedule'>
                        {repaymentSchedule.map((repayment, index) => (
                            <div key={index} className='repayment-item'>
                                <p>Date: {repayment.date}</p>
                                <p>Amount Pending: {repayment.amount} $</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className='already'>
                <h1> Already a User</h1>
                <Link to="/already-user">
                    <button className='btn'>Click Here</button>
                </Link>
                {/* <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className='btn' onClick={checkEmailExists}>Check</button>
                 */}
            </div>

        </div>
    );
};

export default UserPage;
