import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { IoMdMail } from "react-icons/io";
import { IoMdMailOpen } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Pagination from 'react-js-pagination';


const ERP_SendMessagePage = () => {
  const [checked, setChecked] = useState(0);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [count, setCount] = useState(0);
  

  
  const uid=sessionStorage.getItem('member_info_id');


  const callAPI = async() => {
    const res=await axios.get(`/erp/sendmessage/list/${uid}?page=${page}&size=${size}`);
    const data= res.data.list.map(msg=>msg && {...msg, checked:false});
    console.log(data);
    setMessages(data);
    setCount(res.data.total);
  }

  const onAllChecked = (e) => {
    const data=messages.map(msg=>msg && {...msg, checked:e.target.checked});
    setMessages(data);
  }

  const onSingleChecked = (e, message_id) => {
    const data=messages.map(msg=>msg.message_id===message_id ? {...msg, checked:e.target.checked}:msg);
    setMessages(data);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  useEffect(()=> {
    let cnt=0;
    messages.forEach(msg=>msg.checked && cnt++);
    setChecked(cnt);
  }, [messages]);

  const onDelete = () => {
    if(checked===0){
      alert("삭제할 목록을 선택하세요!");
      return;
    }

    if(window.confirm("휴지통으로 이동하실래요?")) {
      
    let cnt=0;
    messages.forEach(async(msg)=>{
      if(msg.checked) {
        await axios.post(`/erp/sendmessage/update/send/state/${msg.message_id}`);
        cnt++;
      }
      if(cnt===checked) callAPI();
    });

  }
};

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
              <input onChange={onAllChecked}
                checked={messages.length> 0 && checked===messages.length} type='checkbox'/>
              <Button onClick={onDelete} className='ms-2 btn-sm' variant='outline-danger'>삭제</Button>
            </td>
            <td>mid</td>
            <td>읽음</td>
            <td>받은사람</td>
            <td>제목</td>
            <td>발신일</td>
          </tr>
        </thead>

        <tbody>

          {messages.map((msg)=> (
                    <tr key={msg.message_id}>

                      <td>
                        <input onChange={(e)=>onSingleChecked(e, msg.message_id)} checked={msg.checked} type='checkbox'/>
                      </td>

                      <td>{msg.message_id}</td>

                      <td>
                          {msg.message_readdate ? <IoMdMailOpen  color='deepskyblue'/> : <IoMdMail color='deepskyblue'/>}
                      </td>

                      <td>{msg.message_receiver}</td>

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

       {count > size &&
        <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={ (e)=>setPage(e) }/>
        }
          

    </div>
      
  )
}

export default ERP_SendMessagePage