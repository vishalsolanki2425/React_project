import { Container, Dropdown, Form, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { BsCart3 } from "react-icons/bs";
import { HiPlusSm } from "react-icons/hi";
import { PiCodesandboxLogoDuotone, PiCreditCardLight, PiDotsThreeVertical, PiGiftLight, PiHeartLight, PiStorefrontLight } from "react-icons/pi";
import { MdAddShoppingCart } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import logo from "../../../assets/images/logo.svg";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductsAsync } from '../../../Services/Actions/Productactions';
import { signOutAsync } from "../../../Services/Actions/authAction";
import "./Header.css";
import { toast } from 'react-toastify';

function Header({ onSearch, currentSearchTerm }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartCount = useSelector((state) => state.Product_Reducer?.cartItems?.length || 0);
    const { user } = useSelector((state) => state.authReducer);

    useEffect(() => {
        dispatch(getProductsAsync());
    }, [dispatch]);

    const handleSearchChange = (e) => {
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    const handleLogout = () => {
        dispatch(signOutAsync());
        navigate("/");
        toast.success("Logout Successfully");
    };

    return (
        <Navbar expand="lg" className="main-header">
            <Container className="custom-container">
                <div className="logo-search-container d-flex justify-content-between align-items-center ms-5">
                    <Navbar.Brand as={Link} to="/" className="logo">
                        <img src={logo} alt="Logo" />
                    </Navbar.Brand>

                    <div className="search-box d-none d-lg-flex">
                        <FaSearch className="search-icon" />
                        <Form.Control
                            type="search"
                            placeholder="Search for Products, Brands and More"
                            value={currentSearchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </div>

                    <div className="header-search-toggle d-flex d-lg-none align-items-center">
                        <div className="header-search-box">
                            <FaSearch className="header-search-icon" />
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                value={currentSearchTerm}
                                onChange={handleSearchChange}
                                className="header-search-input"
                            />
                        </div>

                        <Navbar.Toggle aria-controls="header-nav" className="header-menu-btn">
                            <PiDotsThreeVertical />
                        </Navbar.Toggle>
                    </div>
                </div>

                <Navbar.Collapse id="header-nav" className="header-nav d-lg-none justify-content-center m-0 align-items-center">
                    <Nav className="header-nav-items d-flex gap-5 justify-content-between me-5 ms-5">

                        {user ? (
                            <Dropdown as={Nav.Item} className="header-login">
                                <Dropdown.Toggle as={Nav.Link}>
                                    <VscAccount className="me-2" style={{ fontSize: "24px" }} />
                                    {user.email}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/signup" className='gap-5 d-flex align-items-center'>
                                        <span>New Customer ?</span> <Link to="/signup" className='text-decoration-none'>Sign Up</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as={Link} to="#">
                                        <VscAccount className="me-2" /> My Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/order">
                                        <PiCodesandboxLogoDuotone className="me-2" /> My Orders
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/orders">
                                        <HiPlusSm className="me-2" /> Flipkart Plus Zone
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="#">
                                        <PiHeartLight className="me-2" /> Wishlist
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="#">
                                        <PiGiftLight className="me-2" /> Rewards
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="#">
                                        <PiCreditCardLight className="me-2" /> Gift Cards
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout}>
                                        <VscAccount className="me-2" /> Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Nav.Item className="header-login">
                                <Nav.Link as={Link} to="/signin">
                                    <VscAccount className="me-2" style={{ fontSize: "24px" }} />
                                    Login
                                </Nav.Link>
                            </Nav.Item>
                        )}

                        <Nav.Link
                            onClick={() => {
                                if (user) {
                                    navigate("/cart");
                                } else {
                                    toast.error("Please Login!");
                                    setTimeout(() => {
                                        navigate("/signin");
                                    }, 1000); 
                                }
                            }}
                            className="position-relative d-flex align-items-center"
                            style={{ cursor: "pointer" }}
                        >
                            <div className="position-relative">
                                <BsCart3 className="me-2" style={{ fontSize: "24px" }} />
                                {cartCount > 0 && (
                                    <span className="cart-badge">{cartCount}</span>
                                )}
                            </div>
                            Cart
                        </Nav.Link>

                        <Nav.Link as={Link} to="/" className="d-flex align-items-center">
                            <PiStorefrontLight className="me-2" style={{ fontSize: "24px" }} />
                            Become a Seller
                        </Nav.Link>

                        {user && user.role == "admin" ?(
                            <Nav.Link as={Link} to="/add" className="d-flex align-items-center">
                                <MdAddShoppingCart className="me-2" style={{ fontSize: "24px" }} />
                                Add Product
                            </Nav.Link>
                        ): ""}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;