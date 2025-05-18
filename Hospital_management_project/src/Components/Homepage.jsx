import Table from 'react-bootstrap/Table';


function Homepage() {
    return (
        <>
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

export default Homepage;