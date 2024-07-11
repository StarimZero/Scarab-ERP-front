import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'

const ERP_ItemsInsertPage = () => {


    const [file, setFile] = useState({
        name:"",
        byte:""
    });

    const [form, setForm] = useState({
        items_id : "",
        items_name : "",
        items_photo : "",
        items_type : ""
    });
    const {items_id, items_name, items_photo, items_type} = form;

    const refFile = useRef();


    

    const photoStyle ={
        borderRadius : "10px",
        cursor: "pointer",
        border : "10px groove gray"
    }




    const onChangeFile = (e) => {
        setFile({
            name:URL.createObjectURL(e.target.files[0]),
            byte:e.target.files[0]
        });
        setForm({ ...form, items_photo: file.byte });
    }
    






    const onClicItemsInsert =  async () => {
        if(items_id==="" || items_name==="" || items_type===""){
            alert("모든정보를 입력하세요")
            return;
        }
        if(!window.confirm("물품를 등록하시겠습니까?")) return;

        const data = new FormData();
        data.append("file", file);
        console.log(form);
        await axios.post(`/erp/items`, form)
        alert("아이템등록완료")
        window.location.href="/erp/items/list"

    }

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
      };


    const onClickInsertTogether = async() => {
        const formData = new FormData();
        formData.append("byte", file.name);
        Object.keys(form).forEach(key=>{
            formData.append(key, form[key]);
            console.log(key, form[key]);
        });
        await axios.post('/erp/items/2', formData);
        alert("등록완료")
    }




  return (
    <Row className='justify-content-center'>
        <Col lg={3}>
            <Card>
                <Card.Header>
                    <h1>물품등록</h1>
                </Card.Header>
                <Card.Body>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>물품코드</InputGroup.Text>
                        <Form.Control value={items_id}  name='items_id' placeholder='coke_1.5L' onChange={onChangeForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>물품이름</InputGroup.Text>
                        <Form.Control value={items_name} name='items_name' placeholder='물품이름을 입력하세요' onChange={onChangeForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text className='me-5'>물품사진</InputGroup.Text>
                        <img src={file.name || items_photo || "http://via.placeholder.com/50x50"} style={photoStyle} width="50%" onClick={()=>refFile.current.click()} onChange={onChangeForm} />
                        <input ref={refFile} type='file' onChange={onChangeFile} style={{display:"none"}}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>물품타입</InputGroup.Text>
                        <Form.Select value={items_type}  name='items_type' onChange={onChangeForm}>
                            <option>선택하세요</option>
                            <option value={parseInt(0)}>음료</option>
                            <option value={parseInt(1)}>면</option>
                            <option value={parseInt(2)}>스낵</option>
                            <option value={parseInt(3)}>간편식</option>
                        </Form.Select>
                    </InputGroup>
                </Card.Body>
                <Card.Footer>
                    <div>
                        <Button onClick={onClicItemsInsert}>등록</Button>
                        <Button onClick={onClickInsertTogether}>사진과함께등록</Button>
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    </Row>
  )
}

export default ERP_ItemsInsertPage