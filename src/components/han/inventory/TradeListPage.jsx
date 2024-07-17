import { useScrollTrigger } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import '../../starim/starim_common/paging.css';

const TradeListPage = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);

    const callAPI = async()=> {
        const res2 = await axios.get("/erp/inventory/listAlltradeTotal")
        //console.log(res2.data);
        setCount(res2.data);
        const res = await axios.get(`/erp/inventory/listAlltrade?page=${page}&size=${size}`)
        //console.log(res.data);
        setList(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[page,size])

    const onClickMove = () => {
        window.location.href='/erp/inventory/itemlist'
    }
    const onClickMove2 = () => {
        window.location.href='/erp/inventory/warehouselist'
    }

    const formatCurrency = (amount) => {
        return amount.toLocaleString();
    }

  return (
    <Row>
        <h1>재고리스트</h1>
        <h3 className="mb-2" onClick={()=>callAPI()} style={{cursor:'pointer'}}>전체거래내역</h3>
        <div>
            <Button className='mb-2' onClick={onClickMove}>전체물품목록</Button>
        </div>
        <div>
            <Button className='me-2' onClick={onClickMove2}>창고별물품목록</Button>
        </div>
        <Col lg={10}>
            <Table>
                <thead className='text-center'>
                    <tr>
                        <td>날짜</td>
                        <td>거래분류</td>
                        <td>물품</td>
                        <td>가격</td>
                        <td>수량</td>
                        <td>총액</td>
                        <td>창고</td>
                    </tr>
                </thead>
                <tbody className='align-middle text-center'>
                    {list && list.map(tradelist=>
                        <tr key={tradelist.trade_id}>
                            <td>{tradelist.date.split('-').slice(0,3).join('-')}</td>
                            <td>
                                {tradelist.type==='1' ? "입고" : "출고"}
                            </td>
                            <td>{tradelist.item_name}</td>
                            <td>{formatCurrency(tradelist.price)}</td>
                            <td>{formatCurrency(tradelist.qnt)}</td>
                            <td>{formatCurrency(tradelist.price * tradelist.qnt)}</td>
                            <td>{tradelist.warehouse_name}</td>
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

export default TradeListPage