import { Carousel, Container } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import banner1 from "../../../../assets/images/banner1.jpg";
import banner2 from "../../../../assets/images/banner2.jpg";
import banner3 from "../../../../assets/images/banner3.jpg";
import banner4 from "../../../../assets/images/banner4.jpg";
import banner5 from "../../../../assets/images/banner5.jpg";
import banner6 from "../../../../assets/images/banner6.jpg";
import banner7 from "../../../../assets/images/banner7.jpg";
import banner8 from "../../../../assets/images/banner8.jpg";
import "./slider.css"

function Slider() {
    return (
        <>
            <div className="banner mt-3">
                <Container className="custom-container">
                    <div className="banner_slider">
                        <Carousel
                            prevIcon={
                                <div className="carousel-icon-wrapper">
                                    <FaChevronLeft />
                                </div>
                            }
                            nextIcon={
                                <div className="carousel-icon-wrapper">
                                    <FaChevronRight />
                                </div>
                            }
                        >
                            <Carousel.Item><img src={banner1} alt="banner1" className="d-block w-100" /></Carousel.Item>
                            <Carousel.Item><img src={banner2} alt="banner2" className="d-block w-100" /></Carousel.Item>
                            <Carousel.Item><img src={banner3} alt="banner3" className="d-block w-100" /></Carousel.Item>
                            <Carousel.Item><img src={banner4} alt="banner4" className="d-block w-100" /></Carousel.Item>
                            <Carousel.Item><img src={banner5} alt="banner5" className="d-block w-100" /></Carousel.Item>
                            <Carousel.Item><img src={banner6} alt="banner6" className="d-block w-100" /></Carousel.Item>
                            <Carousel.Item><img src={banner7} alt="banner7" className="d-block w-100" /></Carousel.Item>
                            <Carousel.Item><img src={banner8} alt="banner8" className="d-block w-100" /></Carousel.Item>
                        </Carousel>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Slider;