import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap'

const ERPNoticeInsertPage = () => {


    const [form, setForm] = useState({
        notice_writer : sessionStorage.getItem("member_info_id"),
        notice_title : "",
        notice_contents :  ""
    });
    
    const {notice_writer :  notice_title, notice_contents} = form;




    const onChangeForm = (e) =>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const onReset = () =>{
        setForm({...form, notice_title:"", notice_contents:""});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!window.confirm("글을 등록하시겠습니까?")) return;
        await axios.post(`/erp/notice`, form);
        alert("게시글 등록완료");
        window.location.href="/erp/notice/list";
    }



  return (
    <Row className='justify-content-center'>
        <h1 className='text-center'>글쓰기페이지 </h1>
        <Col lg={8}>
            <form onReset={onReset} onSubmit={onSubmit}>
                <Form.Control placeholder='제목을 입력하세요' className='mb-2' name="notice_title" value={notice_title}  onChange={onChangeForm} />
                <Form.Control as="textarea" rows={15} placeholder='내용을 입력하세요' name='notice_contents' value={notice_contents} onChange={onChangeForm} />
                <div className='text-end my-2'>
                    <Button className='me-2' size='sm' variant='outline-danger' type='reset'>다시쓰기</Button>
                    <Button size='sm' variant='outline-warning' type='submit'>등록하기</Button>
                </div>
            </form>
        </Col>
    </Row>
  )
}

export default ERPNoticeInsertPage