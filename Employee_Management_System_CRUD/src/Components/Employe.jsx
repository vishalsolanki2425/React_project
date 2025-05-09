import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import "../Components/Employe.css";

const Employe = () => {
    const [validated, setValidated] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phone: '',
    });
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedData);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        let updatedEmployees = [...employees];
        if (editIndex !== null) {
            updatedEmployees[editIndex] = formData;
            setEditIndex(null);
        } else {
            updatedEmployees.push(formData);
        }

        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        setEmployees(updatedEmployees);
        setFormData({ firstName: '', lastName: '', email: '', address: '', phone: '' });
        setValidated(false);
    };

    const handleEdit = (index) => {
        setFormData(employees[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedEmployees = employees.filter((_, i) => i !== index);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        setEmployees(updatedEmployees);
    };

    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h2 className='mb-5 text-center justify-content-center'>Employee Management System</h2>
                <Row className="gap-4">
                    <Form.Group as={Col} md="8" controlId="validationCustom01" className="d-flex align-items-center justify-content-center gap-5">
                        <Form.Label className='w-100'>First Name : </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First name"
                            required
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="8" controlId="validationCustom02" className="d-flex align-items-center justify-content-center gap-5">
                        <Form.Label className='w-100'>Last Name : </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last name"
                            required
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="8" controlId="validationCustom03" className="d-flex align-items-center justify-content-center gap-5">
                        <Form.Label className='w-100'>Email : </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="8" controlId="validationCustom04" className="d-flex align-items-center justify-content-center gap-5">
                        <Form.Label className='w-100'>Address : </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Address"
                            required
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="8" controlId="validationCustom05" className="d-flex align-items-center justify-content-center gap-5">
                        <Form.Label className='w-100'>Phone : </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Phone"
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <Button type="submit" className="mt-3">
                    {editIndex !== null ? 'Update' : 'Submit'}
                </Button>
            </Form>

            {employees.length > 0 && (
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First</th>
                            <th>Last</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{emp.firstName}</td>
                                <td>{emp.lastName}</td>
                                <td>{emp.email}</td>
                                <td>{emp.address}</td>
                                <td>{emp.phone}</td>
                                <td>
                                    <Button variant="warning" size="sm" onClick={() => handleEdit(index)} className="me-2">
                                        <FaEdit />
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default Employe;
