import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { IoIosArrowBack } from "react-icons/io";

const ERP_insertMessagePage = () => {
  const [members, setMembers] = useState([]);


  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [receiver, setReceiver] = useState('');

  const callAPI = async () => {
    try {
      const res = await axios.get('/erp/member?page=1&size=100');
      console.log(res.data.list);
      setMembers(res.data.list);

    } catch (error) {
      console.error('Error fetching members:', error);
    }

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

  return (
    <div>
      <div className=" mb-4">메신저 쓰기</div>
      <a href='/erp/message'>
            <IoIosArrowBack /> 메신저
        </a>
      <hr/>
      <div className=" mb-2">

        <Button className="btn-sm" variant="outline-primary" onClick={onSendMsg}>
          보내기
        </Button>
      </div>

      <form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1">받는 사람:</Form.Label>

          <Col sm="9">

            <Form.Select value={receiver} onChange={(e) => setReceiver(e.target.value)}>

              <option value="">선택하세요</option>

              {members && members.map(re => (

                <option key={re.member_info_id} value={re.member_info_id}>
                  {re.member_info_name} ({re.member_info_id})
                </option>

              ))}
            </Form.Select>

          </Col>


        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2"
            rows={1}
            style={{ width: '90%' }}
            as="textarea"
            placeholder="제목"/>

          <Form.Control
            value={content}
            onChange={(e) => setContent(e.target.value)}
            as="textarea"
            rows={10}
            style={{ width: '90%' }}
            placeholder="내용"/>


        </Form.Group>
      </form>
    </div>
  );
};

export default ERP_insertMessagePage;
