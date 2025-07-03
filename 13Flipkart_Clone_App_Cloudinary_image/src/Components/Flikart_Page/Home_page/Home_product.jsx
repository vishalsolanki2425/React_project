import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteProductAsync, getProductsAsync, addToCartAsync } from "../../../Services/Actions/Productactions";
import { useNavigate } from "react-router-dom";
import { Card, Col, Container, Form, Row, Modal, Button, Spinner } from "react-bootstrap";
import Slider from "./Banner/slider";
import Banner from "./Banner/Banner";
import "./Home_product.css";
import { toast, ToastContainer } from "react-toastify";

function Home_product({ searchTerm }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, loading } = useSelector((state) => state.Product_Reducer);
    const { user } = useSelector((state) => state.authReducer);

    const [categoryFilter, setCategoryFilter] = useState("All");
    const [priceFilter, setPriceFilter] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(getProductsAsync());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (!user) {
            navigate("/signin");
            return;
        }

        if (window.confirm("Are you sure to delete this product?")) {
            dispatch(deleteProductAsync(id));
            toast.success("Product deleted successfully");
        }
    };

    const handleEdit = (id) => {
        if (user) {
            navigate(`/edit/${id}`);
        } else {
            navigate("/signin");
        }
    };

    const handleAddToCart = (item) => {
        if (user) {
            dispatch(addToCartAsync(item));
            toast.success("Product added to cart");
        } else {
            navigate("/signin");
        }
    };

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const categories = ["All", ...new Set(products.map((p) => p.category))];

    const filteredProducts = products
        .filter((item) => {
            if (searchTerm) {
                return (
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.category.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            return true;
        })
        .filter((item) => {
            if (categoryFilter !== "All") {
                return item.category === categoryFilter;
            }
            return true;
        })
        .filter((item) => {
            if (priceFilter === "0-1000") return item.price <= 1000;
            if (priceFilter === "1001-5000") return item.price > 1000 && item.price <= 5000;
            if (priceFilter === "5001+") return item.price > 5000;
            return true;
        });

    return (
        <>
            <ToastContainer />
            <Banner />
            <Slider />
            <Container className="custom-container mt-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap m-3">
                    <div className="best">
                        <h4 className="p-2">Best of Electronics</h4>
                    </div>
                    <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                        <div className="categoryFilter">
                            <Form.Select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                size="md"
                            >
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className="priceFilter">
                            <Form.Select
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                                size="md"
                            >
                                <option value="">All Prices</option>
                                <option value="0-1000">Below ₹1000</option>
                                <option value="1001-5000">₹1001 - ₹5000</option>
                                <option value="5001+">Above ₹5000</option>
                            </Form.Select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center my-5">
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="mt-2">Loading products...</p>
                    </div>
                ) : (
                    <Row className="ms-2 me-2">
                        {filteredProducts.length === 0 ? (
                            <h5 className="text-center">No Products Match Your Filter</h5>
                        ) : (
                            filteredProducts.map((item) => (
                                <Col xs={12} sm={6} md={4} lg={2} key={item.id} className="mb-4">
                                    <Card className="product_card h-100">
                                        <div className="card_image text-center">
                                            <Card.Img
                                                variant="top"
                                                src={item.image}
                                                className="card_img"
                                            />
                                        </div>
                                        <Card.Body className="text-start">
                                            <Card.Text className="fw-semibold m-0">
                                                {item.name.length > 40
                                                    ? item.name.slice(0, 40) + "..."
                                                    : item.name}
                                            </Card.Text>
                                            <Card.Text className="text-muted m-0">
                                                {item.description.length > 50
                                                    ? item.description.slice(0, 50) + "..."
                                                    : item.description}
                                            </Card.Text>
                                            <Card.Text className="text-success fw-bold">
                                                ₹{item.price}
                                            </Card.Text>
                                            <div className="fs-5 d-flex justify-content-center gap-3 card-icons mt-2">
                                                <button className="btn_icon4" onClick={() => handleViewProduct(item)}>
                                                    <AiOutlineEye />
                                                </button>
                                                {user && (
                                                    <>
                                                        <button className="btn_icon2" onClick={() => handleEdit(item.id)}>
                                                            <BiEdit />
                                                        </button>
                                                        <button className="btn_icon3" onClick={() => handleDelete(item.id)}>
                                                            <MdOutlineDeleteOutline />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>
                )}
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProduct?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row align-items-center p-5">
                            <div className="col-md-5 text-center mb-3 mb-md-0">
                                <img
                                    src={selectedProduct?.image}
                                    alt={selectedProduct?.name}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: "300px", objectFit: "cover" }}
                                />
                            </div>
                            <div className="col-md-7">
                                <p><strong>Name:</strong> {selectedProduct?.name}</p>
                                <p><strong>Price:</strong> ₹{selectedProduct?.price}</p>
                                <p><strong>Category:</strong> {selectedProduct?.category}</p>
                                <p><strong>Description:</strong> {selectedProduct?.description}</p>
                                <p>
                                    <strong>Rating:</strong>{" "}
                                    <span style={{ color: "green", fontWeight: "bold" }}>
                                        {selectedProduct?.rating || "N/A"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button
                        variant="success"
                        onClick={() => {
                            handleAddToCart(selectedProduct);
                            handleCloseModal();
                        }}
                    >
                        <TiShoppingCart className="me-2" />
                        Add to Cart
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Home_product;