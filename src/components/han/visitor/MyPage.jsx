import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';

const MyPage = () => {
    //기본 폼 관련
    const vid = sessionStorage.getItem("visitor_id")
    const [form, setForm] = useState({
        visitor_id: vid,
        visitor_pass: '',
        visitor_name: '',
        visitor_birthday: '',
        visitor_phone: '',
        visitor_photo: '',
        visitor_email: '',
        visitor_address1: '',
        visitor_address2: ''
    });
    const { visitor_id, visitor_pass, visitor_name, visitor_birthday,
        visitor_phone, visitor_photo, visitor_email,
        visitor_address1, visitor_address2 } = form;
    

    //callAPI    
    const callAPI = async() => {
        const url=`/web/visitor/mypage/${vid}`
        const res = await axios.get(url);
        setForm(res.data);
    }
    useEffect(()=>{
        callAPI();
    },[])


    //수정페이지로 이동
    const onClickGo = () => {
        window.location.href='/web/visitor/update'
    }


  return (
    <Row className='justify-content-center'>
    <Col sm={8} md={6} lg={4}>
        <Card>
            <Card.Body>
                <Card.Title className="mb-4 text-center">마이페이지</Card.Title>
                
                <Form>
                    <Form.Group controlId="visitor_id" className='mb-4'>
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                            type="text"
                            name="visitor_id"
                            value={visitor_id}
                        />
                    </Form.Group>
                    <Form.Group controlId="visitor_name" className='mb-4'>
                        <Form.Label>이름</Form.Label>
                        <Form.Control
                            type="text"
                            name="visitor_name"
                            value={visitor_name}
                        />
                    </Form.Group>
                    <Form.Group controlId="visitor_email" className='mb-4'>
                        <Form.Label>이메일</Form.Label>
                        <Form.Control
                            type="text"
                            name="visitor_email"
                            value={visitor_email}
                        />
                    </Form.Group>
                    <Form.Group controlId="visitor_birthday" className='mb-4'>
                        <Form.Label className='me-3'>생년월일</Form.Label>
                        <Form.Control
                            type="text"
                            name="visitor_birthday"
                            value={visitor_birthday}
                        />
                    </Form.Group>
                    <Form.Group controlId="visitor_phone" className='mb-4'>
                        <Form.Label>연락처</Form.Label>
                        <Form.Control
                            type="text"
                            name="visitor_phone"
                            value={visitor_phone}
                        />
                    </Form.Group>
                    <Form.Group controlId="visitor_address1" className='mb-1'>
                        <Form.Label>주소</Form.Label>
                            <Form.Control
                                type="text"
                                name="visitor_address1"
                                value={visitor_address1}
                            />
                    </Form.Group>
                    <Form.Group controlId="visitor_address2" className='mb-4'>
                        <Form.Control
                            type="text"
                            name="visitor_address2"
                            value={visitor_address2}
                        />
                    </Form.Group>
                    <div className='text-center'>
                        <Button style={{ width: '30%' }} variant='outline-dark' onClick={onClickGo}>수정페이지로 이동</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    </Col>
</Row>
  )
}

export default MyPage