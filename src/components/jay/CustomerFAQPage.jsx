import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'
import Pagination from "react-js-pagination";
const CustomerBBSPage = () => {
    const [count,setCount] = useState(0);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(6);
    const [key, setKey] = useState();
    const [word,setWord] = useState();
    

    const callAPI = async()=>{
        const res = await axios.get(`/bbs/list?key=${key}&word=${word}&page=${page}&size=${size}`);
        // console.log(res.data);
        setList(res.data);
    }
    const callAPIlist = async()=>{
        const res = await axios.get('/bbs/list')
        console.log(res.data);
        setList();
    }

    useEffect(()=>{
        callAPIlist();
        callAPI();
    }, [page,key])
  return (
    <div>
        <div>
      <Row>
        <Col>
          <form>
            <InputGroup>    
              <Form.Select>
                <option value="empty_bbs_title">제목</option>
                <option>내용</option>
              </Form.Select>
              <Form.Control placeholder='검색어' />
              <Button type='submit'>검색</Button>
            </InputGroup>
          </form>
        </Col>
      </Row>

      </div>
      <Table>
        <thead>
            <tr>
                <th>상태</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회수</th>
            </tr>
        </thead>
        <tbody>
            
            <tr>
                <td>공지</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>

        </tbody>
    </Table>
    <Pagination
        activePage={page}
        itemsCountPerPage={size}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={(e)=>setPage(e)}/>
    </div>

    
  )
}

export default CustomerBBSPage