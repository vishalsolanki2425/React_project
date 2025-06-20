import { Container } from "react-bootstrap";
import img1 from "../../../../assets/images/p-1.png";
import img2 from "../../../../assets/images/p-2.png";
import img3 from "../../../../assets/images/p-3.png";
import img4 from "../../../../assets/images/p-4.png";
import img5 from "../../../../assets/images/p-5.png";
import img6 from "../../../../assets/images/p-6.png";
import img7 from "../../../../assets/images/p-7.png";
import img8 from "../../../../assets/images/p-8.png";
import img9 from "../../../../assets/images/p-9.png";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductsAsync } from "../../../../Services/Actions/Productactions";
import "./Banner.css";

const Banner = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.Product_Reducer);

    useEffect(() => {
        dispatch(getProductsAsync());
    }, [dispatch]);

    return (
        <>
            <div className="banner_product mt-3 ">
                <Container className="custom-container">
                    <div className="product-container">
                        <div className="product-scroll d-flex justify-content-center align-items-center">
                            <div className="product_text">
                                <img src={img1} alt="" />
                                <p>Kilos</p>
                            </div>
                            <div className="product_text">
                                <img src={img2} alt="" />
                                <p>Mobiles</p>
                            </div>
                            <div className="product_text">
                                <img src={img3} alt="" />
                                <p>Fashion <BiChevronDown className='fs-4' /></p>
                            </div>
                            <div className="product_text">
                                <img src={img4} alt="" />
                                <p>Electronics <BiChevronDown className='fs-4' /></p>
                            </div>
                            <div className="product_text">
                                <img src={img5} alt="" />
                                <p>Home & Furniture <BiChevronDown className='fs-4' /></p>
                            </div>
                            <div className="product_text">
                                <img src={img6} alt="" />
                                <p>Appliances</p>
                            </div>
                            <div className="product_text">
                                <img src={img7} alt="" />
                                <p>Flight Bookings</p>
                            </div>
                            <div className="product_text">
                                <img src={img8} alt="" />
                                <p>Beauty, Toys & More<BiChevronDown className='fs-4' /></p>
                            </div>
                            <div className="product_text">
                                <img src={img9} alt="" />
                                <p>Two Wheelers<BiChevronDown className='fs-4' /></p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Banner;