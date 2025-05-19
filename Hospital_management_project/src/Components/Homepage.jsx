import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Hospital_header from "../Components/Header";

function Homepage() {
  const navigate = useNavigate();
  const patients = JSON.parse(localStorage.getItem("Patients")) || [];

  const handleDelete = (id) => {
    const filtered = patients.filter(p => p.id !== id);
    localStorage.setItem("Patients", JSON.stringify(filtered));
    window.location.reload();
  };

  return (
    <div className="container mt-4">
        <Hospital_header />
      <h2 className="mb-4 mt-4 text-center">Patient List</h2>
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
          {patients.map((patient, index) => (
            <tr key={patient.id}>
              <td>{index + 1}</td>
              <td>{patient.patientName}</td>
              <td>{patient.mobileNumber}</td>
              <td>{patient.age}</td>
              <td>{patient.address}</td>
              <td>{patient.gender}</td>
              <td>{patient.problem}</td>
              <td>
                <Button variant="warning" onClick={() => navigate(`/edit/${patient.id}`)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(patient.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Homepage;