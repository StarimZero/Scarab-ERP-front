import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'

const ERP_ItemsInsertPage = () => {

    const [items_id, setItems_id] = useState("");
    const [items_name, setItems_name] = useState("");
    const [items_photo, setItems_photo] = useState("");
    const [items_type, setItems_type] = useState("");
    const refFile = useRef();

    const [image, setImage] = useState({
        fileName : "",
        file : null
    })
    const {file, fileName} = image;
    

    const photoStyle ={
        borderRadius : "10px",
        cursor: "pointer",
        border : "10px groove gray"
    }




    const onChangeFile = (e) => {
        const newImage = {
          fileName: URL.createObjectURL(e.target.files[0]),
          file: e.target.files[0],
        };
        setImage(newImage);
        setItems_photo(fileName); // 선택된 이미지 파일 이름 저장
      };
    






    const onClicItemsInsert =  async () => {
        if(items_id==="" || items_name==="" || items_type===""){
            alert("모든정보를 입력하세요")
            return;
        }
        if(!window.confirm("물품를 등록하시겠습니까?")) return;

        const data = new FormData();
        data.append("file", file);
        console.log({items_id, items_name, items_photo, items_type});
        await axios.post(`/erp/items`, {items_id, items_name, items_photo, items_type})
        alert("아이템등록완료")
        window.location.href="/erp/items/list"

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
                        <Form.Control value={items_id}   placeholder='coke_1.5L' onChange={(e)=>setItems_id(e.target.value)}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>물품이름</InputGroup.Text>
                        <Form.Control value={items_name} placeholder='물품이름을 입력하세요' onChange={(e)=>setItems_name(e.target.value)}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text className='me-5'>물품사진</InputGroup.Text>
                        <img src={fileName || "http://via.placeholder.com/50x50"} style={photoStyle} width="50%" onClick={()=>refFile.current.click()} onChange={(e)=>setItems_photo(e.target.value)} />
                        <input ref={refFile} type='file' onChange={onChangeFile} style={{display:"none"}}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>물품타입</InputGroup.Text>
                        <Form.Select value={items_type}  onChange={(e)=>setItems_type(e.target.value)}>
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
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    </Row>
  )
}

export default ERP_ItemsInsertPage