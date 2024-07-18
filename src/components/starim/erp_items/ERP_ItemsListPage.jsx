import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap'
import ERP_ItemsReadPage from './ERP_ItemsReadPage';
import Pagination from "react-js-pagination";
import '../starim_common/paging.css';


const ERP_ItemsListPage = () => {

    const [page, setPage] = useState(1);
    const [size] = useState(5);
    const [key, setKey] = useState("items_id");
    const [word, setWord] = useState("");
    const [count, setCount] = useState("0");


    const [file, setFile] = useState({
        name:"",
        byte:null
    });

    const [list, setList] = useState([]);

    const callAPI = async() => {
        const res = await axios.get(`/erp/items?key=${key}&word=${word}&page=${page}&size=${size}`);
        console.log(res.data);
        setList(res.data.documents);
        setCount(res.data.total);
        setFile({name:res.data.image, byte:null})

    }

    useEffect(()=>{
        callAPI();
    },[page])


    const onClickItemsInsert = (e) => {
        window.location.href="/erp/items/insert";
    }

    const onClickItemDelete = async (item) => {
        if(!window.confirm(`${item.items_id}를 삭제하시겠습니까?`)) return;
        const items_id = item.items_id;
        try {
            await axios.delete(`/erp/items/${items_id}`);
            callAPI(); 
            alert("물품을 삭제하였습니다.");
          } catch (error) {
            console.error("Error deleting item:", error);
            alert("삭제에 실패하였습니다."); 
          }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        callAPI();
        setPage(1);
    }



  return (
    <>
    <Row className='justify-content-center'>
        <Col lg={4}>
            <form onSubmit={onSubmit}>
                <InputGroup>
                    <Form.Select value={key} onChange={(e)=>setKey(e.target.value)}>
                        <option value="items_id">코드</option>
                        <option value="items_name">이름</option>
                        <option value="items_type">타입</option>
                    </Form.Select>
                    <FormControl placeholder='검색어를 입력하세요' value={word} onChange={(e)=>setWord(e.target.value)}/>
                    <Button type="submit" size="sm" variant='outline-primary'>검색</Button>
                </InputGroup>
            </form>
        </Col>
        <Col lg={2}>
            <div className='align-middle mt-2'>
                <span className='me-3'>검색수 : {count}</span>
            </div>
        </Col>
    </Row>
    <Row>
        <Col>
            <h1>아이템리스트</h1>
            <div><Button onClick={onClickItemsInsert}>아이템등록</Button></div>
        </Col>
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
                        <td>삭제</td>
                    </tr>
                </thead>
                <tbody className='align-middle text-center'>
                    {list && list.map(item=>
                        <tr>
                            <td><div style={{cursor: "pointer"}}><ERP_ItemsReadPage item={item} file={file} setFile={setFile}/></div></td>
                            <td>{item.items_name}</td>
                            <td><img src = {item.items_photo || "http://via.placeholder.com/50x50"}  width="20%"/></td>
                            <td>
                                {item.items_type === 0 ? "음료" : item.items_type === 1 ? "면" : item.items_type === 2 ? "스낵" : item.items_type === 3 ? "간편식" : item.items_type}
                            </td>
                            <td><Button variant='outline-danger' onClick={()=>onClickItemDelete(item)}>삭제</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Col>
    </Row>
    {count > size && 
        <Pagination
        activePage={page}
        itemsCountPerPage={size}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={(e)=>setPage(e)}/>
    } 
    </>
  )
  
}

export default ERP_ItemsListPage