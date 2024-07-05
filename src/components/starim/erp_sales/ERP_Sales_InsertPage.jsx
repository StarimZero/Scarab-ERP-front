import React from 'react'
import { Button, Card, Col,  Form,  Row, Table } from 'react-bootstrap'

const ERP_Sales_InsertPage = () => {
  return (
    <>
        <Row className='justify-content-center'>
            <Col lg={7}>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col lg={2}>
                                <div>일자:</div>
                            </Col>
                            <Col >
                                <Form.Control type='date'/>
                            </Col>
                            <Col lg={2}>
                                거래처 : 
                            </Col>
                            <Col>
                                <Form.Select>
                                    <option>거래처를선택하세요</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={2}>
                                <div>담당자:</div>
                            </Col>
                            <Col>
                                <Form.Select>
                                    <option>담당자를선택하세요</option>
                                </Form.Select>
                            </Col>
                            <Col lg={2}>
                                <div>출하창고 : </div>
                            </Col>
                            <Col>
                                <Form.Select>
                                    <option>출하지점을선택하세요</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={2}>
                                <div>거래유형:</div>
                            </Col>
                            <Col>
                                <Form.Control value={"부가세율적용"}/>
                            </Col>
                            <Col lg={2}>
                                <div>통화</div>
                            </Col>
                            <Col>
                            <Form.Control value={"내자"} />
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Table>
                                    <tr>
                                        <td>품목코드</td>
                                        <td>품목명</td>
                                        <td>수량</td>
                                        <td>단가</td>
                                        <td>공급가액</td>
                                        <td>부가세</td>
                                    </tr>
                                    <tr>
                                        <td><Form.Control /></td>
                                        <td><Form.Control /></td>
                                        <td><Form.Control /></td>
                                        <td><Form.Control /></td>
                                        <td><Form.Control /></td>
                                        <td><Form.Control /></td>
                                    </tr>
                                </Table>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Button className='me-3'>저장하기</Button>
                        <Button>다시작성</Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default ERP_Sales_InsertPage