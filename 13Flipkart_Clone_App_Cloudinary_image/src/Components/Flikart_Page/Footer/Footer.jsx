import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaAward, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import  paymentMethods from "../../../assets/images/payment-method.svg";
import './Footer.css';

const FlipkartFooter = () => {
    return (
        <footer className="flipkart-footer">
            <div className="footer-top-section py-4">
                <Container>
                    <Row>
                        <Col md={3} className="footer-column">
                            <h5>ABOUT</h5>
                            <ul>
                                <li><a href="/about">Contact Us</a></li>
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/careers">Careers</a></li>
                                <li><a href="/stories">Flipkart Stories</a></li>
                                <li><a href="/press">Press</a></li>
                            </ul>
                        </Col>

                        <Col md={3} className="footer-column">
                            <h5>HELP</h5>
                            <ul>
                                <li><a href="/payments">Payments</a></li>
                                <li><a href="/shipping">Shipping</a></li>
                                <li><a href="/returns">Cancellation & Returns</a></li>
                                <li><a href="/faq">FAQ</a></li>
                                <li><a href="/report">Report Infringement</a></li>
                            </ul>
                        </Col>

                        <Col md={3} className="footer-column">
                            <h5>POLICY</h5>
                            <ul>
                                <li><a href="/return-policy">Return Policy</a></li>
                                <li><a href="/terms">Terms Of Use</a></li>
                                <li><a href="/security">Security</a></li>
                                <li><a href="/privacy">Privacy</a></li>
                                <li><a href="/sitemap">Sitemap</a></li>
                            </ul>
                        </Col>

                        <Col md={3} className="footer-column">
                            <h5>SOCIAL</h5>
                            <ul className="social-icons">
                                <li>
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                        <FaFacebook /> Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                        <FaTwitter /> Twitter
                                    </a>
                                </li>
                                <li>
                                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                        <FaYoutube /> YouTube
                                    </a>
                                </li>
                                <li>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                        <FaInstagram /> Instagram
                                    </a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="footer-divider"></div>

            <div className="footer-middle-section py-4">
                <Container>
                    <Row className="align-items-center">
                        <Col md={4} className="footer-service">
                            <div className="service-icon">
                                <FaAward />
                            </div>
                            <div className="service-text">
                                <h6>100% ORIGINAL</h6>
                                <p>Guarantee for all products</p>
                            </div>
                        </Col>

                        <Col md={4} className="footer-service">
                            <div className="service-icon">
                                <FaShieldAlt />
                            </div>
                            <div className="service-text">
                                <h6>RETURN POLICY</h6>
                                <p>Within 30 days</p>
                            </div>
                        </Col>

                        <Col md={4} className="footer-service">
                            <div className="service-icon">
                                <FaHeadset />
                            </div>
                            <div className="service-text">
                                <h6>24/7 SUPPORT</h6>
                                <p>Dedicated support</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="footer-divider"></div>

            <div className="footer-bottom-section py-3">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6} className="copyright-text">
                            <p>© 2023 YourCompanyName All Rights Reserved</p>
                        </Col>
                        <Col md={6} className="payment-methods">
                            <img
                                src={paymentMethods}
                                alt="Payment Methods"
                                className="img-fluid"
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};

export default FlipkartFooter;