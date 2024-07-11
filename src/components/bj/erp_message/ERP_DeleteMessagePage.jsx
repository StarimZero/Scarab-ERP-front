import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { IoIosArrowBack } from "react-icons/io";

const ERP_DeleteMessagePage = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [checked, setChecked] = useState(0);


    const [message, setMessage] = useState([]);
 

    const uid= sessionStorage.getItem('member_info_id');

    const callAPI = async () => {
        const res= await axios.get(`/erp/receivemessage/deletelist/${uid}?page=${page}&size=${size}`);
      

        const data=res.data.deleteList.map(msg=>msg && {...msg, checked:false});
        console.log(data);
        setMessage(data);
    }

    
  const onAllChecked = (e) => {
    const data=message.map(msg=>msg && {...msg, checked:e.target.checked});
    setMessage(data);
  }

  const onSingleChecked = (e, message_id) => {
    const data=message.map(msg=>msg.message_id===message_id ? {...msg, checked:e.target.checked}:msg);
    setMessage(data);
  }


    useEffect(()=>{
        callAPI();
    }, []);

    useEffect(()=>{
        let cnt=0;
        message.forEach(msg=>msg.checked && cnt++);
        setChecked(cnt);
      }, [message]);

      const onReset = () => {
        if(checked===0) {
            alert("복원 시킬 메신저를 선택하세요!");
            return;
        }

        if(window.confirm("복원 하시겠습니까?")) {
      
            let cnt=0;
            message.forEach(async(msg)=>{
              if(msg.checked) {
                await axios.post(`/erp/receivemessage/reset/state/${msg.message_id}`);
                cnt++;
              }
              if(cnt===checked) callAPI();
            });
        
          }
        };

        const onDelete = () => {
            if(checked===0) {
                alert("삭제할 메신저를 선택하세요!");
                return;
            }

            if(window.confirm("영구삭제 하시겠습니까?")) {
      
                let cnt=0;
                message.forEach(async(msg)=>{
                  if(msg.checked) {
                    await axios.post(`/erp/receivemessage/delete/${msg.message_id}`);
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
        <div className='mt-2'>휴지통</div>
        <hr/>
        <Table>
            <thead>
                <tr>
                    <td>
                        <input onChange={onAllChecked}
                          checked={message.length> 0 && checked===message.length}  type='checkbox'/>
                        <Button onClick={onDelete} className='ms-2 btn-sm' variant='outline-danger'>영구삭제</Button>
                        <Button onClick={onReset} className='ms-2 btn-sm' variant='outline-success'>복구</Button>
                    </td>
                    <td>mid</td>
                    <td>보낸사람</td>
                    <td>제목</td>
                    <td>발신일</td>
                </tr>
            </thead>
            <tbody>
                {message.map(msg=>
                 <tr key={msg.message}> 
                    <td>
                        <input onChange={(e)=>onSingleChecked(e, msg.message_id)}
                         checked={msg.checked}   type='checkbox'/>
                    </td>
                    <td>{msg.message_id}</td>
                    <td>{msg.message_sender}</td>
                    <td>{msg.message_title}</td>
                    <td>{msg.message_senddate}</td>
                </tr>
                    
                )}
               
            </tbody>

        </Table>
    </div>
  )
}

export default ERP_DeleteMessagePage