import React, { useEffect } from 'react'
import ERP_Transaction_Chart from '../components/jun/erp_chart/ERP_Transaction_Chart'
import Swal from 'sweetalert2';
import ChartTest from '../components/starim/starim_common/ChartTest';
import ERP_Attendance_HomePage from '../components/jun/erp_attendance/ERP_Attendance_HomePage';

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
                            <h5 class="card-title fw-semibold mb-4">Recent Transactions</h5>
                            <div class="table-responsive">
                                <table class="table text-nowrap mb-0 align-middle">
                                    <thead class="text-dark fs-4">
                                        <tr>
                                            <th class="border-bottom-0">
                                                <h6 class="fw-semibold mb-0">Id</h6>
                                            </th>
                                            <th class="border-bottom-0">
                                                <h6 class="fw-semibold mb-0">Assigned</h6>
                                            </th>
                                            <th class="border-bottom-0">
                                                <h6 class="fw-semibold mb-0">Name</h6>
                                            </th>
                                            <th class="border-bottom-0">
                                                <h6 class="fw-semibold mb-0">Priority</h6>
                                            </th>
                                            <th class="border-bottom-0">
                                                <h6 class="fw-semibold mb-0">Budget</h6>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="border-bottom-0">
                                                <h6 class="fw-semibold mb-0">1</h6>
                                            </td>
                                            <td class="border-bottom-0">
                                                <h6 class="fw-semibold mb-1">Sunil Joshi</h6>
                                                <span class="fw-normal">Web Designer</span>
                                            </td>
                                            <td class="border-bottom-0">
                                                <p class="mb-0 fw-normal">Elite Admin</p>
                                            </td>
                                            <td class="border-bottom-0">
                                                <div class="d-flex align-items-center gap-2">
                                                    <span class="badge bg-primary rounded-3 fw-semibold">Low</span>
                                                </div>
                                            </td>
                                            <td class="border-bottom-0">
                                                <h6 class="fw-semibold mb-0 fs-4">$3.9</h6>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="border-bottom-0">
                                                <h6 class="fw-semibold mb-0">2</h6>
                                            </td>
                                            <td class="border-bottom-0">
                                                <h6 class="fw-semibold mb-1">Andrew McDownland</h6>
                                                <span class="fw-normal">Project Manager</span>
                                            </td>
                                            <td class="border-bottom-0">
                                                <p class="mb-0 fw-normal">Real Homes WP Theme</p>
                                            </td>
                                            <td class="border-bottom-0">
                                                <div class="d-flex align-items-center gap-2">
                                                    <span
                                                        class="badge bg-secondary rounded-3 fw-semibold">Medium</span>
                                                </div>
                                            </td>
                                            <td class="border-bottom-0">
                                                <h6 class="fw-semibold mb-0 fs-4">$24.5k</h6>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="border-bottom-0">
                                                <h6 class="fw-semibold mb-0">3</h6>
                                            </td>
                                            <td class="border-bottom-0">
                                                <h6 class="fw-semibold mb-1">Christopher Jamil</h6>
                                                <span class="fw-normal">Project Manager</span>
                                            </td>
                                            <td class="border-bottom-0">
                                                <p class="mb-0 fw-normal">MedicalPro WP Theme</p>
                                            </td>
                                            <td class="border-bottom-0">
                                                <div class="d-flex align-items-center gap-2">
                                                    <span class="badge bg-danger rounded-3 fw-semibold">High</span>
                                                </div>
                                            </td>
                                            <td class="border-bottom-0">
                                                <h6 class="fw-semibold mb-0 fs-4">$12.8k</h6>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="border-bottom-0">
                                                <h6 class="fw-semibold mb-0">4</h6>
                                            </td>
                                            <td class="border-bottom-0">
                                                <h6 class="fw-semibold mb-1">Nirav Joshi</h6>
                                                <span class="fw-normal">Frontend Engineer</span>
                                            </td>
                                            <td class="border-bottom-0">
                                                <p class="mb-0 fw-normal">Hosting Press HTML</p>
                                            </td>
                                            <td class="border-bottom-0">
                                                <div class="d-flex align-items-center gap-2">
                                                    <span
                                                        class="badge bg-success rounded-3 fw-semibold">Critical</span>
                                                </div>
                                            </td>
                                            <td class="border-bottom-0">
                                                <h6 class="fw-semibold mb-0 fs-4">$2.4k</h6>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="card w-100">
                        <div class="card-body p-4">
                            <div class="mb-4">
                                <h5 class="card-title fw-semibold">Attendance</h5>
                            </div>
                            <ERP_Attendance_HomePage/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ERP_HomePage