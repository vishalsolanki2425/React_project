import { Button, Container, Form } from "react-bootstrap";
import generateUniqueId from "generate-unique-id";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../../../Services/Actions/Productactions";
import "./Add_product.css";

const Add_product = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialState = {
        name: "",
        price: "",
        description: "",
        image: "",
        rating: "",
        category: "",
    };

    const [product, setProduct] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
        }
    };

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (!product.name.trim()) {
            newErrors.name = "Product Name is required.";
            isValid = false;
        }
        if (!product.description.trim()) {
            newErrors.description = "Description is required.";
            isValid = false;
        }
        if (!product.price || product.price <= 0) {
            newErrors.price = "Price is required and must be greater than 0.";
            isValid = false;
        }
        if (!product.category) {
            newErrors.category = "Please select a category.";
            isValid = false;
        }
        if (!product.rating) {
            newErrors.rating = "Please select a rating.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            let id = generateUniqueId({
                length: 5,
                useNumbers: true,
                useLetters: false,
            });
            product.id = id;
            dispatch(addProductAsync(product));
            setProduct(initialState);
            navigate("/");
        }
    };

    return (
        <>
            <div className="add_product_img text-center">
                <h2><span>Add</span> Product</h2>
            </div>

            <div className="add_product p-5">
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" name="name" value={product.name} onChange={handleChange} placeholder="Enter Product Name..." isInvalid={!!errors.name} />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product Image URL</Form.Label>
                            <Form.Control type="text" name="image" value={product.image} onChange={handleChange} placeholder="Product Image URL..." />
                            <Form.Control.Feedback type="invalid">
                                {errors.image}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" value={product.description} onChange={handleChange} placeholder="Product Description..." rows={3} isInvalid={!!errors.description} />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" name="price" value={product.price} onChange={handleChange} placeholder="Product Price..." isInvalid={!!errors.price} />
                            <Form.Control.Feedback type="invalid">
                                {errors.price}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Category</Form.Label>
                            <Form.Select name="category" value={product.category} onChange={handleChange} isInvalid={!!errors.category} >
                                <option value="">Select Category</option>
                                <option>Electronics</option>
                                <option>Clothing</option>
                                <option>Footwear</option>
                                <option>Books</option>
                                <option>Beauty</option>
                                <option>Home Appliances</option>
                                <option>Accessories</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.category}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Rating</Form.Label>
                            <Form.Select name="rating" value={product.rating} onChange={handleChange} isInvalid={!!errors.rating} >
                                <option value="">Select Rating</option>
                                <option>★</option>
                                <option>★★</option>
                                <option>★★★</option>
                                <option>★★★★</option>
                                <option>★★★★★</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.rating}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="text-center">
                            <Button type="submit" className="custom-submit-btn">
                                Add Product
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </>
    );
};

export default Add_product;