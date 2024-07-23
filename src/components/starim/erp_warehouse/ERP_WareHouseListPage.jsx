import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import ERP_WareHouseReadPage from './ERP_WareHouseReadPage';

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
        if(!window.confirm(`${warehouse_id}를 삭제하시겠습니까?`)) return;
        axios.delete(`/erp/warehouse/${warehouse_id}`);
        callAPI();
        alert("창고를 삭제하였습니다.")
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