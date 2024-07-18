import React from 'react'
import { Row, Col } from 'react-bootstrap'

const WEB_CompanyHistoryPage = () => {
  return (
    <div>
      <div className="mt-5">
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <img src='/images/menupage/r1.png' alt='Company Research' className="img-fluid  compnay-history-img" />
          </Col>
          <Col xs={12} md={6}>
            <div>
              <h1 className='com-history-header'>2023</h1>
              <p>12월) 쇠똥구리회사 상장</p>
              <p>10월) 쇠똥구리라면 개발완료</p>
              <p>4월) 쇠똥구리회사 노조 무력제압</p>
            </div>
          </Col>
        </Row>
      </div>


      <div className="mt-5">
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <img src='/images/menupage/ra1.png' alt='Company Research' className="img-fluid  compnay-history-img" />
          </Col>
          <Col xs={12} md={6}>
            <div>
              <h1 className='com-history-header'>2022</h1>
              <p>12월) 삼향회사 상장</p>
              <p>10월) 삼향라면 개발완료</p>
              <p>4월) 삼향라면 노조 무력제압</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default WEB_CompanyHistoryPage