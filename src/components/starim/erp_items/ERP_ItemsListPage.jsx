import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import ERP_ItemsReadPage from './ERP_ItemsReadPage';


const ERP_ItemsListPage = () => {


    const [list, setList] = useState([]);

    const callAPI = async() => {
        const res = await axios.get("/erp/items/list.json");
        console.log(res.data);
        setList(res.data);

    }

    useEffect(()=>{
        callAPI();
    },[])


    const onClickWareItemsInsert = (e) => {
        window.location.href="/erp/items/insert";
    }

    const onClickItemDelete = async (item) => {
        if(!window.confirm(`${item.items_id}를 삭제하시겠습니까?`)) return;
        const items_id = item.items_id;
        try {
            await axios.delete(`/erp/items/${items_id}`);
            callAPI(); // 성공적인 삭제 후 목록 새로 고침
            alert("물품을 삭제하였습니다.");
          } catch (error) {
            console.error("Error deleting item:", error);
            alert("삭제에 실패하였습니다."); // 사용자에게 오류 알림
          }
    };



  return (
    <Row className='justify-content-center'>
        <h1>아이템리스트</h1>
        <div><Button onClick={onClickWareItemsInsert}>아이템등록</Button></div>
        <Col lg={5}>
            <Table>
                <thead>
                    <tr>
                        <td>코드</td>
                        <td>이름</td>
                        <td>사진</td>
                        <td>타입</td>
                        <td>삭제</td>
                    </tr>
                </thead>
                <tbody>
                    {list && list.map(item=>
                        <tr>
                            <td><div style={{cursor: "pointer"}}><ERP_ItemsReadPage item={item} /></div></td>
                            <td>{item.items_name}</td>
                            <td><img src = {item.items_photo || "http://via.placeholder.com/50x50"} /></td>
                            <td>
                                {item.items_type === 0 ? "음료" : item.items_type === 1 ? "면" : item.items_type === 2 ? "스낵" : item.items_type === 3 ? "간편식" : item.items_type}
                            </td>
                            <td><Button onClick={()=>onClickItemDelete(item)}>삭제</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default ERP_ItemsListPage