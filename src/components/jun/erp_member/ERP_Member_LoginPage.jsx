import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

const ERP_Member_LoginPage = () => {
    return (
        <Row className="justify-content-center">
            <Col className="col-xl-10 col-lg-12 col-md-9">
                <Card className="o-hidden border-0 shadow-lg my-5">
                    <Card.Body className="p-0">
                        <Row>
                            <Col lg={6}>
                                <img src="/images/login.jpg" width="100%" alt="Login" />
                            </Col>
                            <Col lg={6}>
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Login</h1>
                                    </div>
                                    <Form>
                                        <Form.Group className="mb-2">
                                            <Form.Control name="uid" placeholder="ID" />
                                        </Form.Group>
                                        <Form.Group className="mb-2">
                                            <Form.Control type="password" name="upass" placeholder="Password" />
                                        </Form.Group>
                                        <Button className="btn btn-dark w-100" type="submit">Login</Button>
                                        <hr />
                                    </Form>
                                    <div className="text-center">
                                        <Button href="#" className="btn btn-google btn-user btn-block me-3">
                                            <i className="fab fa-google fa-fw"></i> Login with Google
                                        </Button>
                                        <Button href="#" className="btn btn-facebook btn-user btn-block">
                                            <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                        </Button>
                                    </div>
                                    <hr />
                                    <div className="text-center">
                                        <a className="small" href="#">Forgot Password?</a>
                                    </div>
                                    <div className="text-center">
                                        <a className="small" href="#">Create an Account!</a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default ERP_Member_LoginPage