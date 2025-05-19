import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedPatients = localStorage.getItem("hospitalPatients");
        if (storedPatients) {
            setPatients(JSON.parse(storedPatients));
        }
    }, []);

    return (
        <div className="container mt-4">
            <h2 className='mt-5 mb-5'>Registered Patients</h2>

            {patients.length === 0 ? (
                <p>No Date Found.</p>
            ) : (
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>T.No</th>
                            <th>Patient Name</th>
                            <th>Mobile</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Problem</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{patient.patientName}</td>
                                <td>{patient.mobileNumber}</td>
                                <td>{patient.age}</td>
                                <td>{patient.address}</td>
                                <td>{patient.problem}</td>
                                <td>{patient.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default Home;