import React, { useState } from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";

const Web_Menu = () => {
    const [showDropdownCompany, setShowDropdownCompany] = useState(false);
    const [showDropdownWorkplace, setshowDropdownWorkplace] = useState(false);
    const [showDropdownNews, setshowDropdownNews] = useState(false);
    const [showDropdownPerson, setshowDropdownPerson] = useState(false);
    const [showDropdownProduct, setShowDropdownProduct] = useState(false);
    const [showDropdownEmploy, setShowDropdownEmploy] = useState(false);
    const [showDropdownCustomer, setShowDropdownCustomer] = useState(false);
    const [showDropdownLog, setShowDropdownLog] = useState(false);

    const handleMouseOver = (setShowDropdown) => {
        setShowDropdown(true);
    };

    const handleMouseLeave = (setShowDropdown) => {
        setShowDropdown(false);
    };

    const onClickLogout = (e) => {
        e.preventDefault();
        if(window.confirm("정말로 로그아웃하실래요?")){
          sessionStorage.clear();
          window.location.reload();
        }
    }    
    const vid = sessionStorage.getItem("visitor_id")

    return (
        <div>
            <div className='my-5'>
                <nav className="web-nav-container d-flex align-items-center justify-content-between web-nav-border">
                    <div className="web-menu-items d-flex">
                        <div
                            className='web-menu-item d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setShowDropdownCompany)}
                            onMouseLeave={() => handleMouseLeave(setShowDropdownCompany)}>
                            <a className="web-nav-link-custom" href="#">회사소개</a>
                            {showDropdownCompany && (
                                <div className="web-dropdown1-menu">
                                    <a className="web-dropdown1-item" href="company/overview">회사개요</a>
                                    <a className="web-dropdown1-item" href="company/histroy">회사연혁</a>
                                    <a className="web-dropdown1-item" href="company/ceohello">CEO인사말</a>
                                </div>
                            )}
                        </div>

                        <div
                            className='web-menu-item d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setshowDropdownWorkplace)}
                            onMouseLeave={() => handleMouseLeave(setshowDropdownWorkplace)}>
                            <a className="web-nav-link web-nav-link-custom" href="#">사업장소개</a>
                            {showDropdownWorkplace && (
                                <div className="web-dropdown1-menu">
                                    <a className="web-dropdown1-item" href="/workplace/domestic">국내</a>
                                    <a className="web-dropdown1-item" href="/workplace/overseas">해외</a>
                                </div>
                            )}
                        </div>

                        <div
                            className='web-menu-item d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setshowDropdownNews)}
                            onMouseLeave={() => handleMouseLeave(setshowDropdownNews)}>
                            <a className="web-nav-link web-nav-link-custom" href="#">뉴스</a>
                            {showDropdownNews && (
                                <div className="web-dropdown1-menu">
                                    <a className="web-dropdown1-item" href="/news/domestic">국내</a>
                                    <a className="web-dropdown1-item" href="/news/overseas">해외</a>
                                </div>
                            )}
                        </div>

                        <div
                            className='web-menu-item d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setshowDropdownPerson)}
                            onMouseLeave={() => handleMouseLeave(setshowDropdownPerson)}>
                            <a className="web-nav-link web-nav-link-custom" href="#">인물소개</a>
                            {showDropdownPerson && (
                                <div className="web-dropdown1-menu">
                                    <a className="web-dropdown1-item" href="/person/organization">회사 조직도</a>
                                </div>
                            )}
                        </div>

                        <div
                            className='web-menu-item d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setShowDropdownProduct)}
                            onMouseLeave={() => handleMouseLeave(setShowDropdownProduct)}>
                            <a className="web-nav-link web-nav-link-custom" href="#">제품</a>
                            {showDropdownProduct && (
                                <div className="web-dropdown1-menu">
                                    <a className="web-dropdown1-item" href="/product/read">제품소개</a>
                                    <a className="web-dropdown1-item" href="/product/research">연구중인제품</a>
                                </div>
                            )}
                        </div>

                        <div
                            className='web-menu-item d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setShowDropdownEmploy)}
                            onMouseLeave={() => handleMouseLeave(setShowDropdownEmploy)}>
                            <a className="web-nav-link web-nav-link-custom" href="#">인재채용</a>
                            {showDropdownEmploy && (
                                <div className="web-dropdown1-menu">
                                    <a className="web-dropdown1-item" href="/employ/procedure">채용절차</a>
                                    <a className="web-dropdown1-item" href="/employ/announcement">채용공고</a>
                                </div>
                            )}
                        </div>

                        <div
                            className='web-menu-item d-inline-block me-3'
                            onMouseEnter={() => handleMouseOver(setShowDropdownCustomer)}
                            onMouseLeave={() => handleMouseLeave(setShowDropdownCustomer)}>
                            <a className="web-nav-link web-nav-link-custom" href="#">고객센터</a>
                            {showDropdownCustomer && (
                                <div className="web-dropdown1-menu">
                                    <a className="web-dropdown1-item" href="/web/customer/bbs">고객게시판</a>
                                    <a className="web-dropdown1-item" href="/web/customer/faq">FAQ</a>
                                    <a className="web-dropdown1-item" href="/web/customer/announcement">공지</a>
                                </div>
                            )}
                        </div>
                    </div>

                    {sessionStorage.getItem("visitor_id") && <div className='me-1' style={{color:'white'}} >{vid} 님</div>}
                    <div className="web-menu-item web-right-box d-inline-block  me-3" onMouseEnter={() => handleMouseOver(setShowDropdownLog)}
                        onMouseLeave={() => handleMouseLeave(setShowDropdownLog)}>
                        <a className="web-nav-link web-nav-link-custom" href="#"><IoPersonCircleOutline size={32} /></a>
                        {showDropdownLog && (
                            <div className="web-dropdown1-menu">
                                {sessionStorage.getItem("visitor_id") ?
                                    <>
                                    <a className="web-dropdown1-item" href="#" onClick={onClickLogout}>로그아웃</a>
                                    <a className="web-dropdown1-item" href="/web/visitor/mypage">마이페이지</a>
                                    </>
                                    :                                
                                    <a className="web-dropdown1-item" href="/web/visitor/login">로그인</a>
                            }
                            </div>
                        )}
                    </div>

                    <div className='me-3 ms-3'>
                        <a href="/">
                            <img src="/images/menupage/logo.png" alt="Description" className="web-logo-image" />
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Web_Menu;
