import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import Pagination from 'react-js-pagination';

const ERP_Transaction_ListPage = ({ account_number }) => {

    const [transactions, setTransactions] = useState([]);
    const [key, setKey] = useState('');
    const [word, setWord] = useState('');
    const [selectedDate, setSelectedDate] = useState();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(0);

    const callTransaction = async () => {
        let url = `/erp/transaction?page=${page}&size=${size}&key=${key}&account_number=${account_number}`;
        if (key !== 'transaction_date') {
            url += `&word=${word}`;
        }
        if (selectedDate && key === 'transaction_date') {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            url += `&transaction_date=${formattedDate}`;
            console.log(formattedDate);
        }
        const res = await axios.get(url);
        setTransactions(res.data.list);
        setTotal(res.data.total);
        console.log(res.data.list);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        callTransaction();
    }

    useEffect(() => {
        callTransaction();
    }, [account_number, page])

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>거래목록</h1>
            <Row className='mb-3'>
                <Col className='col-5'>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Col className='col-4 me-3'>
                                <Form.Select value={key} onChange={(e) => setKey(e.target.value)}>
                                    <option value="">검색어 선택</option>
                                    <option value="transaction_date">거래날짜</option>
                                    <option value="client_id">판매처</option>
                                    <option value="vendor_id">구매처</option>
                                    <option value="member_info_key">급여사원</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <InputGroup>
                                    {key === '' && (
                                        <></>
                                    )}
                                    {key === 'transaction_date' && (
                                        <>
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={date => setSelectedDate(date)}
                                                dateFormat="yyyy-MM-dd"
                                                className="form-control"
                                                placeholderText="날짜 선택"
                                                isClearable
                                            />
                                            <Button variant='dark' type='submit'>검색</Button>
                                        </>
                                    )}
                                    {key !== '' && key !== 'transaction_date' && (
                                        <>
                                            <Form.Control placeholder='검색어' value={word} onChange={(e) => setWord(e.target.value)} />
                                            <Button variant='dark' type='submit'>검색</Button>
                                        </>
                                    )}
                                </InputGroup>
                            </Col>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='text-end mt-2'>
                    검색수 : {total}건
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover className="my-4">
                    <thead>
                        <tr>
                            <th>거래날짜</th>
                            <th>내용</th>
                            <th>거래금액</th>
                            <th>남은금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction =>
                            <tr key={transaction.transaction_id}>
                                <td>{transaction.transaction_date}</td>
                                <td>{transaction.member_info_key && transaction.member_info_key}
                                    {transaction.client_id !== 0 && transaction.client_id}
                                    {transaction.vendor_id !== 0 && transaction.vendor_id}
                                </td>
                                <td>
                                    {transaction.transaction_deposit !==0 && `+${transaction.transaction_deposit}`}
                                    {transaction.transaction_withdraw !==0 && `-${transaction.transaction_withdraw}`}
                                </td>
                                <td>-</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                {total > size &&
                    <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={ (e)=>setPage(e) }/>
                }
            </Row>
        </div>
    )
}

export default ERP_Transaction_ListPage