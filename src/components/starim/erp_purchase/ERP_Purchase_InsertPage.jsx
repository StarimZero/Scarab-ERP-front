import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import ERPItemsModalPurcahse from '../starim_common/ERPItemsModalPurcahse';

const ERP_Purchase_InsertPage = () => {

    const todayDate = new Date().toISOString().split('T')[0];
    const [page] = useState(1);
    const [size] = useState(15);
    const [key] = useState("title");
    const [word] = useState("");


    const [master, setMaster] = useState({
        purchase_employee : "",
        purchase_location : "",
        purchase_date : todayDate
    });

    const [items, setItems] = useState([{
        purchase_items_id:'',
        purchase_qnt : "",
        purchase_warehouse : "",
        purchase_price : ""
    }]);

 

    
    const [VendorList, setVendorList] = useState([]);
    const [warehouseList, setWarehouseList] = useState([]);
    const [memberList, setMemberList] = useState([]);
    
    //거래처불러오기
    const callAPIVendor = async () => {
        
        const res = await axios.get(`/erp/vendor`)
        //console.log(res.data);
        setVendorList(res.data);

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
        callAPIVendor();
        callAPIWarehouse();
        callAPIMember();
    },[])


    const onClickAdd = () => {
        const item={
            purchase_items_id:'',
            purchase_qnt : "",
            purchase_warehouse : "",
            purchase_price : ""
        };
        setItems(items.concat(item))
    }
    const onClickDelete = (index) => {
        setItems(items.filter(( idx) => idx !== index));
        console.log(index);
    };

    const onChangeItem = (e, index) => {
        const data=items.map((item, idx)=> index===idx ? {...item, [e.target.name]:e.target.value} : item);
        setItems(data);
    }

    const onChageMaster = (e) => {
        const data = {...master, [e.target.name] : e.target.value};
        setMaster(data);
    }

    const onClickSaleInsert = async () => {
        const res = await axios.post(`/erp/purchase`, {...master, purchase_location : parseInt(master.purchase_location, 10)})
        const purchase_id = res.data;
        console.log(purchase_id);
        purchase_id && await Promise.all(items.map(item => axios.post(`/erp/purchase/info`, { ...item, purchase_id,  
            purchase_qnt: parseInt(item.purchase_qnt, 10),
            purchase_price: parseInt(item.purchase_price, 10),
            purchase_warehouse: parseInt(item.purchase_warehouse, 10) })));
        alert("등록완료")
        window.location.href="/erp/purchase/list"
      };

  return (
    <>
        <Row className='justify-content-center'>
            <Col lg={7}>
                <h1>구매작성</h1>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col lg={2}>
                                <div>일자:</div>
                            </Col>
                            <Col >
                                <Form.Control type='date' value={master.purchase_date} name='purchase_date' onChange={onChageMaster} />
                            </Col>
                            <Col lg={2}>
                                거래처 : 
                            </Col>
                            <Col>
                                <Form.Select value={master.purchase_location} name='purchase_location' onChange={onChageMaster}  >
                                    <option>거래처를선택하세요</option>
                                    {VendorList && VendorList.map(ven=>
                                        <option key={ven.vendor_id} value={ven.vendor_id} >
                                            {ven.vendor_id}({ven.vendor_name})
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
                                <Form.Select value={master.purchase_employee} name='purchase_employee' onChange={onChageMaster}>
                                    <option >담당자를선택하세요</option>
                                    {memberList && memberList.map(mem=> mem.dept_name.includes("경영") &&
                                        <option key={mem.member_info_id} value={mem.member_info_id}>{mem.member_info_id}({mem.member_info_name})</option>
                                    )}
                                </Form.Select>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <div className='text-end'><Button className='mt-3' size='sm' onClick={onClickAdd}>+</Button></div>
                                
                                <Table>
                                    <thead>
                                        <tr>
                                            <td>품목코드</td>
                                            <td>품목명</td>
                                            <td>수량</td>
                                            <td>단가</td>
                                            <td>부가세</td>
                                            <td>총금액</td>
                                            <td>입고창고</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items && items.map((item, index)=>
                                            <tr>
                                                <td><ERPItemsModalPurcahse items={items} setItems={setItems} item_index={index} /></td>
                                                <td><Form.Control value={item.items_name}/> </td>
                                                <td><Form.Control value={item.purchase_qnt}  name="purchase_qnt" onChange={(e)=>onChangeItem(e, index)}/>
                                                </td>
                                                <td><Form.Control value={item.purchase_price} name="purchase_price" onChange={(e)=>onChangeItem(e, index)}/>
                                                </td>
                                                <td><Form.Control value={Math.ceil(`${item.purchase_price}` * 0.1) + "원"}/></td>
                                                <td><Form.Control value={Math.ceil(`${item.purchase_price}` * 1.1 * `${item.purchase_qnt}`) + "원"}/></td>
                                                <td>
                                                    <Form.Select value={item.purchase_warehouse}  name="purchase_warehouse" onChange={(e)=>onChangeItem(e, index)}>
                                                        <option>입고지점</option>
                                                        {warehouseList && warehouseList.map(ware=>
                                                            <option key={ware.warehouse_id} value={parseInt(ware.warehouse_id, 10)} >
                                                                {ware.warehouse_id}({ware.warehouse_name})
                                                            </option>
                                                        )}
                                                    </Form.Select>
                                                </td>
                                                <td><div className='text-end'><Button size='sm' onClick={()=>onClickDelete(item, index)}>ㅡ</Button></div></td>
                                            </tr>
                                        )}
                                    </tbody>
                                    
                                </Table>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Button className='me-3' onClick={onClickSaleInsert}>구매저장</Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default ERP_Purchase_InsertPage