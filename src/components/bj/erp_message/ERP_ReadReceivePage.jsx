import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { Card, Col, Row } from 'react-bootstrap';
import moment from 'moment';

const ERP_ReadReceivePage = () => {
  const {message_id} = useParams();
  const [list, setList] = useState([]);

  const callAPI = async() => {
      const res= await axios.get(`/erp/receivemessage/read/${message_id}`)
      console.log(res.data);
      setList(res.data);
  }


  useEffect(()=>{
    callAPI();
  }, []);
  

  return (
    <div>
        <Row className="mb-3">
            <Col className="d-flex align-items-center">
            <a href='/erp/message/receive' className="d-flex align-items-center">
            <IoIosArrowBack /> <span className="ms-2">받은메일함</span>
            </a>
            <a href='/erp/message/insert'>
            <span className="ms-2">메신저보내기</span>
            </a>
            </Col>
        </Row>

      <hr/>
      <h3>
        {list.message_title}
      </h3>
      <div>
       보낸사람: {list.message_sender}
      </div>
      <div className='mt-1'>
       받은사람: {list.message_receiver}
      </div>
      <div className='mt-2' style={{fontSize:'10px'}}>
      {moment(list.message_senddate).format('yy년MM월DD일 HH시mm분')}
      </div>
      <hr/>
      <Card>
        <Card.Body>
          {list.message_content}
        </Card.Body>
      </Card>
    </div>
  )
}

export default ERP_ReadReceivePage