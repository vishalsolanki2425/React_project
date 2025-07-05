import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { TiShoppingCart } from "react-icons/ti";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { BsShieldFillCheck, BsArrowLeft } from "react-icons/bs";
import { getProductsAsync, addToCartAsync } from "../../../Services/Actions/Productactions";
import { ToastContainer, toast } from "react-toastify";
import "./View_product.css";


const View_product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products } = useSelector((state) => state.Product_Reducer);
    const { user } = useSelector((state) => state.authReducer);
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        if (products.length === 0) {
            dispatch(getProductsAsync());
        } else {
            const found = products.find((p) => String(p.id) === String(id));
            setProduct(found);
            if (found) setMainImage(found.image);
        }
    }, [products, id, dispatch]);

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please log in to add item to cart");
            navigate("/signin");
            return;
        }
        dispatch(addToCartAsync(product));
        toast.success("Product added to cart");
    };

    const renderRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-warning" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-warning" />);
            }
        }
        return stars;
    };

    if (!product) {
        return (
            <Container className="py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h4 className="mt-3">Loading product details...</h4>
            </Container>
        );
    }

    return (
        <>
            <ToastContainer />
            <Container className="py-3 flipkart-product-view">
                <Button
                    variant="light"
                    onClick={() => navigate(-1)}
                    className="mb-3 d-flex align-items-center"
                >
                    <BsArrowLeft className="me-2" /> Back
                </Button>

                <Row className="bg-white p-3 rounded shadow-sm">
                    <Col md={4} className="text-center border-end p-4">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="img-fluid"
                            style={{ maxHeight: "400px", objectFit: "contain" }}
                        />
                    </Col>

                    <Col md={8} className="ps-4">
                        <h2 className="product-title">{product.name}</h2>

                        <div className="d-flex align-items-center mb-2">
                            <span className="text-success small fw-bold me-2">
                                Ratings {product.rating || "N/A"}
                            </span>
                        </div>

                        <div className="border-top border-bottom py-3 my-3">
                            <h3 className="text-danger">₹{product.price}</h3>
                            <p className="text-success small mb-1">
                                <BsShieldFillCheck className="me-1" />
                                <strong>7 Days</strong> Replacement Policy
                            </p>
                            <p className="text-success small">
                                <BsShieldFillCheck className="me-1" />
                                <strong>1 Year</strong> Warranty
                            </p>
                        </div>

                        <div className="mb-4">
                            <h5 className="mb-3">Available offers</h5>
                            <ul className="small text-muted">
                                <li className="mb-2">
                                    <Badge bg="success" className="me-2">Offer</Badge>
                                    <strong>Bank Offer</strong> 5% Cashback on Flipkart Axis Bank Card
                                </li>
                                <li className="mb-2">
                                    <Badge bg="success" className="me-2">Offer</Badge>
                                    <strong>Special Price</strong> Get extra 10% off (price inclusive of discount)
                                </li>
                                <li className="mb-2">
                                    <Badge bg="success" className="me-2">Offer</Badge>
                                    <strong>Partner Offer</strong> Sign up for Pay Later and get Gift Card worth ₹100
                                </li>
                            </ul>
                        </div>

                        <div className="d-flex gap-3">
                            <Button
                                variant="warning"
                                className="text-white fw-bold px-4 py-2"
                                onClick={handleAddToCart}
                            >
                                <TiShoppingCart className="me-2 fs-5" />
                                ADD TO CART
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-4 bg-white p-3 rounded shadow-sm">
                    <Col>
                        <h5>Product Description</h5>
                        <p className="text-muted">{product.description}</p>

                        <h5 className="mt-4">Specifications</h5>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td className="text-muted" style={{ width: "30%" }}>General</td>
                                    <td>
                                        <div className="row">
                                            <div className="col-md-4 text-muted">Brand</div>
                                            <div className="col-md-8">{product.brand || "Generic"}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 text-muted">Model</div>
                                            <div className="col-md-8">{product.model || "Standard"}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-muted">Dimensions</td>
                                    <td>
                                        <div className="row">
                                            <div className="col-md-4 text-muted">Weight</div>
                                            <div className="col-md-8">{product.weight || "500g"}</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default View_product;