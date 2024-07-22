import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import ERP_Client_ReadPage from './ERP_Client_ReadPage';

const ERP_Client_ListPage = () => {



    const [list, setList] = useState([]);
    
    const callAPI = async () => {
        
        const res = await axios.get(`/erp/client`)
        console.log(res.data);
        setList(res.data);

    }

    useEffect(()=>{
        callAPI();
    },[])


    const onClickClientInsert = (e) => {
        window.location.href="/erp/client/insert";
    }

    const onClickClientDelete = async (client) => {
        if(!window.confirm(`${client.client_id}를 삭제하시겠습니까?`)) return;
        const client_id = client.client_id;
        try {
            await axios.delete(`/erp/client/${client_id}`);
            callAPI(); // 성공적인 삭제 후 목록 새로 고침
            alert("거래처를 삭제하였습니다.");
          } catch (error) {
            console.error("Error deleting item:", error);
            alert("삭제에 실패하였습니다."); // 사용자에게 오류 알림
          }
          
    };



  return (
    <Row className='justify-content-center'>
        <h1>고객사리스트</h1>
        <div><Button onClick={onClickClientInsert}>고객등록</Button></div>
        <Col lg={5}>
            <Table>
                <thead>
                    <tr>
                        <td>코드</td>
                        <td>이름</td>
                        <td>담당직원</td>
                        <td>전화번호</td>
                        <td>삭제</td>
                    </tr>
                    
                </thead>
                <tbody>
                    {list && list.map(client=>
                        <tr>
                            <td><div style={{cursor: "pointer"}}><ERP_Client_ReadPage client={client}/></div></td>
                            <td>{client.client_name}</td>
                            <td>{client.client_employee}({client.member_info_name})</td>
                            <td>{client.client_phone}</td>
                            <td><Button onClick={()=>onClickClientDelete(client)}>삭제</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default ERP_Client_ListPage