import React from 'react'
import Web_bottomPage from './Web_bottomPage'
import { Col, Row } from 'react-bootstrap'


const Web_HomePage = () => {
    return (
      <>
        <Row style={{height:"45rem"}}>
          <Col>
            <div className="web-background-image-container ">
            
            </div>
          </Col>
            </Row>
            
            <Row>
                <Col>
                    <Web_bottomPage/>
                </Col>
          </Row>
       </> 
      )
    }
    

export default Web_HomePage