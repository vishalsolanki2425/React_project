import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { getOrdersAsync } from '../../../../Services/Actions/Productactions';
import { FiShoppingBag } from 'react-icons/fi';
import './My_order.css'

function My_Orders() {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.Product_Reducer);
    const [localOrders, setLocalOrders] = useState([]);

    useEffect(() => {
        dispatch(getOrdersAsync());
    }, [dispatch]);

    useEffect(() => {
        if (orders && orders.length > 0) {
            setLocalOrders(orders);
        }
    }, [orders]);

    if (loading && localOrders.length === 0) {
        return (
            <Container className="my-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-2">Loading your orders...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger">
                    <Alert.Heading>Error loading orders</Alert.Heading>
                    <p>{error.message || 'Failed to load your orders. Please try again later.'}</p>
                    <Button variant="primary" onClick={() => dispatch(getOrdersAsync())}>
                        Retry
                    </Button>
                </Alert>
            </Container>
        );
    }

    const displayOrders = localOrders.length > 0 ? localOrders : orders;

    return (
        <Container className="my-5">
            <div className="order_product text-center p-4">
                <h2 className="fw-bold m-0 align-items-center d-flex justify-content-center">
                    <span><FiShoppingBag className="me-2" /></span>
                    My Orders
                </h2>
            </div>

            {displayOrders.length === 0 ? (
                <div className="text-center py-5">
                    <h4>No orders found</h4>
                    <Button variant="primary" href="/">
                        Continue Shopping
                    </Button>
                </div>
            ) : (
                <Row>
                    {displayOrders.map((order, index) => (
                        <Col md={12} key={order.id || index} className="mb-3">
                            <Card className="border-0 shadow-sm">
                                <Card.Body className="p-3">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={order.items[0]?.image}
                                            alt={order.items[0]?.name}
                                            className="me-5"
                                            style={{
                                                height: '100px',
                                                objectFit: 'cover',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1">{order.items[0]?.name || 'Product Name'}</h6>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <span className="text-muted">Qty: {order.items[0]?.quantity || 1}</span>
                                                    <span className="mx-2">|</span>
                                                    <span className="text-dark fw-bold">
                                                        ₹{(order.items[0]?.price * order.items[0]?.quantity)?.toLocaleString() || '0'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        disabled={order.status === 'cancelled'}
                                                    >
                                                        {order.status === 'cancelled' ? 'Cancelled' : 'Cancel'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default My_Orders;