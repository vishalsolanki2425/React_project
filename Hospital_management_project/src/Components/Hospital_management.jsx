import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Hospital_management.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router';
import { useEffect, useState } from "react";

function Hospital_management() {

    const intialState = {
        patientName: "",
        mobileNumber: "",
        age: "",
        gender: ""
    }

    const [input, setInputform] = useState(intialState);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const { name, value } = e.target;
    //     setInputform({ ...input, [name]: value });
    //     // console.log(patientName, mobileNumber, age, gender);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { patientName, mobileNumber, age, gender } = input;
        console.log(patientName, mobileNumber, age, gender);
        }


        return (
            <>
                <Form onSubmit={handleSubmit} className='container mt-4'>

                    <Form.Group className="row mb-3" controlId="formBasicPname">
                        <Form.Label className="col-sm-2 col-form-label">Patient Name :</Form.Label>
                        <div className="col-sm-10">
                            <Form.Control type="text" placeholder="Enter Your name"
                                // value={patientName} 
                                onChange={(e) => setPatientName(e.target.value)} />
                        </div>
                    </Form.Group>

                    <Form.Group className="row mb-3" controlId="formBasicEmail">
                        <Form.Label className="col-sm-2 col-form-label">Mobile Number :</Form.Label>
                        <div className="col-sm-10">
                            <Form.Control type="number" placeholder="Enter Your Mobile Number"
                                // value={mobileNumber} 
                                onChange={(e) => setMobileNumber(e.target.value)} />
                        </div>
                    </Form.Group>

                    <Form.Group className="row mb-3" controlId="formBasicAge">
                        <Form.Label className="col-sm-2 col-form-label">Age :</Form.Label>
                        <div className="col-sm-10">
                            <Form.Control type="number" placeholder="Enter Your Age"
                                // value={age}
                                onChange={(e) => setAge(e.target.value)} />
                        </div>
                    </Form.Group>

                    <Form.Group className="row mb-3" controlId="formBasicAddress">
                        <Form.Label className="col-sm-2 col-form-label">Address :</Form.Label>
                        <div className="col-sm-10">
                            <Form.Control type="text" placeholder="Enter Your Address"
                                // value={age}
                                onChange={(e) => setAge(e.target.value)} />
                        </div>
                    </Form.Group>

                    <Form.Group className="row mb-3" controlId="formBasicAge">
                    <Form.Label className="col-sm-2 col-form-label">Problem :</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control type="text" placeholder="Enter Your Problem"
                        // value={age} 
                        onChange={(e) => setAge(e.target.value)} />
                    </div>
                </Form.Group>

                    <Form.Group className="row mb-3">
                        <Form.Label className="col-sm-2 col-form-label">Gender:</Form.Label>
                        <div className="col-sm-10 d-flex align-items-center">
                            <Form.Check inline label="Male" name="gender" type="radio" value="Male"
                                // checked={gender === "Male"} 
                                onChange={(e) => setGender(e.target.value)} />
                            <Form.Check inline label="Female" name="gender" type="radio" value="Female"
                                // checked={gender === "Female"} 
                                onChange={(e) => setGender(e.target.value)} />
                            <Form.Check inline label="Other" name="gender" type="radio" value="Other"
                                // checked={gender === "Other"} 
                                onChange={(e) => setGender(e.target.value)} />
                        </div>
                    </Form.Group>

                    <div>
                        <Button variant="" type="submit"><Link to={'/'} className='btn-link text-decoration-none text-dark' >Submit</Link></Button>
                    </div>
                </Form>
            </>
        );
    }

    export default Hospital_management;
