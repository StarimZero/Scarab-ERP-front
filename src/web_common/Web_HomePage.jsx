import React, { useState } from 'react';
import Slider from "react-slick";
import { Button, Col, Row } from 'react-bootstrap';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Popup from '../components/starim/web_popup/Popup';



const Web_HomePage = () => {
  const [images, setImages] = useState([
   '/images/menupage/nd.png', 
   '/images/menupage/ns1.jpg', 
   '/images/menupage/slider2.png',

  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <>
      <Popup/>
      <Row style={{ height: "45rem" }}>
        <Col>

          <div className="web-background-image-container">
            <Slider {...settings}>
              {images.map(img => (
                <div key={img} className="slider-image-container">
                  <img src={img} className="slider-image" />
                </div>
              ))}
            </Slider>
          </div>
        </Col>
      </Row>





    <div className='web-body-page'>
      <h2 className='mb-2 text-center'>쇠똥라면 이벤트</h2>
      <img src='/images/menupage/r1.png' alt='쇠똥라면 이벤트 이미지' />
      <div className='mt-2 text-center'>
        <Button  onClick={() => window.location.href = '/web/items/read'}
          className='btn-lg' variant='outline-danger'>
          제품소개
        </Button>
      </div>
    </div>



    <div className='text-center'>
      <h2 className='mb-2 text-center'>쇠똥구리</h2>
      <img src='/images/menupage/f1.png' alt='쇠똥구리 이미지' />
      <div className='mt-2 text-center'>
        <Button   onClick={() => window.location.href = '/web/company/view'}
          className='btn-lg'variant='outline-danger'>
          회사개요
        </Button>
      </div>
    </div>
      
    </>
  )
}

export default Web_HomePage;
