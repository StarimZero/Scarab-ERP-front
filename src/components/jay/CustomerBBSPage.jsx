import React from 'react'
import { Col, Form, InputGroup, Row } from 'react-bootstrap'

const CustomerBBSPage = () => {
  return (
    <div>
      <Row>
        <Col>
          <form>
            <InputGroup>
              <Form.Select>
                <option >제목</option>
                <option>내용</option>
              </Form.Select>
            </InputGroup>
          </form>
        </Col>
      </Row>
    </div>
  )
}

export default CustomerBBSPage