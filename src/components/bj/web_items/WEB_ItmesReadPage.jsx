import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import '../../../common/assets/web/css/Slick.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Col, Container, Row } from 'react-bootstrap';

const WEB_ItmesReadPage = () => {
    const [items, setItems] = useState([]);
   
    const [images, setImages] = useState([
        '/images/items/coke_1.5L.jpg',
        '/images/items/coke_355ml.jpg',
        '/images/items/coke_500ml.jpg',
        '/images/items/cokezero_355ml.jpg',
    ]);


    const CallAPI = async() => {
        const res = await axios.get('/erp/items/list.json');
        console.log(res.data);
        setItems(res.data);
    }

    useEffect(()=>{
        CallAPI();
    }, []);


      
      return (
    <div >
        <Container className='mt-5'>
        <Row>
            {items.map((item, index) => (
                <Col xs={12} md={6} lg={6} className='mb-4' key={item.items_id}>
                    <Card>
                        <Row >
                            <Col xs={4}>
                                <Card.Img  src={images[index % images.length]} />
                            </Col>
                            <Col xs={8} className="d-flex align-items-center">
                                <div className="w-100">
                                    <Card.Body>
                                        <Card.Title>{item.items_name}</Card.Title>
                                        <hr />
                                        <Card.Text>
                                            가격: {}
                                            <br />
                                            출시일자: {}
                                        </Card.Text>
                                    </Card.Body>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
    </div>
);
}

export default WEB_ItmesReadPage