import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col,  Form,  Row, Table } from 'react-bootstrap'
import ERP_Items_Modal from '../starim_common/ERP_Items_Modal';

const ERP_Sales_InsertPage = () => {

    const [page] = useState(1);
    const [size] = useState(5);
    const [key] = useState("title");
    const [word] = useState("");

    const [selectedItemId, setSelectedItemId] = useState("");
    const [selectedItemName, setSelectedItemName] = useState("");


    const today = new Date().toISOString().slice(0, 10);
    


    const [ setSales_items_id] = useState("");
    const [sales_qnt, setSales_qnt] = useState("");
    const [sales_employee, setSales_employee] = useState("");
    const [sales_location, setSales_location ] = useState("");
    const [sales_date, setSales_date ] = useState(today);
    const [sales_warehouse, setSales_warehouse ] = useState("");
    const [sales_price, setsales_price ] = useState("");




    
    const [clientList, setClientList] = useState([]);
    const [warehouseList, setWarehouseList] = useState([]);
    const [memberList, setMemberList] = useState([]);
    

    //거래처불러오기
    const callAPIClient = async () => {
        
        const res = await axios.get(`/erp/client`)
        //console.log(res.data);
        setClientList(res.data);

    }
    

    //담당자불러오기
    const callAPIMember = async () => {
        const res = await axios.get(`/erp/member?key=${key}&word=${word}&page=${page}&size=${size}`)
        console.log(res.data.list);
        setMemberList(res.data.list);

    }


    //출하창고불러오기
    const callAPIWarehouse = async() => {
        const res = await axios.get("/erp/warehouse");
        setWarehouseList(res.data);

    }


    useEffect(()=>{
        callAPIClient();
        callAPIWarehouse();
        callAPIMember();
    },[])


    const onItemSelect = (selectedItem) => {  // Callback function for selected item
        setSales_items_id(selectedItem.items_id);  // Update sales_items_id
        // Optionally update sales_name if needed
      };



    
    
    const onClicSaleInsert =  async () => {
        if(sales_warehouse===""){
            alert("모든정보를 입력하세요")
            return;
        }
        if(!window.confirm("판매를 등록하시겠습니까?")) return;
        await axios.post(`/erp/sales`, {sales_items_id : selectedItemId, sales_date, sales_qnt, sales_employee, sales_location, sales_warehouse, sales_price} )
        alert("판매등록완료")
        window.location.href="/erp/sales/list"


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
                                <Form.Control type='date' value={sales_date} onChange={(e)=>setSales_date(e.target.value)}/>
                            </Col>
                            <Col lg={2}>
                                거래처 : 
                            </Col>
                            <Col>
                                <Form.Select value={sales_location} onChange={(e)=>setSales_location(e.target.value)}>
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
                                <Form.Select value={sales_employee} onChange={(e)=>setSales_employee(e.target.value)}>
                                    <option>담당자를선택하세요</option>
                                    {memberList && memberList.map(mem=>
                                        <option key={mem.member_info_id}>{mem.member_info_id}</option>
                                    )}
                                </Form.Select>
                            </Col>
                            <Col lg={2}>
                                <div>출하창고 : </div>
                            </Col>
                            <Col>
                                <Form.Select value={sales_warehouse} onChange={(e)=>setSales_warehouse(e.target.value)}>
                                    <option>출하지점을선택하세요</option>
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
                                            <td><Form.Control value={sales_qnt} onChange={(e)=>setSales_qnt(e.target.value)} /></td>
                                            <td><Form.Control value={sales_price} onChange={(e)=>setsales_price(e.target.value)} /></td>
                                            <td><Form.Control value={Math.ceil(`${sales_price}` * 0.1) + "원"} /></td>
                                            <td><Form.Control value={Math.ceil(`${sales_price}` * 1.1 * `${sales_qnt}`) + "원"} /></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Button className='me-3' onClick={onClicSaleInsert}>저장하기</Button>
                        <Button>다시작성</Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default ERP_Sales_InsertPage