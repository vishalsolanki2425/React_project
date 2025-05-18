import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Hospital_management.css';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Hospital_management() {
    const navigate = useNavigate();

    const initialState = {
        patientName: "",
        mobileNumber: "",
        age: "",
        address: "",
        problem: "",
        gender: ""
    };

    const [input, setInput] = useState(initialState);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const savedPatients = localStorage.getItem("hospitalPatients");
        if (savedPatients) {
            setPatients(JSON.parse(savedPatients));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPatients = [...patients, input];
        setPatients(newPatients);
        localStorage.setItem("hospitalPatients", JSON.stringify(newPatients));
        alert("Patient Registered Successfully");
        setInput(initialState);
        navigate('/');
    };

    return (
        <div className='container mt-4'>
            <h2>Hospital Management Form</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="row mb-3" controlId="formPatientName">
                    <Form.Label className="col-sm-2 col-form-label">Patient Name</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control type="text" name="patientName" value={input.patientName} onChange={handleChange} />
                    </div>
                </Form.Group>

                <Form.Group className="row mb-3" controlId="formMobile">
                    <Form.Label className="col-sm-2 col-form-label">Mobile Number</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control type="number" name="mobileNumber" value={input.mobileNumber} onChange={handleChange} />
                    </div>
                </Form.Group>

                <Form.Group className="row mb-3" controlId="formAge">
                    <Form.Label className="col-sm-2 col-form-label">Age</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control type="number" name="age" value={input.age} onChange={handleChange} />
                    </div>
                </Form.Group>

                <Form.Group className="row mb-3" controlId="formAddress">
                    <Form.Label className="col-sm-2 col-form-label">Address</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control type="text" name="address" value={input.address} onChange={handleChange} />
                    </div>
                </Form.Group>

                <Form.Group className="row mb-3" controlId="formProblem">
                    <Form.Label className="col-sm-2 col-form-label">Problem</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control type="text" name="problem" value={input.problem} onChange={handleChange} />
                    </div>
                </Form.Group>

                <Form.Group className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">Gender</Form.Label>
                    <div className="col-sm-10 d-flex align-items-center">
                        <Form.Check inline label="Male" name="gender" type="radio" value="Male" checked={input.gender === "Male"} onChange={handleChange} />
                        <Form.Check inline label="Female" name="gender" type="radio" value="Female" checked={input.gender === "Female"} onChange={handleChange} />
                        <Form.Check inline label="Other" name="gender" type="radio" value="Other" checked={input.gender === "Other"} onChange={handleChange} />
                    </div>
                </Form.Group>

                <div className="text-center">
                    <Button type="submit" style={{ color: 'black', border: '1px solid black', backgroundColor: 'transparent' }}> Submit</Button>
                </div>
            </Form>
        </div>
    );
}

export default Hospital_management;