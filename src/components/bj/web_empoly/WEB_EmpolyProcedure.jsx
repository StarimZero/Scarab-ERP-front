import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { PiNotePencilDuotone } from "react-icons/pi";
import { FaRegHandshake } from "react-icons/fa6";
import { RiUserVoiceLine } from "react-icons/ri";
import { LuCheckCircle } from "react-icons/lu";
import { TbPointFilled } from "react-icons/tb";

const WEB_EmpolyProcedure = () => {
  return (
    <div>
        <h3 className='text-center mb-4'>채용절차</h3>
        <hr/>
   
    <Container className='employment-procedure'>
      


      <Row className='text-center mt-4'>
        <Col lg={3}>
          <Card >
            <Card.Body>
              <div className='procedure-step'>
                <span className='step-number'>01</span>
                <div className='step-icon'>
                    <PiNotePencilDuotone size={32}/>
                </div>
                <h5>서류전형</h5>
                <p>온라인 입사지원</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={1} className='arrow-container'>
          <span className='arrow'>&rarr;</span>
        </Col>
        <Col lg={3}>
          <Card >
            <Card.Body>
              <div className='procedure-step'>
                <span className='step-number'>02</span>
                <div className='step-icon'>
                    <RiUserVoiceLine size={32}/>
                </div>
                <h5>임원면접</h5>
                <p>인사담당/팀장 주관</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={1} className='arrow-container'>
          <span className='arrow'>&rarr;</span>
        </Col>
        <Col lg={3}>
          <Card>
            <Card.Body>
              <div className='procedure-step'>
                <span className='step-number'>03</span>
                <div className='step-icon'>
                    <FaRegHandshake size={32}/>
                </div>
                <h5>합격통보</h5>
                <p>합격통보</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className='mb-2'>
        <LuCheckCircle color='blue' size={32}/> 서류제출
      </div>

      <Card>
        <Card.Body>
        <ul>
            <li><TbPointFilled /> 입사지원서(자유양식): 채용 포털 사이트로 이력서 제출</li>
            <li><TbPointFilled /> 졸업(재학)증명서, 성적증명서, 주민등록본, 경력증명서(경력직원에 한에)</li>
            <li><TbPointFilled /> 각종 면허 및 자격증 사본, 외국어 공인 성적 증명서</li>
        </ul>
        </Card.Body>
      </Card>

              
      <div className='mb-2'>
        <LuCheckCircle color='blue' size={32}/> 기타문의
      </div>

      <Card>


        <Card.Body>
        <ul>
            <li><TbPointFilled /> 연락처 : 02-1241-1234 쇠똥구리㈜ 인사채용 담당자</li>
            <li><TbPointFilled /> 메일 : dongfood.com</li>
        </ul>
        </Card.Body>
      </Card>
    </Container>


    </div>
  );
}

export default WEB_EmpolyProcedure;
