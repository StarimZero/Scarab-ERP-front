import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import ERP_Sales_ReadPage from './ERP_Sales_ReadPage';
import moment from 'moment';

const ERP_Sales_ListPage = () => {


    const [list, setList] = useState([]);
    const [listInfo, setListInfo] = useState([]);

    const callAPI = async() => {
        const res = await axios.get("/erp/sales");
        console.log(res.data);
        setList(res.data);
    }

    const callAPIInfo = async() => {
        const res = await axios.get("/erp/sales/info");
        console.log(res.data);
        setListInfo(res.data);
    } 

    useEffect(()=>{
        callAPI();
        callAPIInfo();
    },[])

    const onClickItemDelete = async (sales) => {
        if(!window.confirm(`${sales.sales_id}를 삭제하시겠습니까?`)) return;
        const sales_id = sales.sales_id;
        try {
            await axios.delete(`/erp/sales/${sales_id}`);
            callAPI(); 
            alert("물품을 삭제하였습니다.");
          } catch {
            alert("판매물품이 존재합니다.."); 
          }
    };


    const onClickSaleInsert = (e) => {
        window.location.href="/erp/sales/insert";
    }

  return (
    <Row className='justify-content-center'>
    <h1>판매리스트</h1>
    <div><Button onClick={onClickSaleInsert}>판매입력하기</Button></div>
        <Col lg={5}>
            <Table>
                <thead>
                    <tr>
                        <td>판매코드</td>
                        <td>판매사원</td>
                        <td>판매일</td>
                        <td>삭제</td>
                    </tr>
                </thead>
                <tbody>
                    {list && list.map(sales=>
                        <tr>
                            <td><div style={{cursor: "pointer"}}><ERP_Sales_ReadPage sales={sales} /></div></td>
                            <td>{sales.sales_employee}</td>
                            <td>{moment(sales.sales_date).format('yy년MM월DD일')}</td>
                            <td><Button onClick={()=>onClickItemDelete(sales)}>삭제</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default ERP_Sales_ListPage