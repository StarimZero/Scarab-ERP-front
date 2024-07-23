import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, InputGroup, Row } from 'react-bootstrap';
import { Form, useParams } from 'react-router-dom';

const WEB_BBSReadPage = () => {
  const {bbs_id} = useParams();
  const [form, setForm] = useState([]);
  // console.log({bbs_id})
 
  


  const callAPI = async () => {
    const res= await axios.get(`/bbs/read/${bbs_id}`);
    console.log(res.data);
    setForm(res.data);
  }


  useEffect(() => {
    callAPI();
  },[]);

  return (
    <div>
      <h1 className='text-center'>읽기 페이지</h1>
     
     <Row>
      <Col>
        <Card>
          <Card.Header>
            <h5>{form.bbs_title}</h5>
          </Card.Header>
          <Card.Body>
          <h5>{form.bbs_content}</h5>
          </Card.Body>
        </Card>
      </Col>
     </Row>
    </div>
  )
}

export default WEB_BBSReadPage