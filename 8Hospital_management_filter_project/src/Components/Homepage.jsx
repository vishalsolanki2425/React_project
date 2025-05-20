import { useNavigate } from "react-router-dom";
import { Button, Table, Modal, Form } from "react-bootstrap";
import Hospital_header from "../Components/Header";
import { useState } from "react";

function Homepage() {
    const navigate = useNavigate();
    const allPatients = JSON.parse(localStorage.getItem("Patients")) || [];

    const [showModal, setShowModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patients, setPatients] = useState(allPatients);
    const [search, setSearch] = useState("");

    const handleDelete = (id) => {
        const filtered = patients.filter(p => p.id !== id);
        setPatients(filtered);
        localStorage.setItem("Patients", JSON.stringify(filtered));
    };

    const handleView = (patient) => {
        setSelectedPatient(patient);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedPatient(null);
    };

    const handleSearch = () => {
        const filtered = allPatients.filter((patient) =>
            patient.patientName.toLowerCase().includes(search.toLowerCase()) ||
            patient.mobileNumber.toLowerCase().includes(search.toLowerCase()) ||
            patient.doctor.toLowerCase().includes(search.toLowerCase())
        );
        setPatients(filtered);
        setSearch("");
    };

    const handleClear = () => {
        setPatients(allPatients);
    };

    return (
        <div className="container mt-4">
            <Hospital_header />
            <h2 className="mb-4 mt-4 text-center">Patient List</h2>

            <div className="mb-3 d-flex gap-2">
                <Form.Control
                    type="text"
                    placeholder="Search by name, mobile, or doctor"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Search</Button>
                <Button variant="secondary" onClick={handleClear}>Clear</Button>
            </div>

            <Table bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Patient Name</th>
                        <th>Mobile</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Doctor</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.length > 0 ? (
                        patients.map((patient, index) => (
                            <tr key={patient.id}>
                                <td>{index + 1}</td>
                                <td>{patient.patientName}</td>
                                <td>{patient.mobileNumber}</td>
                                <td>{patient.age}</td>
                                <td>{patient.address}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.doctor}</td>
                                <td>
                                    <Button variant="primary" className="me-2" onClick={() => handleView(patient)}>View</Button>
                                    <Button variant="warning" className="me-2" onClick={() => navigate(`/edit/${patient.id}`)}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDelete(patient.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="8" className="text-center">No patients found</td></tr>
                    )}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Patient Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPatient && (
                        <div>
                            <p><strong>Name:</strong> {selectedPatient.patientName}</p>
                            <p><strong>Mobile:</strong> {selectedPatient.mobileNumber}</p>
                            <p><strong>Age:</strong> {selectedPatient.age}</p>
                            <p><strong>Address:</strong> {selectedPatient.address}</p>
                            <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                            <p><strong>Doctor:</strong> {selectedPatient.doctor}</p>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Homepage;