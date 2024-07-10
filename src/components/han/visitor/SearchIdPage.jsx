import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'

const SearchIdPage = () => {
    const [visitor_email, setVisitor_email] = useState('');

    const onChangeVisitor_email = (e) => {
        setVisitor_email(e.target.value);
    };

    const onClickSend = () => {
        if(!visitor_email){
            alert("이메일을 입력해주세요.");
            return;
        }
        axios.post("/web/visitor/searchid", visitor_email);
    }



  return (
    <Row className="justify-content-center">
        <Col xs={8} md={6} lg={4}>
            <Card>
                <Card.Body>
                    <Card.Title className="mb-4 text-center">아이디 찾기</Card.Title>
                    <Form>
                        
                        <Form.Group>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    name="visitor_email"
                                    value={visitor_email}
                                    onChange={onChangeVisitor_email}
                                    placeholder="이메일을 입력하세요."
                                />
                            </InputGroup>
                        </Form.Group>
                        <div className='mt-2'>
                            <h6>가입 시 입력한 이메일로 아이디를 보내드립니다.</h6>
                        </div>
                        <div className='text-center mt-3'>
                            <Button variant='outline-dark' onClick={onClickSend}>이메일전송</Button>
                        </div>    
                        <div className='text-end'>
                            <a href='/web/visitor/searchpass'>비밀번호찾기</a>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default SearchIdPage