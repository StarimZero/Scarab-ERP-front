import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'
import Pagination from "react-js-pagination";  
    

const WEB_BBSPage = () => {
    const [list, setList] = useState([]);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);

    const [count, setCount] = useState(0);
    const [key, setKey] = useState('bbs_title');
    const [word, setWord] = useState('');

    

    const callAPI = async() =>{
        const res= await axios.get(`/bbs/list?key=${key}&word=${word}&page=${page}&size=${size}`);
        
        //console.log(res.data.list);
        setCount(res.data.total);
        setList(res.data.list);
    }

    useEffect(()=>{
        callAPI();
    }, [page, key])

 const onSubmit=(e)=>{
    e.preventDefault();
    callAPI();
 }

    return (
        <div>
            <h1 className='text-center'>문의 게시판</h1>
            <form onSubmit={onSubmit}>
                <Row>
                    <Col xs={6} md={5} lg={4}>
                    
                            <InputGroup>
                                <Form.Select value={key} onChange={(e)=>setKey(e.target.value)}>
                                    <option value="bbs_title">제목</option>
                                    <option value="bbs_content" >내용</option>
                                </Form.Select>

                                <Form.Control
                                value={word}  onChange={(e)=>setWord(e.target.value)}/>
                                <Button type='submit'>검색</Button>


                                <div>검색수:{count}</div>
                            </InputGroup>
                    
                    </Col>
                </Row>
            </form>

            <Table>
                <thead>


                    <tr >
                       
                        <th>카테고리</th>
                        <td>글번호</td>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>

                </thead>
                <tbody>
                    {list.map((bbs) => (
                        <tr >
                           
                            <td>{bbs.bbs_category}</td>
                            <td>{bbs.bbs_id}</td>
                           <td><a href={`/web/customer/bbs/read/${bbs.bbs_id}`}> {bbs.bbs_title}</a></td>
                            <td>{bbs.bbs_writer}</td>
                            <td>{bbs.bbs_regDate}</td>
                            <td>{bbs.bbs_viewcnt}</td>
                        </tr>
                     )) }
                </tbody>

            </Table>
         
            <div className='text-end'>

                <a href='/web/customer/bbs/insert'>
                    <Button>글쓰기</Button>
                
                </a>
                <Button>글삭제</Button>

            </div>
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
        </div>
    )
}

export default WEB_BBSPage