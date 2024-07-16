import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import ERP_Items_Modal from '../starim_common/ERP_Items_Modal';

const ERP_Purchase_InsertPage = () => {


    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size] = useState(5);
    const [key, setKey] = useState("title");
    const [word, setWord] = useState("");


    const [selectedItemId, setSelectedItemId] = useState("");
    const [selectedItemName, setSelectedItemName] = useState("");


    const today = new Date().toISOString().slice(0, 10);
    


    const [purchase_items_id, setPurchase_items_id] = useState("");
    const [purchase_qnt, setPurchase_qnt] = useState("");
    const [purchase_employee, setPurchase_employee] = useState("");
    const [purchase_location, setPurchase_location ] = useState("");
    const [purchase_date, setPurchase_date ] = useState(today);
    const [purchase_warehouse, setPurchase_warehouse ] = useState("");
    const [purchase_price, setPurchase_price ] = useState("");
    const [memberList, setMemberList] = useState([]);




    //거래처불러오기
    const [vendorList, setVendorList] = useState([]);
    const [warehouseList, setWarehouseList] = useState([]);
    
    const callAPIVendor = async () => {
        
        const res = await axios.get(`/erp/vendor`)
        //console.log(res.data);
        setVendorList(res.data);

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
        callAPIVendor();
        callAPIWarehouse();
        callAPIMember();
    },[])


    const onItemSelect = (selectedItem) => {  // Callback function for selected item
        setPurchase_items_id(selectedItem.items_id);  // Update sales_items_id
        // Optionally update sales_name if needed
      };

      const onClicPurchaseInsert =  async () => {
        if(purchase_warehouse===""){
            alert("모든정보를 입력하세요")
            return;
        }
        if(!window.confirm("구매를 등록하시겠습니까?")) return;
        await axios.post(`/erp/purchase`, {purchase_items_id : selectedItemId, purchase_date, purchase_qnt, purchase_employee, purchase_location, purchase_date, purchase_warehouse, purchase_price} )
        alert("구매등록완료")
        window.location.href="/erp/purchase/list"


    }
    console.log(selectedItemId)

  return (
    <>
        <Row className='justify-content-center'>
            <Col lg={7}>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col lg={2}>
                                <div>일자:</div>
                            </Col>
                            <Col >
                                <Form.Control type='date' value={purchase_date} onChange={(e)=>setPurchase_date(e.target.value)}/>
                            </Col>
                            <Col lg={2}>
                                거래처 : 
                            </Col>
                            <Col>
                                <Form.Select value={purchase_location} onChange={(e)=>setPurchase_location(e.target.value)}>
                                    <option>거래처를선택하세요</option>
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
                                <Form.Select value={purchase_employee} onChange={(e)=>setPurchase_employee(e.target.value)}>
                                    <option>담당자를선택하세요</option>
                                    {memberList && memberList.map(mem=>
                                        <option key={mem.member_info_id}>{mem.member_info_id}</option>
                                    )}
                                </Form.Select>
                            </Col>
                            <Col lg={2}>
                                <div>입고창고 : </div>
                            </Col>
                            <Col>
                                <Form.Select value={purchase_warehouse} onChange={(e)=>setPurchase_warehouse(e.target.value)}>
                                    <option>입고지점을선택하세요</option>
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
                                            <td>품목명</td>
                                            <td>수량</td>
                                            <td>단가</td>
                                            <td>부가세</td>
                                            <td>총금액</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <ERP_Items_Modal selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId} setSelectedItemName={setSelectedItemName}/>
                                            </td>
                                            <td><Form.Control value={selectedItemName} onChange={(e) => setSelectedItemName(e.target.value)} /> </td>
                                            <td><Form.Control value={purchase_qnt} onChange={(e)=>setPurchase_qnt(e.target.value)} /></td>
                                            <td><Form.Control value={purchase_price} onChange={(e)=>setPurchase_price(e.target.value)} /></td>
                                            <td><Form.Control value={Math.ceil(`${purchase_price}` * 0.1) + "원"} /></td>
                                            <td><Form.Control value={Math.ceil(`${purchase_price}` * 1.1 * `${purchase_qnt}`) + "원"} /></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Button className='me-3' onClick={onClicPurchaseInsert}>저장하기</Button>
                        <Button>다시작성</Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default ERP_Purchase_InsertPage