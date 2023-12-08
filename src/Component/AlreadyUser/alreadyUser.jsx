import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './alreadyUser.css';

function AlreadyUserPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showRepaymentSchedule, setShowRepaymentSchedule] = useState(false);
    // Assuming you have these state variables defined for repayment schedule
    const [students, setStudents] = useState([]);
    const [repaymentSchedule, setRepaymentSchedule] = useState([]);
    const [isapprove, setisapprove]= useState(false);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const checkEmailExists = () => {
        const existingStudentsData = localStorage.getItem('studentData');
        if (existingStudentsData) {
            const students = JSON.parse(existingStudentsData);
            const foundStudent = students.find((student) => student.email === email);
            if (foundStudent) {
                setMessage('Email exists in localStorage');
                if(foundStudent.isApproved===true)
                {
                    setisapprove(true);
                }
                const weeklyRepayment = foundStudent.amount / foundStudent.term;
                const schedule = generateRepaymentSchedule(
                    foundStudent.applicationDate,
                    foundStudent.term,
                    weeklyRepayment
                );

                // Set the repayment schedule
                setRepaymentSchedule(schedule);
                setShowRepaymentSchedule(true);
            } else {
                setMessage('Email does not exist in localStorage');
                setShowRepaymentSchedule(false);
            }
        } else {
            setMessage('localStorage is empty or does not exist');
            setShowRepaymentSchedule(false);
        }

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
            <div className='email-input'>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    style={{ padding: '17px', fontSize: '24px', width: '250px' }}
                />
                <button className='btn-alreadyuser' onClick={checkEmailExists}>Check</button>
                {/* <p>{message}</p> */}
            </div>
            {showRepaymentSchedule && (
                <div className='repayment-schedule'>
                    <>
                        {isapprove ? (
                            <button className='btn' style={{ marginBottom: '20px' }}>
                                Approved
                            </button>
                        ) : (
                            <button className='btn' style={{ marginBottom: '20px' }}>
                                Pending
                            </button>
                        )}
                    </>
                    <h2>Repayment Schedule</h2>
                    <div className='schedule'>
                        {repaymentSchedule.map((repayment, index) => (
                            <div key={index} className='repayment-item'>
                                <p>Date: {repayment.date}</p>
                                <p>Amount: {repayment.amount} $</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
export default AlreadyUserPage;
