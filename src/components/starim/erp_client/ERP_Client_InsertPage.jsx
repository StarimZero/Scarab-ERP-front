import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'
import AddressModal from '../../../common/AddressModal';

const ERP_Client_InsertPage = () => {

    const [form, setForm] = useState({
        client_name : "",
        client_person : "",
        client_employee : "",
        client_phone : "",
        client_address : "",
        client_credit_limit : 0,
        client_fax : "",
        client_email : ""
    })

    const {client_name, client_person, client_employee, client_phone, client_address, client_credit_limit, client_fax, client_email} = form;

    const onChagneForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }

    


    const onClicItemsInsert =  async () => {
        if(client_name===""){
            alert("모든정보를 입력하세요")
            return;
        }
        if(!window.confirm("거래처를를 등록하시겠습니까?")) return;
        console.log();
        await axios.post(`/erp/client`, form)
        alert("거래처등록완료")
        window.location.href="/erp/client/list"

    }

    



  return (
    <Row className='justify-content-center'>
        <Col lg={3}>
            <Card>
                <Card.Header>
                    <h1>고객사등록</h1>
                </Card.Header>
                <Card.Body>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>거래처명</InputGroup.Text>
                        <Form.Control value={client_name} name='client_name'  placeholder='거래처명' onChange={onChagneForm}/ >
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>거래처담당자</InputGroup.Text>
                        <Form.Control value={client_person} name='client_person' placeholder='거래처담당자'onChange={onChagneForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>담당직원</InputGroup.Text>
                        <Form.Control value={client_employee} name='client_employee' placeholder='담당엽업사원'onChange={onChagneForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>전화번호</InputGroup.Text>
                        <Form.Control value={client_phone} name='client_phone' placeholder='전화번호'onChange={onChagneForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>주소</InputGroup.Text>
                        <Form.Control value={client_address} name='client_address' placeholder='주소'onChange={onChagneForm}/>
                        <AddressModal setForm={setForm} form={form}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>팩스</InputGroup.Text>
                        <Form.Control value={client_fax} name='client_fax' placeholder='팩스'onChange={onChagneForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>이메일</InputGroup.Text>
                        <Form.Control value={client_email} name='client_email' placeholder='이메일'onChange={onChagneForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>여신한도</InputGroup.Text>
                        <Form.Select value={client_credit_limit} name='client_credit_limit' onChange={onChagneForm}>
                            <option value={parseInt(0)}>기본</option>
                            <option value={parseInt(1)}>신뢰</option>
                            <option value={parseInt(2)}>우대</option>
                            <option value={parseInt(3)}>VIP</option>
                        </Form.Select>
                    </InputGroup>
                </Card.Body>
                <Card.Footer>
                    <div>
                        <Button onClick={onClicItemsInsert}>등록</Button>
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    </Row>
  )
}

export default ERP_Client_InsertPage