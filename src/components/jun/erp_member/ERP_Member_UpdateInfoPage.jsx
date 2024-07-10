import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import AddressModal from '../../../common/AddressModal';
import { FaUser } from "react-icons/fa6";

const ERP_Member_UpdateInfoPage = () => {
    const member_info_id = sessionStorage.getItem('member_info_id');
    const member_info_key = sessionStorage.getItem('member_info_key');
    const [form, setForm] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const { dept_name, member_info_name, member_info_pass, member_info_job, member_info_hiredate, member_info_resident,
        member_info_phone, member_info_email, member_info_address1, member_info_address2, member_info_account } = form;
    const [file, setFile] = useState({});
    const { fileBytes, fileName } = file;
    const refFile = useRef(null);

    const style = {
        color:'gray',
        fontSize:'3rem',
        cursor: 'pointer',
        width: '100px',
        height: '100px'
    }

    const callMember = async () => {
        const url = `/erp/member/${member_info_id}`;
        const res = await axios.get(url);
        setForm(res.data);
    }

    const onChangeFile = (e) => {
        setFile({
            fileBytes: e.target.files[0],
            fileName: URL.createObjectURL(e.target.files[0])
        });
    }

    const onChangeForm = (e) => {
        let { name, value } = e.target;
        if (name === 'member_info_phone') {
            value = value.replace(/[^0-9]/g, '');
            if (value.length > 12) {
                value = value.slice(0, 12);
            }
            if (value.length > 3) {
                value = value.slice(0, 3) + '-' + value.slice(3, 12); // 3자리 이후에 '-' 추가
            }
            if (value.length > 8) {
                value = value.slice(0, 8) + '-' + value.slice(8, 12); // 8자리 이후에 '-' 추가
            }
        }
        setForm({ ...form, [name]: value });
        setFormErrors({ ...formErrors, [name]: '' });
    }

    const validateForm = () => {
        const errors = {};
        if (!member_info_id) errors.member_info_id = 'ID를 입력해야 합니다.';
        if (!member_info_pass) errors.member_info_pass = '패스워드를 입력해야 합니다.';
        return errors;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // 사진 업로드
            
            await axios.put('/erp/member/info', { form });
            window.location.href = '/erp/member/mypage';
        } else {
            setFormErrors(errors);
        }
    }

    useEffect(() => {
        callMember();
    }, [])

    return (
        <Row className="justify-content-center readPage">
            <Col className="col-xl-10 col-lg-12 col-md-9">
                <Card className="o-hidden border-0 shadow-lg my-5">
                    <Card.Body className="p-0">
                        <Row>
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">기본 정보 수정</h1>
                                </div>
                                <form onSubmit={onSubmit}>
                                    <InputGroup className='mb-3'>
                                        {!fileName && <FaUser style={style} onClick={() => refFile.current.click()} />}
                                        {fileName && <img src={fileName} onClick={() => refFile.current.click()} style={style} />}
                                        <Form.Control type="file" ref={refFile} style={{ display: 'none' }} onChange={onChangeFile} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>사원번호</InputGroup.Text>
                                        <Form.Control name='member_info_key' value={member_info_key} onChange={onChangeForm} disabled style={{ backgroundColor: 'white' }} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>사원명</InputGroup.Text>
                                        <Form.Control name='member_info_name' value={member_info_name} onChange={onChangeForm} disabled style={{ backgroundColor: 'white' }} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>부서</InputGroup.Text>
                                        <Form.Control name='dept_name' value={dept_name + "팀"} onChange={onChangeForm} disabled style={{ backgroundColor: 'white' }} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>직급</InputGroup.Text>
                                        <Form.Control name='member_info_job' value={member_info_job} onChange={onChangeForm} disabled style={{ backgroundColor: 'white' }} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>입사일</InputGroup.Text>
                                        <Form.Control name='member_info_hiredate' value={member_info_hiredate} onChange={onChangeForm} disabled style={{ backgroundColor: 'white' }} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>생년월일</InputGroup.Text>
                                        <Form.Control name='member_info_resident' value={member_info_resident} onChange={onChangeForm} disabled style={{ backgroundColor: 'white' }} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>연락처</InputGroup.Text>
                                        <Form.Control name='member_info_phone' value={member_info_phone} onChange={onChangeForm} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>이메일</InputGroup.Text>
                                        <Form.Control name='member_info_email' value={member_info_email} onChange={onChangeForm} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>주소</InputGroup.Text>
                                        <Form.Control name='member_info_address1' value={member_info_address1} onChange={onChangeForm} />
                                        <AddressModal form={form} setForm={setForm} />
                                    </InputGroup>
                                    <Form.Control className='mb-3' name='member_info_address2' value={member_info_address2} placeholder='상세주소' onChange={onChangeForm} />
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='title justify-content-center'>계좌번호</InputGroup.Text>
                                        <Form.Control name='member_info_account' value={member_info_account} onChange={onChangeForm} />
                                    </InputGroup>
                                    <div className='text-center my-3'>
                                        <Button className='me-2' variant='dark' type='submit'>정보수정</Button>
                                        <Button variant='secondary'>수정취소</Button>
                                    </div>
                                </form>
                            </div>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default ERP_Member_UpdateInfoPage