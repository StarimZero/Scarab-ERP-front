import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../../common/assets/web/css/Slick.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';



const categories = ['전체', '면', '스낵', '음료', '간편식', '해외브랜드'];
const products = [
    {
        name: '농심가락 라면소스',
        imgSrc: 'link-to-image1.jpg',
    },
    {
        name: '먹태청양마요 만능소스',
        imgSrc: 'link-to-image2.jpg',
    },
    {
        name: '배홍동 만능소스',
        imgSrc: 'link-to-image3.jpg',
    },
    {
        name: '사천짜파게티 만능소스',
        imgSrc: 'link-to-image4.jpg',
    }
];

const WEB_ItmesReadPage = () => {
    const [items, setItems] = useState([]);
   
    const [images, setImages] = useState([
        '/images/items/coke_1.5L.jpg',
        '/images/items/coke_355ml.jpg',
        '/images/items/coke_500ml.jpg',
        '/images/items/cokezero_355ml.jpg',
    ]);

    const CallAPI = async () => {
        const res = await axios.get('/erp/items/list.json');
        console.log(res.data);
        setItems(res.data);
    }

    useEffect(() => {
        CallAPI();
    }, []);

    return (
        <div>
            <Tabs
                className='item-list-tab justify-content-center'
                style={{ display: 'flex', justifyContent: 'center' }}>
                    
                <Tab eventKey="home" title="음료">
                    <Container className='mt-5'>
                        <Row>
                            {items && items.filter((item) => item.items_type === 0).map((item, index) => (
                                <Col xs={12} md={6} lg={4} className='mb-4' key={item.items_id}>
                                    <Card>
                                        <Row>
                                            <Col xs={4}>
                                                <Card.Img src={images[index % images.length]} />
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
                </Tab>
                <Tab eventKey="profile" title="면">
                    <Container className='mt-5'>
                        <Row>
                            {items && items.filter((item) => item.items_type === 1).map((item, index) => (
                                <Col xs={12} md={6} lg={4} className='mb-4' key={item.items_id}>
                                    <Card>
                                        <Row>
                                            <Col xs={4}>
                                                <Card.Img src={images[index % images.length]} />
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
                </Tab>
                <Tab eventKey="eatfood" title="스낵">
                    <Container className='mt-5'>
                        <Row>
                            {items && items.filter((item) => item.items_type === 2).map((item, index) => (
                                <Col xs={12} md={6} lg={4} className='mb-4' key={item.items_id}>
                                    <Card>
                                        <Row>
                                            <Col xs={4}>
                                                <Card.Img src={images[index % images.length]} />
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
                </Tab>
            </Tabs>
        </div>
    );
}

export default WEB_ItmesReadPage;
