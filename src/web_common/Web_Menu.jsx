import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";


const Web_Menu = () => {
    /* 회사소개 */
    const [showDropdownCompany, setShowDropdownCompany] = useState(false);

    /* 사업장소개 */
    const [showDropdownWorkplace, setshowDropdownWorkplace] = useState(false);

    /* 뉴스 */
    const [showDropdownNews, setshowDropdownNews] = useState(false);

    /* 인물소개 */
    const [showDropdownPerson, setshowDropdownPerson] = useState(false);

    /* 제품 */
    const [showDropdownProduct, setShowDropdownProduct] = useState(false);

    /* 인재채용 */
    const [showDropdownEmploy, setShowDropdownEmploy] = useState(false);

    /* 고객센터 */
    const [showDropdownCustomer, setShowDropdownCustomer] = useState(false);

    /* 로그 */
    const [showDropdownLog, setShowDropdownLog] = useState(false);


    const handleMouseOver = (setShowDropdown) => {
        setShowDropdown(true);
    };

    const handleMouseLeave = (setShowDropdown) => {
        setShowDropdown(false);
    };



    return (
        <div> 
            <div className='my-5'>
            <nav className="nav-container  d-flex align-items-center justify-content-between nav-border">
                    <div className="menu-items d-flex">
                        <div
                            className='d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setShowDropdownCompany)}
                            onMouseLeave={() => handleMouseLeave(setShowDropdownCompany)}>
                            <a className="nav-link nav-link-custom" href="#">회사소개</a>
                            {showDropdownCompany && (
                                <div className="dropdown-menu show">
                                    <Link className="dropdown-item" to="company/overview">회사개요</Link>
                                    <Link className="dropdown-item" to="company/histroy">회사연혁</Link>
                                    <Link className="dropdown-item" to="company/ceohello">CEO인사말</Link>
                                </div>
                            )}
                        </div>

                        <div
                            className='d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setshowDropdownWorkplace)}
                            onMouseLeave={() => handleMouseLeave(setshowDropdownWorkplace)}>
                            <a className="nav-link nav-link-custom" href="#">사업장소개</a>
                            {showDropdownWorkplace && (
                                <div className="dropdown-menu show">
                                    <Link className="dropdown-item" to="/workplace/domestic">국내</Link>
                                    <Link className="dropdown-item" to="/workplace/overseas">해외</Link>
                                </div>
                            )}
                        </div>

                        <div
                            className='d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setshowDropdownNews)}
                            onMouseLeave={() => handleMouseLeave(setshowDropdownNews)}>
                            <a className="nav-link nav-link-custom" href="#">뉴스</a>
                            {showDropdownNews && (
                                <div className="dropdown-menu show">
                                    <Link className="dropdown-item" to="/news/domestic">국내</Link>
                                    <Link className="dropdown-item" to="/news/overseas">해외</Link>
                                </div>
                            )}
                        </div>

                        <div
                            className='d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setshowDropdownPerson)}
                            onMouseLeave={() => handleMouseLeave(setshowDropdownPerson)}>
                            <a className="nav-link nav-link-custom" href="#">인물소개</a>
                            {showDropdownPerson && (
                                <div className="dropdown-menu show">
                                    <Link className="dropdown-item" to="/person/organization">회사 조직도</Link>
                                </div>
                            )}
                        </div>

                        <div
                            className='d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setShowDropdownProduct)}
                            onMouseLeave={() => handleMouseLeave(setShowDropdownProduct)}>
                            <a className="nav-link nav-link-custom" href="#">제품</a>
                            {showDropdownProduct && (
                                <div className="dropdown-menu show">
                                    <Link className="dropdown-item" to="/product/read">제품소개</Link>
                                    <Link className="dropdown-item" to="/product/research">연구중인제품</Link>
                                </div>
                            )}
                        </div>

                        <div
                            className='d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setShowDropdownEmploy)}
                            onMouseLeave={() => handleMouseLeave(setShowDropdownEmploy)}>
                            <a className="nav-link nav-link-custom" href="#">인재채용</a>
                            {showDropdownEmploy && (
                                <div className="dropdown-menu show">
                                    <Link className="dropdown-item" to="/employ/procedure">채용절차</Link>
                                    <Link className="dropdown-item" to="/employ/announcement">채용공고</Link>
                                </div>
                            )}
                        </div>

                        <div
                            className='d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setShowDropdownCustomer)}
                            onMouseLeave={() => handleMouseLeave(setShowDropdownCustomer)}>
                            <a className="nav-link nav-link-custom" href="#">고객센터</a>
                            {showDropdownCustomer && (
                                <div className="dropdown-menu show">
                                    <a className="dropdown-item" href="/web/customer/bbs">고객게시판</a>
                                    <a className="dropdown-item" href="/web/customer/faq">FAQ</a>
                                    <a className="dropdown-item" href="/web/customer/announcement">공지</a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="d-inline-block right-box" onMouseEnter={() => handleMouseOver(setShowDropdownLog)}
                            onMouseLeave={() => handleMouseLeave(setShowDropdownLog)}>
                        
                          <a className="nav-link nav-link-custom" href="#">로그인하고싶습니까?</a>
                        {showDropdownLog && (
                            <div className="dropdown-menu show">
                                <Link className="dropdown-item" to="/web/login">로그인</Link>
                                <Link className="dropdown-item" to="/web/mypage">마이페이지</Link>
                            </div>
                        )}
                    </div>

                    <span>
                        <Link to="/">
                            <img src="/images/menupage/logo.png" alt="Description" className="logo-image" />
                        </Link>
                    </span>
                </nav>
            </div>
        </div>
    );
}

export default Web_Menu