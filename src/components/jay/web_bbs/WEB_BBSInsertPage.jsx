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

        const onSubmit = async(e)=>{
            e.preventDefault();
            if(bbs_title ===''){
            alert("제목을 반드시 적어주세요");
            return;
            }
           
            await axios.post('/bbs/insert', form);
            alert("드디어 게시판 등록완료");
            window.location.href='/web/customer/bbs';
       

        };
    
const onChangeForm = (e) =>{
    setForm({...form, [e.target.name]:e.target.value});
}

const onChangeReset = (e)=>{
    setForm({...form, bbs_title:'',bbs_category:'', bbs_content:'',})
}

        

//문의 제안 칭찬/불만

  return (
    <div>
        <h1 className='text-center'>글쓰기 페이지</h1>
            <form onSubmit={onSubmit} onReset={onChangeReset}>
                    <Form.Select
                    name='bbs_category' value={bbs_category} onChange={onChangeForm}
                    >
                    <option>문의</option>
                    <option>제안</option>
                    <option>칭찬/불만</option>
                    </Form.Select>
                    <Form.Control
                    name='bbs_title' value={bbs_title}  onChange={onChangeForm}
                    placeholder='제목을 입력하세요'
                    
                    />
                    <Form.Control
                    name='bbs_content' value={bbs_content} onChange={onChangeForm}
                    placeholder='내용을 입력하세요'
                    as="textarea"
                    rows={10}
                    /> 
                    <Button type='submit'>작성완료</Button>
                    <Button type='reset'>취소</Button>
                   
            </form>
    </div>
  )
}

export default WEB_BBSInsertPage