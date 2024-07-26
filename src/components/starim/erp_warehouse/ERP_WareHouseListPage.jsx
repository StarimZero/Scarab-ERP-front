import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import ERP_WareHouseReadPage from './ERP_WareHouseReadPage';
import Swal from 'sweetalert2';

const ERP_WareHouseListPage = () => {
    

    const [list, setList] = useState();

    const callAPI = async() => {
        const res = await axios.get("/erp/warehouse");
        setList(res.data);

    }

    useEffect(()=>{
        callAPI();
    },[])

    const onClickWareHouseInsert = (e) => {
        window.location.href="/erp/warehouse/insert";
    }

    const onClickWareHouseDelete = (warehouse_id) => {
        Swal.fire({
            title: `${warehouse_id}를 삭제하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "등록"
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                axios.delete(`/erp/warehouse/${warehouse_id}`);
                Swal.fire({
                    title: "성공",
                    text: "창고정보를 삭제하였습니다.",
                    icon: "success"
                });
                window.location.href="/erp/notice/list";
            }
        });
    }


  return (
    <Row className='justify-content-center'>
        <div><Button onClick={onClickWareHouseInsert}>창고등록</Button></div>
        <Col lg={5}>
            <Table>
                <thead>
                    <tr>
                        <td>코드</td>
                        <td>창고이름</td>
                        <td>창고주소</td>
                        <td>삭제하기</td>
                        <td>수정하기</td>
                    </tr>
                </thead>
                <tbody>
                {list && list.map(warehouse=>
                        <tr key={warehouse.warehouse_id}>
                            <td>{warehouse.warehouse_id}</td>
                            <td>{warehouse.warehouse_name}</td>
                            <td>{warehouse.warehouse_address}</td>
                            <td><Button variant='outline-danger' onClick={()=>onClickWareHouseDelete(warehouse.warehouse_id)}>삭제</Button></td>
                            <td><ERP_WareHouseReadPage warehouse={warehouse}/></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default ERP_WareHouseListPage