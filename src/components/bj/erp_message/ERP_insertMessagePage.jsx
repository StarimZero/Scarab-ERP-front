import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { IoIosArrowBack } from "react-icons/io";
import ERP_ModalInsertListPage from './ERP_ModalInsertListPage';

const ERP_insertMessagePage = () => {
  const [members, setMembers] = useState([]);
  const [page, setPage]=useState(1);
  const [size, setSize]=useState(50);

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [receiver, setReceiver] = useState('');
  const [receiverName, setReceiverName] = useState('');

  const callAPI = async () => {
      const res = await axios.get(`/erp/member?page=${page}&size=${size}`);
      console.log(res.data.list);
      setMembers(res.data.list);
  };

  useEffect(() => {
    callAPI();
  }, []);

  const onSendMsg = async () => {
    if (title === '') {
      alert('제목을 입력하세요');
      return;
    }

    try {
      await axios.post('/erp/receivemessage/insert', {
        message_sender: sessionStorage.getItem('member_info_id'),
        message_receiver: receiver,
        message_title: title,
        message_content: content
      });

      alert('메세지 전송 완료');
      window.location.href = '/erp/message';

    } catch (error) {
      console.error('뭔지는 몰라도 못보냄:', error);
      alert('메세지 전송 실패');
    }
  };

  const onClickModal = (id, name) => {
    setReceiver(id);
    setReceiverName(name);
  };

  return (
    <div>
      <div className="mb-4">메신저 쓰기</div>
      <a href='/erp/message'>
        <IoIosArrowBack /> 메신저
      </a>
      <hr/>
      <div className="mb-2">
        <Button className="btn-sm" variant="outline-primary" onClick={onSendMsg}>
          보내기
        </Button>
      </div>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1">받는 사람:</Form.Label>
          <Col sm="9" lg={8} md={6} >
            <Form.Control
              readOnly
              value={receiverName}
              placeholder="주소록에서 선택하세요"/>
           
          </Col>
          <Col lg={3} md={4}>
          <ERP_ModalInsertListPage onSelect={onClickModal} />
          </Col>
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2"
            rows={1}
            style={{ width: '90%' }}
            placeholder="제목"/>

          <Form.Control
            value={content}
            onChange={(e) => setContent(e.target.value)}
            as="textarea"
            rows={10}
            style={{ width: '90%' }}
            placeholder="내용"/>
            
        </Form.Group>
      </Form>
    </div>
  );
};

export default ERP_insertMessagePage;
