import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'

const ERP_WareHouseInsertPage = () => {




    const [wareHouseName, setWareHouseName] = useState("");
    const [wareHouseAddress, setWareHouseAddress] = useState("");


    const onClickWareHouseInsertSubmit =  async () => {
        if(wareHouseName==="" || wareHouseAddress===""){
            alert("모든정보를 입력하세요")
            return;
        }
        if(!window.confirm("창고를 등록하시겠습니까?")) return;
        //console.log(wareHouseName, wareHouseAddress)
        await axios.post(`/erp/warehouse`, {warehouse_name : wareHouseName, warehouse_address:wareHouseAddress})
        alert("창고등록완료")
        window.location.href="/erp/warehouse/list"
        
    }



  return (
    <Row className='justify-content-center'>
        <Col lg={3}>
            <Card>
                <Card.Header>
                    <h1>창고등록</h1>
                </Card.Header>
                <Card.Body>
                    <InputGroup>
                        <InputGroup.Text>창고이름</InputGroup.Text>
                        <Form.Control value={wareHouseName} onChange={(e)=>setWareHouseName(e.target.value)} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>창고주소</InputGroup.Text>
                        <Form.Control value={wareHouseAddress} onChange={(e)=>setWareHouseAddress(e.target.value)}/>
                    </InputGroup>
                </Card.Body>
                <Card.Footer>
                    <div>
                        <Button onClick={onClickWareHouseInsertSubmit}>등록</Button>
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    </Row>
  )
}

export default ERP_WareHouseInsertPage