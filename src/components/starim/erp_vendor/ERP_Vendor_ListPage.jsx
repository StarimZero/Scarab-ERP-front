import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import ERP_Vendor_ReadPage from './ERP_Vendor_ReadPage';

const ERP_Vendor_ListPage = () => {


    const [list, setList] = useState([]);
    
    const callAPI = async () => {
        
        const res = await axios.get(`/erp/vendor`)
        //console.log(res.data);
        setList(res.data);

    }

    useEffect(()=>{
        callAPI();
    },[])


    const onClickVendorInsert = (e) => {
        window.location.href="/erp/vendor/insert";
    }

    const onClickVendorDelete = async (vendor) => {
        if(!window.confirm(`${vendor.vendor_id}를 삭제하시겠습니까?`)) return;
        const vendor_id = vendor.vendor_id;
        try {
            await axios.delete(`/erp/vendor/${vendor_id}`);
            callAPI(); // 성공적인 삭제 후 목록 새로 고침
            alert("거래처를 삭제하였습니다.");
          } catch (error) {
            console.error("Error deleting item:", error);
            alert("삭제에 실패하였습니다."); // 사용자에게 오류 알림
          }
          
    };



  return (
    <Row className='justify-content-center'>
        <h1>구매처관리</h1>
        <div><Button onClick={onClickVendorInsert}>구매처등록</Button></div>
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
                    {list && list.map(vendor=>
                        <tr>
                            <td><div style={{cursor: "pointer"}}><ERP_Vendor_ReadPage vendor={vendor}/></div></td>
                            <td>{vendor.vendor_name}</td>
                            <td>{vendor.vendor_employee}</td>
                            <td>{vendor.vendor_phone}</td>
                            <td><Button onClick={()=>onClickVendorDelete(vendor)}>삭제</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Col>
    </Row>
  )
}


export default ERP_Vendor_ListPage