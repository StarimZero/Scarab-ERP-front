import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ERP_Purchase_ReadPage from './ERP_Purchase_ReadPage';
import { Button, Col, Row, Table } from 'react-bootstrap';
import moment from 'moment';

const ERP_Purchase_ListPage = () => {

    const [list, setList] = useState([]);

    const callAPI = async() => {
        const res = await axios.get("/erp/purchase/list.json");
        //console.log(res.data);
        setList(res.data);

    }

    useEffect(()=>{
        callAPI();
    },[])

    const onClickPurchaseDelete = async (purchase) => {
        if(!window.confirm(`${purchase.purchase_id}를 삭제하시겠습니까?`)) return;
        const purchase_id = purchase.purchase_id;
        try {
            await axios.delete(`/erp/purchase/${purchase_id}`);
            callAPI(); // 성공적인 삭제 후 목록 새로 고침
            alert("구매목록을 삭제하였습니다.");
          } catch (error) {
            console.error("Error deleting item:", error);
            alert("삭제에 실패하였습니다."); // 사용자에게 오류 알림
          }
    };


    const onClickPurchaseInsert = (e) => {
        window.location.href="/erp/purchase/insert";
    }

  return (
    <Row className='justify-content-center'>
    <h1>구매리스트</h1>
    <div><Button onClick={onClickPurchaseInsert}>구매입력하기</Button></div>
        <Col lg={5}>
            <Table>
                <thead>
                    <tr>
                        <td>코드</td>
                        <td>이름</td>
                        <td>판매일</td>
                        <td>판매물건</td>
                        <td>삭제</td>
                    </tr>
                </thead>
                <tbody>
                    {list && list.map(purchase=>
                        <tr>
                            <td><div style={{cursor: "pointer"}}><ERP_Purchase_ReadPage purchase={purchase}/></div></td>
                            <td>{purchase.purchase_employee}</td>
                            <td>{moment(purchase.purchase_date).format('yy년MM월DD일')}</td>
                            <td>{purchase.purchase_items_id}</td>
                            <td><Button onClick={()=>onClickPurchaseDelete(purchase)}>삭제</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default ERP_Purchase_ListPage