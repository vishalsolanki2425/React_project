import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Container, Card, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { googleSignInAsync, signINAsync, resetAuthState } from "../../../Services/Actions/authAction";
import { FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const SignIN = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, errorMSG } = useSelector(state => state.authReducer);

    const [inputForm, setInputForm] = useState({ email: "", password: "" });

    const handleChanged = (e) => {
        const { name, value } = e.target;
        setInputForm({ ...inputForm, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signINAsync(inputForm));
    };

    const handleGoogleLoginIN = () => {
        dispatch(googleSignInAsync());
    };

    useEffect(() => {
        if (user) {
            toast.success("Sign In successfully!");
            setTimeout(() => {
                navigate("/");
            }, 2500);
        }
        return () =>
            dispatch(resetAuthState()
            );
    }, [user]);

    return (
        <>
            <ToastContainer />
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "500px" }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign In</h2>
                        {errorMSG && <Alert variant="danger">{errorMSG}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={inputForm.email}
                                    onChange={handleChanged}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    value={inputForm.password}
                                    onChange={handleChanged}
                                    required
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 mb-3"
                            >
                                Sign In
                            </Button>
                        </Form>

                        <div className="text-center mb-3">
                            <small>Or continue with</small>
                        </div>

                        <Button
                            onClick={handleGoogleLoginIN}
                            variant="outline-danger"
                            className="w-100 mb-3 d-flex align-items-center justify-content-center"
                        >
                            <FaGoogle className="me-2" /> Sign in with Google
                        </Button>

                        <div className="text-center mt-3">
                            <p className="mb-0">Don't have an account? <Link to="/signup">Sign Up</Link></p>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default SignIN;