import React from 'react'
import { Col, Row } from 'react-bootstrap'

const ERP_MessagePage = () => {
  return (
    <Row className='my-5'>
        <Col xs={3}>
            <div className='my-2'>
                <a href="/erp/message/insert">메신저작성</a>
            </div>
            <div className='my-2'>
                <a href="/erp/message/receive">받은메신저</a>
            </div>
            <div className='my-2'>
                <a href="/erp/message/send">보낸메신저</a>
            </div>
            <div className='my-2 '>
                <a href="/erp/message/delete">휴지통</a>
            </div>
        </Col>
    </Row>
  )
}

export default ERP_MessagePage