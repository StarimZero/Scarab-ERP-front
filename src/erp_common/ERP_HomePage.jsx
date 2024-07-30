import React, { useEffect } from 'react'
import ERP_Transaction_Chart from '../components/jun/erp_chart/ERP_Transaction_Chart'
import Swal from 'sweetalert2';
import ChartTest from '../components/starim/starim_common/ChartTest';
import ERP_Attendance_HomePage from '../components/jun/erp_attendance/ERP_Attendance_HomePage';
import ERPNoticeListPage from '../components/starim/erp_notice/ERPNoticeListPage';
import ERP_Notice_List from '../components/jun/erp_chart/ERP_Notice_List';

const ERP_HomePage = () => {


    const member_info_key = sessionStorage.getItem("member_info_key");
    const session_member_info_auth = sessionStorage.getItem("member_info_auth");

    useEffect(() => {
        if (!member_info_key) {
            window.location.href = '/erp/member/login';
        }
    }, [member_info_key]);


    return (
        <div>
            {session_member_info_auth == "관리자" &&
                <div class="row">
                    <div class="col-lg-8 d-flex align-items-strech">
                        <div class="card w-100">
                            <div class="card-body">
                                <ERP_Transaction_Chart />
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card overflow-hidden">
                                    <div class="card-body p-4">
                                        <h5 class="card-title mb-9 fw-semibold">Purchase Overview</h5>
                                        <div class="row align-items-center">
                                            <div class="col-12">
                                                <ChartTest />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row alig n-items-start">
                                            <div class="col-8">
                                                <h5 class="card-title mb-9 fw-semibold"> Monthly Earnings </h5>
                                                <h4 class="fw-semibold mb-3">$6,820</h4>
                                                <div class="d-flex align-items-center pb-1">
                                                    <span
                                                        class="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                                                        <i class="ti ti-arrow-down-right text-danger"></i>
                                                    </span>
                                                    <p class="text-dark me-1 fs-3 mb-0">+9%</p>
                                                    <p class="fs-3 mb-0">last year</p>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="d-flex justify-content-end">
                                                    <div
                                                        class="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                                                        <i class="ti ti-currency-dollar fs-6"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="earning"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div class="row">
                <div class="col-lg-8 d-flex align-items-stretch">
                    <div class="card w-100">
                        <div class="card-body p-4">
                            <ERP_Notice_List />
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="card w-100">
                        <div class="card-body p-4">
                            <div class="mb-4">
                                <h5 class="card-title fw-semibold">Attendance</h5>
                            </div>
                            <ERP_Attendance_HomePage />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ERP_HomePage