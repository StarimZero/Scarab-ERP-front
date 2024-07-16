import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col,  Form,  Row, Table } from 'react-bootstrap'
import ERP_Items_Modal from '../starim_common/ERP_Items_Modal';

const ERP_Sales_InsertPage = () => {

    const today = new Date().toISOString().slice(0, 10);
    
    const [page] = useState(1);
    const [size] = useState(5);
    const [key] = useState("title");
    const [word] = useState("");

    const [items, setItems] = useState([{
        sales_items_id:'',
        sales_qnt : 0,
        sales_warehouse : "",
        sales_price : 0,
        sales_employee : "",
        sales_location : "",
        sales_date : ""
    }]);



    
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


    
    
    const onClickSave =  async () => {
        if(items.sales_employee===""){
            alert("모든정보를 입력하세요")
            return;
        }
        if(!window.confirm("판매를 등록하시겠습니까?")) return;

        await axios.post(`/erp/sales`, items)
        alert("판매등록완료")
        window.location.href="/erp/sales/list"
    }




    const onClickAdd = () => {
        const item={
            sales_items_id:'',
            sales_qnt : 0,
            sales_warehouse : "",
            sales_price : 0,
            sales_employee : "",
            sales_location : "",
            sales_date : "",
        };
        setItems(items.concat(item))
    }
    const onClickDelete = (item, index) => {
        setItems(items.filter((items, idx) => idx !== index));
        console.log(index);
    };
    
      
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    const handleEmployeeChange = (event) => {
      setSelectedEmployee(event.target.value);
      // items 배열의 모든 항목의 sales_employee 값을 selectedEmployee로 업데이트
      const newItems = items.map(item => ({
        ...item,
        sales_employee: event.target.value,
      }));
      setItems(newItems);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
              // items 배열의 모든 항목의 sales_employee 값을 selectedEmployee로 업데이트
      const newItems = items.map(item => ({
        ...item,
        sales_date: event.target.value,
      }));
      setItems(newItems);
      };

      const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
      // items 배열의 모든 항목의 sales_employee 값을 selectedEmployee로 업데이트
      const newItems = items.map(item => ({
        ...item,
        sales_location: event.target.value,
      }));
      setItems(newItems);
      };

      const handleInputChange = (event, index, field) => {
        const newItems = [...items];
        let newValue = event.target.value;
    
        // 숫자 형태의 필드인 경우 정수로 변환
        if (field === 'sales_qnt' || field === 'sales_price') {
            newValue = parseInt(newValue, 10);
    
            // 입력 값이 숫자가 아닌 경우 처리 (예: 알림 표시, 기본값 설정 등)
            if (isNaN(newValue)) {
                alert('숫자만 입력해주세요.');
                return;
            }
        }
    
        newItems[index][field] = newValue;
        setItems(newItems);
    };

    const onClickSaleInsert = async () => {
        if (!window.confirm("판매를 등록하시겠습니까?")) return;
      
        // items 배열의 각 항목에 대한 axios.post 요청을 Promise 객체로 만들기
        const promises = items.map(item => {
            console.log(item);
          return axios.post('/erp/sales', item);
        });
      
        // 모든 요청을 병렬적으로 실행하고 결과를 기다리기
        try {
          const responses = await Promise.all(promises);
          console.log('모든 판매 등록 완료:', responses);
          window.location.href = '/erp/sales/list';
        } catch (error) {
          console.error('판매 등록 중 오류 발생:', error);
        }
      };




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
                                <Form.Control type='date' value={selectedDate} onChange={handleDateChange} />
                            </Col>
                            <Col lg={2}>
                                거래처 : 
                            </Col>
                            <Col>
                                <Form.Select value={selectedLocation} onChange={handleLocationChange}  >
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
                                <Form.Select value={selectedEmployee} onChange={handleEmployeeChange}>
                                    <option >담당자를선택하세요</option>
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
                                <div className='text-end'><Button className='mt-3' onClick={onClickAdd}>추가</Button></div>
                                
                                <Table>
                                    <thead>
                                        <tr>
                                            <td>품목코드</td>
                                            <td>품목명</td>
                                            <td>수량</td>
                                            <td>단가</td>
                                            <td>부가세</td>
                                            <td>총금액</td>
                                            <td>출하창고</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items && items.map((item, index)=>
                                            <tr>
                                                <td><ERP_Items_Modal items={items} setItems={setItems} item_index={index} /></td>
                                                <td><Form.Control value={item.items_name}/> </td>
                                                <td><Form.Control value={item.sales_qnt} onChange={(e) => handleInputChange(e, index, 'sales_qnt')} />
                                                </td>
                                                <td><Form.Control value={item.sales_price} onChange={(e) => handleInputChange(e, index, 'sales_price')} />
                                                </td>
                                                <td><Form.Control value={Math.ceil(`${item.sales_price}` * 0.1) + "원"}/></td>
                                                <td><Form.Control value={Math.ceil(`${item.sales_price}` * 1.1 * `${item.sales_qnt}`) + "원"}/></td>
                                                <td>
                                                    <Form.Select value={item.sales_warehouse}  onChange={(e) => handleInputChange(e, index, 'sales_warehouse')}>
                                                        <option>출하지점</option>
                                                        {warehouseList && warehouseList.map(ware=>
                                                            <option key={ware.warehouse_id} >
                                                                {ware.warehouse_id}
                                                            </option>
                                                        )}
                                                    </Form.Select>
                                                </td>
                                                <td><div className='text-end'><Button className='mt-3' onClick={()=>onClickDelete(item, index)}>삭제</Button></div></td>
                                            </tr>
                                        )}
                                    </tbody>
                                    
                                </Table>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Button className='me-3' onClick={onClickSaleInsert}>테이블저장하기</Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default ERP_Sales_InsertPage