import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import '../../starim/starim_common/paging.css';

const InventoryPage = () => {

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);
    const [key, setKey] = useState("");
    const [word, setWord] = useState("");
    const [list, setList] = useState([]);
    
    const callAPI = async() => {
        const res2 = await axios.get('/erp/inventory/listAllTotal');
        //console.log(res2.data);
        setCount(res2.data);
        const res = await axios.get(`/erp/inventory/listAll?page=${page}&size=${size}`);
        //console.log(res.data);
        setList(res.data);
        
    }
    useEffect(()=>{
        callAPI();
    },[page,size])

    const onClickMove = () => {
        window.location.href='/erp/inventory/tradelist'
    }
    const onClickMove2 = () => {
        window.location.href='/erp/inventory/warehouselist'
    }

    const onSubmit = (e) => {
        e.preventDefault();
        callAPI();
        setPage(1);
    }

  return (
    <>
    <Row className='justify-content-center'>
        <h1>재고리스트</h1>
        <h3 className="mb-2" onClick={()=>callAPI()} style={{cursor:'pointer'}}>전체물품목록</h3>
        <div>
            <Button className='mb-2' onClick={onClickMove}>전체거래내역</Button>
        </div>
        <div>
            <Button className='me-2' onClick={onClickMove2}>창고별물품목록</Button>
        </div>
        총 상품개수 : {count}
        <form>
            <InputGroup>
                <Form.select value={key} onChange={(e)=>setKey(e.target.value)}>
                    <option value="">코드</option>
                    <option value="">이름</option>
                    <option value="">타입</option>
                </Form.select>
            </InputGroup>
        </form>
    </Row>
    <Row className='justify-content-center'>
        <Col lg={10}>
            <Table>
                <thead className='text-center'>
                    <tr>
                        <td>코드</td>
                        <td>이름</td>
                        <td>사진</td>
                        <td>타입</td>
                        <td>재고확인</td>
                        <td>최근거래내역</td>
                    </tr>
                </thead>
                <tbody className='align-middle text-center'>
                    {list && list.map(inventory=>
                        <tr key={inventory.items_id}>
                            <td>{inventory.items_id}</td>
                            <td>{inventory.items_name}</td>
                            <td>
                                {inventory.items_photo ? 
                                        (<img src={`${process.env.PUBLIC_URL}/images/items/${inventory.items_id}.jpg`} 
                                        alt="물품사진" style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }} />)
                                        :
                                        (<h6>물품 사진이 없습니다.</h6>)
                                    }
                            </td>
                            <td>
                                {inventory.items_type === 0 ? "음료" : inventory.items_type === 1 ? "면" : inventory.items_type === 2 ? "스낵" : inventory.items_type === 3 ? "간편식" : inventory.items_type}
                            </td>
                            <td>
                                <Button>보기</Button>
                            </td>
                            <td>
                                <Button>보기</Button>
                            </td>
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

export default InventoryPage