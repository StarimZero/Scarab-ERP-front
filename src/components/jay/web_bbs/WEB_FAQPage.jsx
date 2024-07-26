import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Accordion, Col, Container, Row, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const WEB_FAQPage = () => {
    const [list, setList] =useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);

    const [count, setCount] = useState(0);
    const [key, setKey] = useState('');
    const [word, setWord] = useState('');

    const callAPI =async()=>{
        const res= await axios.get(`/faq/list?key=${key}&word=${word}&size=${size}&page=${page}`);
        console.log(res.data.FAQlist);
        console.log(res.data.total);
        setList(res.data.FAQlist);
        setCount(res.data.total);

    }

    useEffect(()=>{
        callAPI();
    }, [page,size,key,word]);

  return (
    <div className='text-center'>
        <h1>맨날 묻는 질문 (FAQ)</h1>
        
        <Row>
            <Col>
            <Accordion>
                        {list.map((faq, index) => (
                            <Accordion.Item eventKey={index.toString()} key={faq.faq_id}>
                                <Accordion.Header>[Q]  {faq.faq_title}</Accordion.Header>
                                <Accordion.Body>{faq.faq_contents}</Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
            </Col>
        </Row>
        
    </div>
    
  )
}

export default WEB_FAQPage