import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import ERP_Transaction_RecievePage from './ERP_Transaction_RecievePage';

const ERP_Transaction_Sales = () => {
    const [page, setPage] = useState(1);
    const [size] = useState(5);
    const [key, setKey] = useState("sales_id");
    const [word, setWord] = useState("");
    const [count, setCount] = useState("0");
    const [list, setList] = useState([]);
    const [listInfo, setListInfo] = useState([]);

    const callAPI = async () => {
        const res = await axios.get(`/erp/sales?key=${key}&word=${word}&page=${page}&size=${size}`);
        // console.log(res.data);
        setList(res.data.documents);
        setCount(res.data.total);
    }

    const callAPIInfo = async () => {
        const res = await axios.get("/erp/sales/info");
        // console.log(res.data);
        setListInfo(res.data);
    }

    useEffect(() => {
        callAPI();
        callAPIInfo();
    }, [])

    const onClickItemPay = async (sales) => {
        if (!window.confirm(`${sales.sales_id}를 송금하시겠습니까?`)) return;
        const sales_id = sales.sales_id;
        try {
            await axios.delete(`/erp/sales/${sales_id}`);
            callAPI();
            alert("물품을 삭제하였습니다.");
        } catch {
            alert("판매물품이 존재합니다..");
        }
    };


    const onClickSaleInsert = (e) => {
        window.location.href = "/erp/sales/insert";
    }

    const onSubmit = (e) => {
        e.preventDefault();
        callAPI();
        setPage(1);
    }


    return (
        <>
            <Row className='justify-content-center'>
                <div className='mb-4'>
                    <h3>판매리스트</h3>
                </div>
                <Row className='mb-4'>
                    <Col lg={6}>
                        <form onSubmit={onSubmit}>
                            <InputGroup>
                                <Form.Select value={key} onChange={(e) => setKey(e.target.value)}>
                                    <option value="sales_id">코드</option>
                                    <option value="sales_employee">아이디</option>
                                    <option value="member_info_name">이름</option>
                                    <option value="sales_date">날짜</option>
                                </Form.Select>
                                <FormControl placeholder='검색어를 입력하세요' value={word} onChange={(e) => setWord(e.target.value)} />
                                <Button type="submit" size="sm" variant='outline-primary'>검색</Button>
                            </InputGroup>
                        </form>
                    </Col>
                </Row>
                <Col lg={12}>
                    <Table>
                        <thead>
                            <tr>
                                <td>판매코드</td>
                                <td>판매사원</td>
                                <td>판매일</td>
                                <td>상세보기</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.map(sales =>
                                sales.sales_type === 0 && (
                                    <tr key={sales.sales_id}>
                                        <td>{sales.sales_id}</td>
                                        <td>{sales.sales_employee}({sales.member_info_name})</td>
                                        <td>{moment(sales.sales_date).format('yy년MM월DD일')}</td>
                                        <td><ERP_Transaction_RecievePage sales={sales} /></td>
                                    </tr>
                                )
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
                    onChange={(e) => setPage(e)} />
            }
        </>
    )
}

export default ERP_Transaction_Sales