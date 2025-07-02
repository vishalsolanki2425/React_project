import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync, removeCartItemAsync, incrementQuantity, decrementQuantity, placeOrderAsync } from "../../../Services/Actions/Productactions";
import { Container, Row, Col, Button, Badge, Modal } from "react-bootstrap";
import { FiShoppingBag, FiTrash2, FiHeart, FiChevronDown } from "react-icons/fi";
import cartempty from "../../../assets/images/Cartempty.png";
import PaymentMethods from "../../../assets/images/payment-method.svg"
import Delivery from "../../../assets/images/Delivery.png"
import { Link, useNavigate } from "react-router-dom";
import done from "../../../assets/images/done.png"
import "./Cart_product.css";
import { toast, ToastContainer } from "react-toastify";

function Cart_page() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.Product_Reducer);

    const [showOrderSuccess, setShowOrderSuccess] = useState(false);

    useEffect(() => {
        dispatch(getCartItemsAsync());
    }, [dispatch]);

    const handleRemove = (id) => {
        if (window.confirm("Are you sure you want to remove this item?")) {
            dispatch(removeCartItemAsync(id));
            toast.success("product removed from cart");
        }
    };

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        const item = cartItems.find(cartItem => cartItem.id === id);
        if (item && (item.quantity || 1) > 1) {
            dispatch(decrementQuantity(id));
        }
    };

    const handlePlaceOrder = () => {
        if (cartItems.length > 0) {
            dispatch(placeOrderAsync())
                .then(() => {
                    setShowOrderSuccess(true);
                    toast.success("Order placed successfully!");
                })
                .catch((err) => {
                    toast.error("Failed to place order. Try again.");
                });
        }
    };

    const handleCloseOrderSuccess = () => {
        setShowOrderSuccess(false);
        // navigate('/');
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0);
    const totalItemsInCart = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
    const fixedDiscount = 0.20;
    const discount = totalPrice * fixedDiscount;
    const platformFee = 0;
    const totalAmount = totalPrice - discount + platformFee;

    return (
        <Container fluid className="cart-container">
            <div className="cart_product text-center p-4">
                <h3 className="fw-bold m-0 align-items-center d-flex justify-content-center">
                    <span><FiShoppingBag className="me-2" /></span>
                    My Cart
                </h3>
            </div>
            <ToastContainer />

            <Row className={cartItems.length === 0 ? "justify-content-center align-items-center" : ""}>
                <Col lg={8} className="pe-lg-3">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart text-center py-5">
                            <img
                                src={cartempty}
                                alt="Empty cart"
                                className="img-fluid mb-4"
                                style={{ maxWidth: '200px' }}
                            />
                            <h4 className="mb-3">Your cart is empty!</h4>
                            <p className="text-muted mb-4">Looks like you haven't added anything to your cart yet</p>
                            <Button variant="warning" className="px-4 fw-bold">
                                <Link to={"/"} className="text-decoration-none" style={{ color: '#2a55e5' }}>Shop Now</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map((item, index) => (
                                <div className="cart-item card mb-3 border-0 shadow-sm" key={index}>
                                    <div className="card-body">
                                        <Row className="align-items-center">
                                            <Col xs={3} md={2}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="img-fluid rounded-3"
                                                    style={{ maxHeight: '500px', objectFit: 'contain' }}
                                                />
                                            </Col>
                                            <Col xs={9} md={10}>
                                                <div className="d-flex flex-column flex-md-row justify-content-between">
                                                    <div className="product-info">
                                                        <h5 className="mb-1">{item.name}</h5>
                                                        <p className="text-muted small mb-2">{item.description}</p>
                                                        <p className="text-muted small mb-2">{item.category}</p>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <span className="fw-bold text-success">₹{(Number(item.price)).toLocaleString()}</span>
                                                            <span className="text-muted text-decoration-line-through ms-2 small">₹{(Number(item.price) / (1 - fixedDiscount)).toFixed(0).toLocaleString()}</span>
                                                            <Badge bg="success" className="ms-2 small">20% OFF</Badge>
                                                        </div>
                                                    </div>
                                                    <div className="product-actions">
                                                        <div className="btn_incr_desc d-flex align-items-center mb-2">
                                                            <Button
                                                                variant="outline-warning"
                                                                size="sm"
                                                                className="btn_desc px-3 py-1"
                                                                onClick={() => handleDecrement(item.id)}
                                                            >
                                                                -
                                                            </Button>
                                                            <span className="px-3">{item.quantity || 1}</span>
                                                            <Button
                                                                variant="outline-warning"
                                                                size="sm"
                                                                className="btn_incr px-3 py-1"
                                                                onClick={() => handleIncrement(item.id)}
                                                            >
                                                                +
                                                            </Button>
                                                        </div>
                                                        <div className="d-flex">
                                                            <Button
                                                                variant="outline-success"
                                                                size="sm"
                                                                className="me-2 d-flex align-items-center"
                                                            >
                                                                <FiHeart className="me-1" /> Save
                                                            </Button>
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => handleRemove(item.id)}
                                                                className="d-flex align-items-center"
                                                            >
                                                                <FiTrash2 className="me-1" /> Remove
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Col>

                {cartItems.length > 0 && (
                    <Col lg={4} className="ps-lg-0 mt-4 mt-lg-0">
                        <div className="price-details card border-0 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title fw-bold mb-4">PRICE DETAILS</h5>

                                <div className="price-breakdown mb-3">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Price ({totalItemsInCart} {totalItemsInCart === 1 ? 'item' : 'items'})</span>
                                        <span>₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Discount</span>
                                        <span className="text-success">- ₹{discount.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Delivery Charges</span>
                                        <span className="text-success">FREE</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Platform Fee</span>
                                        <span>₹{platformFee}</span>
                                    </div>
                                </div>

                                <hr />

                                <div className="total-amount d-flex justify-content-between fw-bold fs-5 mb-3">
                                    <span>Total Amount</span>
                                    <span>₹{totalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                </div>

                                <p className="text-success small mb-4">
                                    You will save ₹{discount.toLocaleString(undefined, { maximumFractionDigits: 0 })} on this order
                                </p>

                                <Button
                                    variant="warning"
                                    className="w-100 py-2 fw-bold"
                                    disabled={cartItems.length === 0}
                                    onClick={handlePlaceOrder}
                                    style={{ color: '#2a55e5' }}
                                >
                                    PLACE ORDER
                                </Button>

                                <div className="mt-3">
                                    <div className="d-flex justify-content-between align-items-center text-muted small">
                                        <span>Safe and Secure Payments</span>
                                        <FiChevronDown />
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <img
                                            src={PaymentMethods}
                                            alt="Payment methods"
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="delivery-info card border-0 shadow-sm mt-3">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-2">
                                    <img
                                        src={Delivery}
                                        alt="Delivery"
                                        width="24"
                                        className="me-2"
                                    />
                                    <span className="fw-bold">Safe and Secure Delivery</span>
                                </div>
                                <p className="small text-muted mb-0">
                                    Your items will be delivered with contactless delivery
                                </p>
                            </div>
                        </div>
                    </Col>
                )}
            </Row>

            <Modal show={showOrderSuccess} onHide={handleCloseOrderSuccess} centered>
                <Modal.Body className="text-center">
                    <img src={done} alt="Success" className="img-fluid mb-3" style={{ maxWidth: '100px' }} />
                    <h4 className="text-success fw-bold">Your Order Successful!</h4>
                    <p>Your order has been placed successfully and will be delivered soon.</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="warning" onClick={handleCloseOrderSuccess} className="px-4 fw-bold">
                        <Link className="text-decoration-none" style={{ color: '#2a55e5' }} to={"/order"}>Done</Link>
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Cart_page;