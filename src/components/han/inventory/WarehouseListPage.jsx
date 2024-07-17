import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import '../../starim/starim_common/paging.css';

const WarehouseListPage = () => {

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);
    const [list,setList] = useState([]);
    const [warehouse, setWarehouse] = useState(1);

    const callAPI = async() => {
        console.log("공장코드는 ", warehouse);
        const res2 = await axios.get(`/erp/inventory/listByWarehouseTotal/${warehouse}`)
        console.log("전체물품종류는 1", res2)
        console.log("전체물품종류는 ", res2.data)
        setCount(res2.data);
        const res = await axios.get(`/erp/inventory/listByWarehouse/${warehouse}?page=${page}&size=${size}`)
        console.log(res.data);
        setList(res.data);
    }
    useEffect(()=>{
        callAPI();
    },[page, warehouse])

    const onClickMove = () => {
        window.location.href='/erp/inventory/itemlist'
    }
    const onClickMove2 = () => {
        window.location.href='/erp/inventory/tradelist'
    }

    const onClickWarehouse1 = () => {
        setWarehouse(1);
        setPage(1)
    }
    const onClickWarehouse2 = () => {
        setWarehouse(3);
        setPage(1)
    }


  return (
    <Row>
        <h1>재고리스트</h1>
        <h3>창고별물품목록</h3>
        <div>
            <Button className='mb-2' onClick={onClickMove}>전체물품목록</Button>
        </div>
        <div>
            <Button className='mb-2' onClick={onClickMove2}>전체거래내역</Button>
        </div>
        <div>
            <Button className='me-2' onClick={onClickWarehouse1}>안성1공장</Button>
            <Button className='me-2' onClick={onClickWarehouse2}>안성2공장</Button>
            
        </div>
        <Col lg={10}>
            <Table>
                <thead className='text-center'>
                    <tr>
                        <td>창고</td>
                        <td>코드</td>
                        <td>이름</td>
                        <td>사진</td>
                        <td>타입</td>
                        <td>재고</td>
                        <td>상태</td>
                        <td>최근거래내역</td>
                    </tr>
                </thead>
                <tbody className='align-middle text-center'>
                    {list && list.map(warehouse=>
                        <tr key={warehouse.items_id}>
                            <td>{warehouse.warehouse_name}</td>
                            <td>{warehouse.items_id}</td>
                            <td>{warehouse.items_name}</td>
                            <td>
                                {warehouse.items_photo ?
                                    (<img src={`${process.env.PUBLIC_URL}/images/items/${warehouse.items_id}.jpg`} 
                                    alt="물품사진" style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }} />)
                                    :
                                    (<h6>물품 사진이 없습니다.</h6>)
                                }
                            </td>
                            <td>
                                {warehouse.items_type===0? "음료" : warehouse.items_type===1? "면" : warehouse.items_type===2? "스낵" : warehouse.items_type===3? "간편식" : warehouse.items_type}
                            </td>
                            <td>{warehouse.rest_qnt}</td>
                            <td style={{color:warehouse.rest_qnt<0 ? 'red' : warehouse.rest_qnt<200 ? 'orange' : 'inherit'}}>
                                {warehouse.rest_qnt<0 && "즉시발주필요"}
                                {warehouse.rest_qnt>=0 && warehouse.rest_qnt<200 && "예비발주필요"}
                                {warehouse.rest_qnt>200 && ""}
                            </td>
                            <td><Button>보기</Button></td>
                        </tr>
                        )}
                </tbody>
            </Table>
            {count > size &&
        <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={ (e)=>setPage(e) }/>
      }
        </Col>
    </Row>
  )
}

export default WarehouseListPage