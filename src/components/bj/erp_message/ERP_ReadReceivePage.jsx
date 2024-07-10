import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { Card } from 'react-bootstrap';

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
      <a href='/erp/message/receive'>
      <IoIosArrowBack /> 받은메일함
      </a>
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
        {list.message_senddate}
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