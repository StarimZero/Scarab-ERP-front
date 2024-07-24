import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'

const WEB_BBSPage = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(5);
    const [size, setSize] = useState(1);
    const [count, setCount] = useState();
    const [checked, setChecked] = useState(0);
    

    const callAPI = async() =>{
        const res= await axios.get(`/bbs/list`);
        const data=res.data.map(bbs =>bbs && {...bbs , checked : false });
        console.log(res.data);
        setList(data);
    }

    useEffect(()=>{
        callAPI();
    }, [])

    const onClickAllChecked = (e)=>{
        
    }

    const onClickSingleChecked = (e)=>{
        
    }


    return (
        <div>
            <h1 className='text-center'>문의 게시판</h1>

            <Row>
                <Col>
                    <form>
                        <InputGroup>
                            <Form.Select>
                                <option>제목</option>
                                <option>내용</option>
                            </Form.Select>

                            <Form.Control

                            />
                            <Button>검색</Button>


                            <div>검색수:</div>
                        </InputGroup>
                    </form>
                </Col>
            </Row>


            <Table>
                <thead>


                    <tr >
                        <td ><input checked={false}
                            type='checkbox'
                        /></td>
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
                            <td ><input 
                            type='checkbox'checked={bbs.checked}
                        /></td>
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

        </div>
    )
}

export default WEB_BBSPage