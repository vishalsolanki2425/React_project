import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router';
import './Header.css'
import Table from 'react-bootstrap/Table';


function Hospital_header() {
    return (
        <>
            <h1 className='text-center mb-5'>Hospital Management</h1>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container className='gap-5'>
                    <a href="/" style={{ textDecoration: 'none', color: 'black' }}>Hospital</a>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-between w-100">
                            <Link href="#link" to={'/'} style={{ textDecoration: 'none', color: 'black' }}>Patient</Link>
                            <Link href="#link" to={'Hospital_management'} style={{ textDecoration: 'none', color: 'black' }}>New Patient</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="container mt-4">
                <h2 className='text-center mb-5'>Patient List</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Mobile Number</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Problem</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </Table>
            </div>
        </>
    )
}

export default Hospital_header;