import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import '../../starim/starim_common/paging.css';

const WarehouseListPage = () => {

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);
    const [key, setKey] = useState("");
    const [word, setWord] = useState("");
    const [list,setList] = useState([]);
    const [warehouse, setWarehouse] = useState(6);
    const [isSearch, setIsSearch] = useState(false);

    const callAPI = async() => {
        const res = await axios.get(`/erp/inventory/listByWarehouse/${warehouse}?key=${key}&word=${word}&page=${page}&size=${size}`)
        //console.log(res.data);
        setCount(res.data.count);
        setList(res.data.documents);
        setIsSearch(key === "" && word === "");
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
        setWarehouse(6);
        setKey("")
        setWord("")
        setPage(1)
    }
    const onClickWarehouse2 = () => {
        setWarehouse(7);
        setKey("")
        setWord("")
        setPage(1)
    }
    const onClickWarehouse3 = () => {
        setWarehouse(8);
        setKey("")
        setWord("")
        setPage(1)
    }
    const onClickWarehouse4 = () => {
        setWarehouse(9);
        setKey("")
        setWord("")
        setPage(1)
    }
    const onClickWarehouse5 = () => {
        setWarehouse(10);
        setKey("")
        setWord("")
        setPage(1)
    }
    const onClickWarehouse6 = () => {
        setWarehouse(11);
        setKey("")
        setWord("")
        setPage(1)
    }
    const onClickWarehouse7 = () => {
        setWarehouse(12);
        setKey("")
        setWord("")
        setPage(1)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        callAPI();
        setPage(1);
    }

  return (
    <>
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
            <Button className='me-2 mb-2' onClick={onClickWarehouse1}>동부</Button>
            <Button className='me-2 mb-2' onClick={onClickWarehouse2}>파주</Button>
            <Button className='me-2 mb-2' onClick={onClickWarehouse3}>대구</Button>
            <Button className='me-2 mb-2' onClick={onClickWarehouse4}>순천</Button>
            <Button className='me-2 mb-2' onClick={onClickWarehouse5}>창원</Button>
            <Button className='me-2 mb-2' onClick={onClickWarehouse6}>남부</Button>
            <Button className='me-2 mb-2' onClick={onClickWarehouse7}>인천</Button>
        </div>
        <div className='mb-2'>
            <Col lg={3}>
                <form onSubmit={onSubmit} className='mb-2'>
                    <InputGroup>
                        <Form.Select value={key} onChange={(e)=>setKey(e.target.value)} style={{width:'30%'}}>
                            <option value="items_id">코드</option>
                            <option value="items_name">이름</option>
                            <option value="items_type">타입</option>
                        </Form.Select>
                        <FormControl placeholder='검색어를 입력하세요' value={word}
                            onChange={(e)=>setWord(e.target.value)} style={{width:'55%'}}/>
                        <Button type="submit" style={{width:'15%'}}>검색</Button>
                    </InputGroup>
                </form>
            </Col>
            {isSearch ? ("전체상품종류 : " + count + " 개") : ("검색결과 : " + count + " 개")}
        </div>
    </Row>
    <Row>
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
    </>
  )
}

export default WarehouseListPage