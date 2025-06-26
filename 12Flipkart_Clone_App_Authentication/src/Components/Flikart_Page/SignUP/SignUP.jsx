import { useEffect, useState } from "react";
import { Button, Form, Container, Card, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpAsync, resetAuthState } from "../../../Services/Actions/authAction";

const SignUP = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isCreated, errorMSG } = useSelector(state => state.authReducer);

    const [inputForm, setInputForm] = useState({
        email: "",
        password: "",
        cpassword: "",
    });

    const [passwordError, setPasswordError] = useState("");

    const handleChanged = (e) => {
        const { name, value } = e.target;
        setInputForm({ ...inputForm, [name]: value });
        if ((name === "password" || name === "cpassword") && passwordError) {
            setPasswordError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputForm.password !== inputForm.cpassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        dispatch(signUpAsync(inputForm));
    };

    useEffect(() => {
        if (isCreated) navigate("/signin");
        return () => dispatch(resetAuthState());
    }, [isCreated]);

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "500px" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Create Account</h2>

                    {errorMSG && <Alert variant="danger">{errorMSG}</Alert>}
                    {passwordError && <Alert variant="danger">{passwordError}</Alert>}

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
                                minLength={6}
                            />
                            <Form.Text className="text-muted">
                                Password must be at least 6 characters
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                name="cpassword"
                                value={inputForm.cpassword}
                                onChange={handleChanged}
                                required
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 mb-3"
                            size="lg"
                        >
                            Sign Up
                        </Button>
                    </Form>

                    <div className="text-center mt-3">
                        <p className="mb-0">
                            Already have an account? <Link to="/signin">Sign In</Link>
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SignUP;