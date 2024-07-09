import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ERP_Items_Modal from '../starim_common/ERP_Items_Modal';

const ERP_Sales_ReadPage = ({sales}) => {

    const today = new Date().toISOString().slice(0, 10);

    const [form, setForm] = useState({
        sales_items_id : sales.sales_items_id,
        sales_qnt : sales.sales_qnt,
        sales_employee : sales.sales_employee,
        sales_location : sales.sales_location,
        sales_date : sales.sales_date,
        sales_warehouse : sales.sales_warehouse,
        sales_price : sales.sales_price,
    });

    const {sales_qnt, sales_employee, sales_location, sales_warehouse, sales_date,  sales_price, sales_items_id } = form;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

     //거래처불러오기
     const [clientList, setClientList] = useState([]);
     const [warehouseList, setWarehouseList] = useState([]);
     
     const callAPIClient = async () => {
         
         const res = await axios.get(`/erp/client/list.json`)
         //console.log(res.data);
         setClientList(res.data);
 
     }
     
 
     const callAPIWarehouse = async() => {
         const res = await axios.get("/erp/warehouse");
         setWarehouseList(res.data);
 
     }
 
 
     //담당자불러오기
     //출하창고불러오기
 
     useEffect(()=>{
         callAPIClient();
         callAPIWarehouse();
     },[])


  return (
    <>
        <div onClick={handleShow}>
        {sales.sales_id}
        </div>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>{sales.sales_id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Row>
                                    <Col lg={2}>
                                        <div>일자:</div>
                                    </Col>
                                    <Col >
                                        <Form.Control type='date' defaultValue={today}/>
                                    </Col>
                                    <Col lg={2}>
                                        거래처 : 
                                    </Col>
                                    <Col>
                                        <Form.Select value={sales_location} >
                                            <option>거래처를선택하세요</option>
                                            {clientList && clientList.map(cli=>
                                                <option key={cli.client_id} >
                                                    {cli.client_id}
                                                </option>
                                            )}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={2}>
                                        <div>담당자:</div>
                                    </Col>
                                    <Col>
                                        <Form.Select value={sales_employee} >
                                            <option>담당자를선택하세요</option>
                                            <option >test</option>
                                        </Form.Select>
                                    </Col>
                                    <Col lg={2}>
                                        <div>출하창고 : </div>
                                    </Col>
                                    <Col>
                                        <Form.Select value={sales_warehouse} >
                                            <option>출하창고를선택하세요</option>
                                            {warehouseList && warehouseList.map(ware=>
                                                <option key={ware.warehouse_id} >
                                                    {ware.warehouse_id}
                                                </option>
                                            )}
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <td>품목코드</td>
                                                    <td>수량</td>
                                                    <td>단가</td>
                                                    <td>부가세</td>
                                                    <td>총금액</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><Form.Control value={sales_items_id} /> </td>
                                                    <td><Form.Control value={sales_qnt}/></td>
                                                    <td><Form.Control value={sales_price} /></td>
                                                    <td><Form.Control value={Math.ceil(`${sales_price}` * 0.1) + "원"} /></td>
                                                    <td><Form.Control value={Math.ceil(`${sales_price}` * 1.1 * `${sales_qnt}`) + "원"} /></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">수정하기</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default ERP_Sales_ReadPage