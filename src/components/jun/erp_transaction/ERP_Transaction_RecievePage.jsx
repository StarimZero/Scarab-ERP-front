import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Slider from 'react-slick';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ color: 'gray', fontSize: '2.5rem' }}
            onClick={onClick}>
            <BiChevronRight />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ color: 'gray', fontSize: '2.5rem' }}
            onClick={onClick}>
            <BiChevronLeft />
        </div>
    );
}


const ERP_Transaction_RecievePage = ({sales}) => {
    const [page, setPage] = useState(1);
    const [size] = useState(150);
    const [key, setKey] = useState("title");
    const [word, setWord] = useState("");

    const [master, setMasert] = useState({
        sales_id: sales.sales_id,
        sales_employee: sales.sales_employee,
        sales_location: sales.sales_location,
        sales_date: sales.sales_date,
    });

    const [items, setItems] = useState([{
        sales_info_id: "",
        sales_items_id: "",
        sales_qnt: "",
        sales_warehouse: "",
        sales_price: ""
    }]);

    // 금액에 천 단위 구분 기호를 추가하는 함수
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const { sales_employee, sales_location, sales_date, sales_id } = master;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 계좌 불러오기
    const [accounts, setAccounts] = useState([]);
    const [accountNumber, setAccountNumber] = useState('');
    const [index, setIndex] = useState(0);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        afterChange: index => {
            setAccountNumber(accounts[index].account_number);
            setIndex(index);
        }
    };

    const callAccount = async () => {
        const url = '/erp/account';
        const res = await axios.get(url);
        setAccounts(res.data);
        if (res.data.length > 0) {
            setAccountNumber(res.data[index].account_number);
        }
        // console.log(accountNumber);
    }

    // 거래처불러오기
    const [clientList, setClientList] = useState([]);
    const [warehouseList, setWarehouseList] = useState([]);
    const [memberList, setMemberList] = useState([]);

    const callClient = async () => {
        const res = await axios.get(`/erp/client`)
        //console.log(res.data);
        setClientList(res.data);
    }

    // 저장창고불러오기
    const callWarehouse = async () => {
        const res = await axios.get("/erp/warehouse");
        setWarehouseList(res.data);
    }

    // 담당자불러오기
    const callMember = async () => {
        const res = await axios.get(`/erp/member?key=${key}&word=${word}&page=${page}&size=${size}`)
        setMemberList(res.data.list);
    }

    // 아이템들불러오기
    const callItems = async () => {
        const res = await axios.get(`/erp/sales/info/${sales_id}`);
        // console.log(res.data);
        setItems(res.data);
    }


    useEffect(() => {
        callClient();
        callWarehouse();
        callMember();
        callItems();
        callAccount();
    }, [accountNumber]);

    const onClickRecieve = async () => {
        if (!accounts) {
            alert("송금할 계좌를 선택하세요.")
            return;
        }
        if (!window.confirm(`${sales_location}
            (${clientList.find(client => client.client_id === sales_location)?.client_name || ""})를 수령하시겠습니까?`))
            return;
        const totalAmount = Math.round(items.reduce((total, item) => total + (item.sales_price * item.sales_qnt * 1.1), 0));
        const transactionData = {
            account_number: accountNumber,
            transaction_deposit: totalAmount,
            sales_id,
            client_id: sales_location,
            sales_type: 1,
        }
        await axios.post(`/erp/transaction`, transactionData);
        alert("수령완료")
        handleClose();
        callItems();
    }

    return (
        <>
            <div onClick={handleShow}>
                <Button>상세보기</Button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{sales.sales_id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='account my-5'>
                        <Slider {...settings}>
                            {accounts.map((account, index) =>
                                <Col key={account.account_number}>
                                    <Card className='account-component me-2 text-center align-items-center'>
                                        <Card.Body>
                                            <img src="#" width='90%' />
                                            <div className='ellipsis'>통장 이름 : {account.account_name}</div>
                                            <div className='ellipsis'>상세 내용 : {account.account_detail}</div>
                                            <div>현재 자금 : {formatNumber(account.account_total)}원</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Slider>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>
                                    <Row>
                                        <Col lg={4}>
                                            <div>
                                                일자 : {new Date(sales_date).toISOString().substring(0, 10)}
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div>
                                                거래처 : {sales_location}({clientList.find(client => client.client_id === sales_location)?.client_name || ""})
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div>
                                                담당자 : {sales_employee}({memberList.find(mem => mem.member_info_id === sales_employee)?.member_info_name || ""})
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <td>품목코드</td>
                                                        <td>수량</td>
                                                        <td>단가</td>
                                                        <td>부가세</td>
                                                        <td>총금액</td>
                                                        <td>입고창고</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items && items.map((item) =>
                                                        <tr key={item.sales_items_id}>
                                                            <td>{item.sales_items_id}</td>
                                                            <td>{formatNumber(parseInt(item.sales_qnt))}</td>
                                                            <td>{formatNumber(item.sales_price)}</td>
                                                            <td>{formatNumber(Math.ceil(item.sales_price * 0.1))}원</td>
                                                            <td>{formatNumber(Math.ceil(item.sales_price * 1.1 * item.sales_qnt))}원</td>
                                                            <td>
                                                                {item.sales_warehouse}
                                                                ({warehouseList.find(ware => ware.warehouse_id === item.sales_warehouse)?.warehouse_name || ""})
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer>
                                    총 금액: {formatNumber(Math.round(items.reduce((total, item) => total + (item.sales_price * item.sales_qnt * 1.1), 0)))}원
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onClickRecieve}>수령하기</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ERP_Transaction_RecievePage