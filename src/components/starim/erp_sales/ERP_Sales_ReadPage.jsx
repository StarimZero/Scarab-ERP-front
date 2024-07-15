import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ERP_Sales_ReadPage = ({sales}) => {

    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size] = useState(150);
    const [key, setKey] = useState("title");
    const [word, setWord] = useState("");


    const [form, setForm] = useState({
        sales_id : sales.sales_id,
        sales_items_id : sales.sales_items_id,
        sales_qnt : sales.sales_qnt,
        sales_employee : sales.sales_employee,
        sales_location : sales.sales_location,
        sales_date : sales.sales_date,
        sales_warehouse: parseInt(sales.sales_warehouse),
        sales_price : parseInt(sales.sales_price),
    });

    const {sales_qnt, sales_employee, sales_location, sales_warehouse, sales_date,  sales_price, sales_items_id, sales_id } = form;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     //거래처불러오기
     const [clientList, setClientList] = useState([]);
     const [warehouseList, setWarehouseList] = useState([]);
     const [memberList, setMemberList] = useState([]);
     
     const callAPIClient = async () => {
         
         const res = await axios.get(`/erp/client`)
         //console.log(res.data);
         setClientList(res.data);
 
     }
     
    //출하창고불러오기
     const callAPIWarehouse = async() => {
         const res = await axios.get("/erp/warehouse");
         setWarehouseList(res.data);
     }
 
     //담당자불러오기
     const callAPIMember = async () => {
        const res = await axios.get(`/erp/member?key=${key}&word=${word}&page=${page}&size=${size}`)
        console.log(res.data.list);
        setMemberList(res.data.list);

    }
     
 
     useEffect(()=>{
         callAPIClient();
         callAPIWarehouse();
         callAPIMember();
     },[])


     const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
      };

      const onClickSaleUpdate = async () => {
        if(sales_warehouse==="0" || sales_location==="0"){
            alert("모든정보를 입력하세요")
            return;
        }
        if(!window.confirm(`${sales.sales_id}의 판매정보를 수정하시겠습니까?`)) return;
            await axios.put(`/erp/sales`, form);
            console.log(form);
            alert("수정완료")
            handleClose();
    }




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
                                        <Form.Control type='date' value={new Date(sales_date).toISOString().substring(0, 10)} name='sales_date' onChange={onChangeForm}/>
                                    </Col>
                                    <Col lg={2}>
                                        거래처 : 
                                    </Col>
                                    <Col>
                                        <Form.Select value={sales_location} name='sales_location' onChange={onChangeForm}>
                                            <option value={0}>거래처를선택하세요</option>
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
                                        <Form.Select value={sales_employee} name='sales_employee' onChange={onChangeForm} >
                                            <option value={0}>담당자를선택하세요</option>
                                            {memberList && memberList.map(mem=>
                                            <option key={mem.member_info_id}>{mem.member_info_id}</option>
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
                                                    <td>출하창고</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><Form.Control value={sales_items_id}/> </td>
                                                    <td><Form.Control value={parseInt(sales_qnt)} name='sales_qnt' onChange={onChangeForm}/></td>
                                                    <td><Form.Control value={sales_price} name='sales_price' onChange={onChangeForm}/></td>
                                                    <td><Form.Control value={Math.ceil(`${sales_price}` * 0.1) + "원"} /></td>
                                                    <td><Form.Control value={Math.ceil(`${sales_price}` * 1.1 * `${sales_qnt}`) + "원"} /></td>
                                                    <td>
                                                        <Form.Select value={parseInt(sales_warehouse)} name='sales_warehouse' onChange={onChangeForm}>
                                                            <option value={0}>출하창고를선택하세요</option>
                                                            {warehouseList && warehouseList.map(ware=>
                                                                <option key={ware.warehouse_id} value={ware.warehouse_id} >
                                                                    {ware.warehouse_id}
                                                                </option>
                                                            )}
                                                        </Form.Select>
                                                    </td>
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
                <Button variant="primary" onClick={onClickSaleUpdate}>수정하기</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default ERP_Sales_ReadPage