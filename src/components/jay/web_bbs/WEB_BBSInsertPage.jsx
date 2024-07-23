import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const WEB_BBSInsertPage = () => {
    
    const [form,setForm] = useState({
        bbs_writer:sessionStorage.getItem('visitor_id'),
        bbs_title:'',
        bbs_category:'',
        bbs_content:'',
    })

    const { bbs_writer,bbs_title,bbs_category,bbs_content}= form;

        // const onSubmit = async()=>{
        //     e.preventDefault();
        //     await axios.post('web/customer/bbs/insert',form);
        //     alert("드디어 게시판 등록완료");
        //     window.location.href='/'
        // }여기서부터시작 


//문의 제안 칭찬/불만

  return (
    <div>
        <h1 className='text-center'>글쓰기 페이지</h1>
            <form>
                    <Form.Select
                    name='bbs_category' value={bbs_category}
                    >
                    <option>문의</option>
                    <option>제안</option>
                    <option>칭찬/불만</option>
                    </Form.Select>
                    <Form.Control
                    name='bbs_title' value={bbs_title}
                    placeholder='제목을 입력하세요'
                    
                    />
                    <Form.Control
                    name='bbs_content' value={bbs_content}
                    placeholder='내용을 입력하세요'
                    as="textarea"
                    rows={10}
                    /> 
                    <Button>작성완료</Button>
                    <Button>취소</Button>
                   
            </form>
    </div>
  )
}

export default WEB_BBSInsertPage