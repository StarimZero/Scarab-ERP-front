import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Swal from 'sweetalert2';

const ERP_Member_AttendancePage = () => {
    const member_info_key = sessionStorage.getItem('member_info_key');
    const member_info_name = sessionStorage.getItem('member_info_name');


    return (
        <Row>
            <div className="text-center mt-5">
                <h1 className="h4 text-gray-900 mb-3">근태 내역</h1>
            </div>
            <div className="px-5">

            </div>
        </Row>
    )
}

export default ERP_Member_AttendancePage