import './adminPage.css';
import React, { useState, useEffect } from 'react';

const AdminPage = () => {
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        // Retrieve stored data from localStorage
        const storedData = localStorage.getItem('studentData');

        if (storedData) {
            // Convert the retrieved string back to an array
            const parsedData = JSON.parse(storedData);
            setStudentData(parsedData);
        }
    }, []);

    const handleDelete = (index) => {
        const updatedData = [...studentData];
        updatedData.splice(index, 1); // Remove the item at the specified index
        setStudentData(updatedData);
        localStorage.setItem('studentData', JSON.stringify(updatedData));
    };

    const handleApproval = (index) => {
        const updatedData = [...studentData];
        updatedData[index].isApproved = true;
        setStudentData(updatedData);
        localStorage.setItem('studentData', JSON.stringify(updatedData));
    };

    return (
        <div className='admin-page'>
            <h2>Admin Page</h2>
            <table className='user-table'>
                <thead>

                    <tr>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Term</th>
                        <th>Application Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {studentData.map((student, index) => (
                        <tr key={index} className='user-item'>
                            <td>{student.email}</td>
                            <td>{student.amount}</td>
                            <td>{student.term}</td>
                            <td>{student.applicationDate}</td>
                            <td>
                                <div className='button-dist'>
                                    <button className='btn' onClick={() => handleDelete(index)}>Reject</button>
                                    <button className='btn' onClick={() => handleApproval(index)}>Approve</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
