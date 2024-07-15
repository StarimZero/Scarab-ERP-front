import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const WEB_CompanyViewPage = () => {
  return (
    <div>
    <Container className="company-view mt-5">
      <Row className="text-center mb-3">
        <Col>
          <h2>회사개요</h2>
          <hr />
        </Col>
      </Row>
      <Row className="company-banner align-items-center">
        <Col>
          <div className="blue-content">
            <h3>쇠똥구리</h3>
            <p>똥을 한땀 한땀 처굴려서 만든 음식.............................................맛있어요</p>
          </div>
        </Col>
      </Row>
      <Row className="company-info mt-4 align-items-center">
        <Col xs={2} className="text-center">
          <img src='/images/menupage/logo.png' width='200px' alt='Company Logo'/>
        </Col>
        <Col xs={10}>
          <ul className="company-info-list">
            <li>
              <strong>설립년도:</strong> 1999년
            </li>
            <li>
              <strong>대표자:</strong> 윤석열
            </li>
            <li>
              <strong>전체 직원수:</strong> 쇠똥구리 베트남 3,500명, 인도 3,000명
            </li>
            <li>
              <strong>연매출:</strong> 23년 기준 2400만원
            </li>
          </ul>
        </Col>
      </Row>
    </Container>

    <br/><br/><br/><br/><br/><br/>
    <div className="mt-5">
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <img src='/images/menupage/f1.png' alt='Company Research' className="img-fluid  compnay-view-img" />
          </Col>
          <Col xs={12} md={6}>
            <div>
              <h2>최고의 신선도</h2>
              <p>세계인의 식탁에 건강과 행복을 제공하기 위해 쇠똥구리는 오늘도 꾸준히 월급루팡합니다.</p>

            </div>
          </Col>
        </Row>
      </div>





      <div className="mt-5">
        <Row className="align-items-center">
          <Col xs={12} md={6}>
          <div className='ms-5'>
              <h2>최고의 신선도</h2>
              <p>세계인의 식탁에 건강과 행복을 제공하기 위해 쇠똥구리는 오늘도 꾸준히 월급루팡합니다.</p>

            </div>
          </Col>
          <Col xs={12} md={6}>
     
            <img src='/images/menupage/f1.png' alt='Company Research' className="img-fluid  compnay-view-img" />
          </Col>
        </Row>
      </div>
    </div>
    //이거 복붙해서 쭈욱전개할 사진 구해요
  );
}

export default WEB_CompanyViewPage;