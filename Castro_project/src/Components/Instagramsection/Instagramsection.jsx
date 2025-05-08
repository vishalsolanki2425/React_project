import Commoncomp from "../Commoncomp/Commoncomp";
import React, { useState } from 'react';
import line from "../../assets/separator.png";
import { Carousel } from 'react-bootstrap';
import img1 from "../../assets/instagram-1.jpg";
import img2 from "../../assets/instagram-2.jpg";
import img3 from "../../assets/instagram-3.jpg";
import img4 from "../../assets/instagram-4.jpg";
import img5 from "../../assets/instagram-5.jpg";
import img6 from "../../assets/instagram-6.jpg";

function InstagramSection() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="instagramsection py-5">
            <div className="Instagram_title text-center mb-5">
                <Commoncomp
                    title={"Follow Us On Instagram"}
                    text={"Excepteur sint occaecat cupidatat non proident sunt"}
                    img={line}
                />
            </div>

            <Carousel activeIndex={index} onSelect={handleSelect} controls={false} indicators={false}>
                <Carousel.Item>
                    <div className="instagram_slider d-flex justify-content-center gap-2 ms-3 ms-md-0">
                        <div className="col-md-2">
                            <img src={img1} alt="First slide" className="img-fluid" />
                        </div>
                        <div className="col-md-2">
                            <img src={img2} alt="First slide" className="img-fluid" />
                        </div>
                        <div className="col-md-2">
                            <img src={img3} alt="First slide" className="img-fluid" />
                        </div>
                        <div className="col-md-2">
                            <img src={img4} alt="First slide" className="img-fluid" />
                        </div>
                        <div className="col-md-2">
                            <img src={img5} alt="First slide" className="img-fluid" />
                        </div>
                        <div className="col-md-2">
                            <img src={img6} alt="First slide" className="img-fluid" />
                        </div>
                    </div>

                </Carousel.Item>
            </Carousel>
        </div >
    );
}

export default InstagramSection;
