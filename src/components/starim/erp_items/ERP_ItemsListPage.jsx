import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'

const ERP_ItemsListPage = () => {


    const [list, setList] = useState();

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
                    </tr>
                </thead>
                <tbody>
                {list && list.map(item=>
                        <tr>
                            <td>{item.items_id}</td>
                            <td>{item.items_name}</td>
                            <td>{item.items_photo}</td>
                            <td>{item.items_tpye}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default ERP_ItemsListPage