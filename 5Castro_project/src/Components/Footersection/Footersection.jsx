import Container from 'react-bootstrap/Container';
import logo from '../../assets/logo.png';
import visa from '../../assets/card-1.png';
import maestro from '../../assets/card-2.png';
import amex from '../../assets/card-3.png';
import discover from '../../assets/card-4.png';
import { TiSocialFacebook, TiSocialTwitter, TiSocialVimeo } from "react-icons/ti";
import { FaGooglePlusG } from "react-icons/fa6";
import './Footersection.css';

function Footersection() {
    return (
        <>
            <footer className="footer ">
                <Container>
                    <div className="row g-4 justify-content-between">
                        <div className="col-lg-2 col-md-6">
                            <a href="#">
                                <img src={logo} alt="Logo" className="img-fluid mb-3" />
                            </a>
                        </div>

                        <div className="col-lg-2 col-md-6">
                            <h5>Category</h5>
                            <ul className="list-unstyled">
                                <li><a href="#">Men</a></li>
                                <li><a href="#">Women</a></li>
                                <li><a href="#">Kids</a></li>
                                <li><a href="#">Accessories</a></li>
                                <li><a href="#">Shoe</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-2 col-md-6">
                            <h5>Useful Link</h5>
                            <ul className="list-unstyled">
                                <li><a href="#">News & Tips</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Terms & Conditions</a></li>
                                <li><a href="#">Our Shop</a></li>
                                <li><a href="#">Contact Us</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-2 col-md-6">
                            <h5>Contact</h5>
                            <p>4708 Ruecker Wall, Kassandratown, HI</p>
                            <p><a href="tel:+23055873407">+2(305) 587-3407</a></p>
                            <p><a href="mailto:info@example.com">info@example.com</a></p>
                            <div className="d-flex gap-3 mt-2">
                                <a href="#"><TiSocialFacebook size={20} /></a>
                                <a href="#"><TiSocialTwitter size={20} /></a>
                                <a href="#"><TiSocialVimeo size={20} /></a>
                                <a href="#"><FaGooglePlusG size={18} /></a>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <h5>Newsletter</h5>
                            <p>4708 Ruecker Wall, Kassandratown, HI 97729</p>
                            <input type="email" placeholder="Enter your email" className="form-control border-dark mb-2" />
                            <button className="footerbtn">Subscribe</button>
                        </div>
                    </div>

                </Container>
                <div className="footer_right justify-content-center align-items-center">
                    <Container>
                        <div className="row mt-5 justify-content-between align-items-center bg- py-3">
                            <div className="col-md-6 d-flex gap-2 flex-wrap">
                                <img src={maestro} alt="Maestro" height="30" />
                                <img src={visa} alt="Visa" height="30" />
                                <img src={amex} alt="Amex" height="30" />
                                <img src={discover} alt="Discover" height="30" />
                            </div>
                            <div className="col-md-6 text-md-end mt-5 mt-md-0">
                                <p className="mb-0 text-muted">Castro © 2020 All Right Reserved</p>
                            </div>
                        </div>
                    </Container>
                </div>
            </footer>
        </>
    );
}

export default Footersection;
