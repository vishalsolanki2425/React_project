import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "../../src/Components/Employe.css"


const Employe = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h2 className='fs-5'>Employee Management System</h2>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>First name : </Form.Label>
                    <Form.Control type="text" placeholder="First name" required />
                    {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Last name : </Form.Label>
                    <Form.Control type="text" placeholder="Last name" required />
                    {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Email : </Form.Label>
                        <Form.Control type="Email" placeholder="Email" required />
                        {/* <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback> */}
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Address : </Form.Label>
                    <Form.Control type="text" placeholder="Address" required />
                    {/* <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback> */}
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Phone : </Form.Label>
                    <Form.Control type="number" placeholder="Phone" required />
                    {/* <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback> */}
                </Form.Group>
            </Row>
            <Button type="submit">Submit form</Button>
        </Form>
    )
}

export default Employe;