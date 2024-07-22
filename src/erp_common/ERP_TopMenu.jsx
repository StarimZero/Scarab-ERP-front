import React from 'react'
import { Navbar, Nav, NavDropdown, Image, Button } from 'react-bootstrap';
import { AiOutlineMenu, AiOutlineBell, AiOutlineUser, AiOutlineMail, AiOutlineUnorderedList } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ERP_TopMenu = () => {
    const member_info_id = sessionStorage.getItem('member_info_id');
    const member_info_key = sessionStorage.getItem('member_info_key');
    const member_info_name = sessionStorage.getItem('member_info_name');
    const navigate = useNavigate('');

    const onClickMyPage = () => {
        navigate('/erp/member/mypage');
    }

    const onLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "로그아웃 하시겠습니까?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Logout"
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.clear();
                window.location.href = "/";
            }
        });
    }

    return (
        <header className="app-header">
            <Navbar expand="lg" variant="light">
                <Nav className="me-auto">
                    <Nav.Item className="d-block d-xl-none">
                        <Nav.Link href="#" id="headerCollapse">
                            <AiOutlineMenu />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#">
                            <AiOutlineBell />
                            <div className="notification bg-primary rounded-circle"></div>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Navbar.Collapse className="justify-content-end px-0" id="navbarNav">
                    <Nav className="ms-auto align-items-center">
                        {member_info_id ?
                            <span className="me-3">
                                {member_info_name}({member_info_id})님
                            </span>
                            :
                            <></>
                        }
                        {member_info_id ?
                            <NavDropdown
                                title={<img src={"./user-1.jpg" && "http://via.placeholder.com/50x50"} width="35" height="35" />}
                                id="drop2"
                                align="end"
                            >
                                <div className="message-body">
                                    <NavDropdown.Item onClick={onClickMyPage} className="d-flex align-items-center gap-2 mypage">
                                        <AiOutlineUser className="fs-6" />
                                        <p className="mb-0 fs-6">My Profile</p>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#" className="d-flex align-items-center gap-2">
                                        <AiOutlineMail className="fs-6" />
                                        <p className="mb-0 fs-6">My Account</p>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#" className="d-flex align-items-center gap-2">
                                        <AiOutlineUnorderedList className="fs-6" />
                                        <p className="mb-0 fs-6">My Task</p>
                                    </NavDropdown.Item>
                                    <div className="d-block text-center">
                                        <Button variant="outline-primary" className="mx-3 mt-2" onClick={onLogout}>
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </NavDropdown>
                            :
                            <Button href="/erp/member/login" variant="outline-primary" className="mx-3 mt-2">
                                Login
                            </Button>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default ERP_TopMenu