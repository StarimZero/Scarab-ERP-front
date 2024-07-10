import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { IoMdMail } from "react-icons/io";
import { IoMdMailOpen } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


const ERP_SendMessagePage = () => {

  const [messages, setMessages] = useState([]);
  const uid=sessionStorage.getItem('member_info_id');

  const callAPI = async() => {
    const res=await axios.get(`/erp/sendmessage/list.json/${uid}`);
    console.log(res.data);
    setMessages(res.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  return (
    <div>
      <a href='/erp/message'>
      <IoIosArrowBack /> 메신저
      </a>
        <div>보낸메일함</div>
       <hr/>
       <Table >
        <thead>
         
          <tr>
            <td>
              <input checked={false} type='checkbox'/>
              <Button className='ms-2 btn-sm' variant='outline-danger'>삭제</Button>
            </td>
            <td>mid</td>
            <td>읽음</td>
            <td>보낸사람</td>
            <td>제목</td>
            <td>발신일</td>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg)=> (
                    <tr key={msg.message_id}>
                      <td><input checked={false} type='checkbox'/></td>

                      <td>{msg.message_id}</td>

                      <td>
                          {msg.message_readdate ? <IoMdMailOpen  color='deepskyblue'/> : <IoMdMail color='deepskyblue'/>}
                      </td>

                      <td>{msg.message_sender}</td>

                      <td>
                            <span>
                                <a href={`/erp/message/send/${msg.message_id}`}>{msg.message_title}</a>
                            </span>
                      </td>
                      
                      <td>{msg.message_senddate}</td>
                    </tr>
          ))}

        </tbody>
       </Table>
          

    </div>
      
  )
}

export default ERP_SendMessagePage