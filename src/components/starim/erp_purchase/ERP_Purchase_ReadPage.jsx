import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ERP_Purchase_ReadPage = ({purchase}) => {


    const [form, setForm] = useState({
        purchase_id : purchase.purchase_id,
        purchase_items_id : purchase.purchase_items_id,
        purchase_qnt : purchase.purchase_qnt,
        purchase_employee : purchase.purchase_employee,
        purchase_location : purchase.purchase_location,
        purchase_date : purchase.purchase_date,
        purchase_warehouse: parseInt(purchase.purchase_warehouse),
        purchase_price : parseInt(purchase.purchase_price),
    });

    const {purchase_qnt, purchase_employee, purchase_location, purchase_warehouse, purchase_date,  purchase_price, purchase_items_id, purchase_id } = form;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     //거래처불러오기
     const [vendorList, setVendorList] = useState([]);
     const [warehouseList, setWarehouseList] = useState([]);
     
     const callAPIVendor = async () => {
         
         const res = await axios.get(`/erp/vendor/list.json`)
         //console.log(res.data);
         setVendorList(res.data);
 
     }
     
 
     const callAPIWarehouse = async() => {
         const res = await axios.get("/erp/warehouse");
         setWarehouseList(res.data);
         
 
     }
 
 
     //담당자불러오기
     //출하창고불러오기
 
     useEffect(()=>{
         callAPIVendor();
         callAPIWarehouse();
         
     },[])


     const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
      };

      const onClickPurchaseUpdate = async () => {
        if(purchase_warehouse==="0" || purchase_location==="0"){
            alert("모든정보를 입력하세요")
            return;
        }
        if(!window.confirm(`${purchase.purchase_id}의 구매정보를 수정하시겠습니까?`)) return;
            await axios.put(`/erp/purchase`, form);
            console.log(form);
            alert("수정완료")
            handleClose();
            window.location.reload();
    }


  return (
    <>
    <div onClick={handleShow}>
    {purchase.purchase_id}
    </div>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
    >
        <Modal.Header closeButton>
            <Modal.Title>{purchase.purchase_id}</Modal.Title>
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
                                    <Form.Control type='date' value={new Date(purchase_date).toISOString().substring(0, 10)} name='purchase_date' onChange={onChangeForm}/>
                                </Col>
                                <Col lg={2}>
                                    거래처 : 
                                </Col>
                                <Col>
                                    <Form.Select value={purchase_location} name='purchase_location' onChange={onChangeForm}>
                                        <option value={0}>거래처를선택하세요</option>
                                        {vendorList && vendorList.map(ven=>
                                            <option key={ven.vendor_id} >
                                                {ven.vendor_id}
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
                                    <Form.Select value={purchase_employee} name='purchase_employee' onChange={onChangeForm} >
                                        <option value={0}>담당자를선택하세요</option>
                                        <option>test</option>
                                    </Form.Select>
                                </Col>
                                <Col lg={2}>
                                    <div>출하창고 : </div>
                                </Col>
                                <Col>
                                    <Form.Select value={parseInt(purchase_warehouse)} name='purchase_warehouse' onChange={onChangeForm}>
                                        <option value={0}>출하창고를선택하세요</option>
                                        {warehouseList && warehouseList.map(ware=>
                                            <option key={ware.warehouse_id} value={ware.warehouse_id} >
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
                                                <td><Form.Control value={purchase_items_id}/> </td>
                                                <td><Form.Control value={parseInt(purchase_qnt)} name='purchase_qnt' onChange={onChangeForm}/></td>
                                                <td><Form.Control value={purchase_price} name='purchase_price' onChange={onChangeForm}/></td>
                                                <td><Form.Control value={Math.ceil(`${purchase_price}` * 0.1) + "원"} /></td>
                                                <td><Form.Control value={Math.ceil(`${purchase_price}` * 1.1 * `${purchase_qnt}`) + "원"} /></td>
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
            <Button variant="primary" onClick={onClickPurchaseUpdate}>수정하기</Button>
        </Modal.Footer>
    </Modal>
</>
  )
}

export default ERP_Purchase_ReadPage