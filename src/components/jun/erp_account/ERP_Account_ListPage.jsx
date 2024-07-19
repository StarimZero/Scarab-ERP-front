import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Slider from "react-slick";
import ERP_Transaction_ListPage from '../erp_transaction/ERP_Transaction_ListPage';


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


const ERP_Account_ListPage = () => {

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

    useEffect(() => {
        callAccount();
    }, [accountNumber]);


    return (
        <div className='px-3'>
            <div className='mb-5'>
                <h2>자금현황</h2>
            </div>
            {accountNumber &&
                <Row className='account'>
                    <Slider {...settings}>
                        {accounts.map((account, index) =>
                            <Col key={account.account_number}>
                                <Card className='account-component me-2 text-center align-items-center'>
                                    <Card.Body>
                                        <img src="#" width='90%' />
                                        <div className='ellipsis'>통장 이름 : {account.account_name}</div>
                                        <div className='ellipsis'>상세 내용 : {account.account_detail}</div>
                                        <div>현재 자금 : {account.account_total}원</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Slider>
                    {accountNumber && <ERP_Transaction_ListPage account_number={accountNumber} />}
                </Row>
            }
        </div>
    )
}

export default ERP_Account_ListPage