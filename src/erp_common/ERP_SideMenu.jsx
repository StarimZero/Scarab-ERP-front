import React, { useEffect, useState } from 'react'
import { TbMessageShare } from "react-icons/tb";
import { TbMessageCheck } from "react-icons/tb";
import { BsSend } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";
import { TbMessage } from "react-icons/tb";
import axios from 'axios';
import { RiAlarmWarningLine } from "react-icons/ri";
import { useLocation } from 'react-router-dom';

const ERP_SideMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
   
    const [nlist, setNlist] = useState([]);
    const [npage, setNPage] = useState(1);
    const [nsize, setNsize] = useState(5);
    const [ncount, setNcount] = useState(0);
    const [nkey, setNkey] = useState('message_title');
    const [nword, setNword] = useState('');
    const uid=sessionStorage.getItem('member_info_id');
    const location = useLocation();

    const onClickSide = (e) => {
        e.preventDefault();
        setIsMenuOpen(!isMenuOpen);
    };


    const callAPI = async() => {
        const res1=await axios.get(`/erp/receivemessage/nlist/${uid}?key=${nkey}&word=${nword}&page=${npage}&size=${nsize}`);
        setNcount(res1.data.ntotal);

      }

    //   useEffect(()=>{
    //     callAPI();
    //   }, []);

      useEffect(()=>{
        if(location.pathname.includes('/message')){
            setIsMenuOpen(true);
        }
      }, [location.pathname]);

    return (
        <aside className="left-sidebar">
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-between">
                    <a href="/erp" >
                        <img src='/images/logo/sinhyangback.png' style={{width:"14rem"}}/>
                    </a>
                    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                        <i className="ti ti-x fs-8"></i>
                    </div>
                </div>

                <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                    <ul id="sidebarnav">
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">Home</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp" aria-expanded="false">
                                <span>
                                    <i className="ti ti-layout-dashboard"></i>
                                </span>
                                <span className="hide-menu">메인페이지</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/notice/list" aria-expanded="false">
                                <span>
                                    <i className="ti ti-article"></i>
                                </span>
                                <span className="hide-menu">알립니다.</span>
                            </a>
                        </li>

                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/message" aria-expanded="false" onClick={onClickSide}>
                                <span>
                                <TbMessage size={22}/>
                                </span>
                                <span className="hide-menu">메신저</span>
                            </a>
                            {isMenuOpen && (
                                <ul className="submenu">
                                    <li className="submenu-item mb-1">
                                        <a className="submenu-link" href="/erp/message/receive">
                                            <TbMessageCheck /> 받은 메신저 {ncount > 0 && <><RiAlarmWarningLine  color='red'/>{ncount}</>}
                                        </a>
                                    </li>
                                    <li className="submenu-item  mb-1">
                                        <a className="submenu-link" href="/erp/message/send"><TbMessageShare /> 보낸 메신저</a>
                                    </li>
                                    <li className="submenu-item  mb-1">
                                        <a className="submenu-link" href="/erp/message/insert"><BsSend /> 메신저 보내기</a>
                                    </li>
                                    <li className="submenu-item  ">
                                        <a className="submenu-link" href="/erp/message/delete"><VscTrash /> 휴지통</a>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">인사관리</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/attendance/list" aria-expanded="false">
                                <span>
                                    <i className="ti ti-article"></i>
                                </span>
                                <span className="hide-menu">Attendance</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/member/list" aria-expanded="false">
                                <span>
                                    <i className="ti ti-cards"></i>
                                </span>
                                <span className="hide-menu">사원목록</span>
                            </a>
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">구매 | 발주 </span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/vendor/list" aria-expanded="false">
                                <span>
                                    <i className="ti ti-article"></i>
                                </span>
                                <span className="hide-menu">구매처관리</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/purchase/list" aria-expanded="false">
                                <span>
                                    <i className="ti ti-article"></i>
                                </span>
                                <span className="hide-menu">구매리스트</span>
                            </a>
                        </li>

                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">유지 | 보수</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/items/list" aria-expanded="false">
                                <span>
                                    <i className="ti ti-article"></i>
                                </span>
                                <span className="hide-menu">아이템 리스트</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/warehouse/list" aria-expanded="false">
                                <span>
                                    <i className="ti ti-article"></i>
                                </span>
                                <span className="hide-menu">창고 리스트</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/inventory/itemlist" aria-expanded="false">
                                <span>
                                    <i className="ti ti-article"></i>
                                </span>
                                <span className="hide-menu">재고 리스트</span>
                            </a>
                        </li>


                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">영업 | 판매</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/sales/list" aria-expanded="false">
                                <span>
                                    <i className="ti ti-article"></i>
                                </span>
                                <span className="hide-menu">판매 리스트</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/client/list" aria-expanded="false">
                                <span>
                                    <i className="ti ti-alert-circle"></i>
                                </span>
                                <span className="hide-menu">고객 리스트</span>
                            </a>
                        </li>

                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">회계</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/account/list" aria-expanded="false">
                                <span>
                                    <i className="ti ti-article"></i>
                                </span>
                                <span className="hide-menu">자금현황</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/transaction/pay" aria-expanded="false">
                                <span>
                                    <i className="ti ti-cards"></i>
                                </span>
                                <span className="hide-menu">대금지불</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/transaction/salary" aria-expanded="false">
                                <span>
                                    <i className="ti ti-file-description"></i>
                                </span>
                                <span className="hide-menu">급여관리</span>
                            </a>
                        </li>

                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">AUTH</span>
                        </li>


                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/member/login" aria-expanded="false">
                                <span>
                                    <i className="ti ti-login"></i>
                                </span>
                                <span className="hide-menu">Login</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/member/register" aria-expanded="false">
                                <span>
                                    <i className="ti ti-user-plus"></i>
                                </span>
                                <span className="hide-menu">Register</span>
                            </a>
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">EXTRA</span>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/erp/employ" aria-expanded="false">
                                <span>
                                    <i className="ti ti-mood-happy"></i>
                                </span>
                                <span className="hide-menu">채용공고관리</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="/web" aria-expanded="false">
                                <span>
                                    <i className="ti ti-aperture"></i>
                                </span>
                                <span className="hide-menu">신향F&B</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./ui-card.html" aria-expanded="false">
                                <span>
                                    <i className="ti ti-cards"></i>
                                </span>
                                <span className="hide-menu">FAQ게시판</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./ui-forms.html" aria-expanded="false">
                                <span>
                                    <i className="ti ti-file-description"></i>
                                </span>
                                <span className="hide-menu">Forms</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./ui-typography.html" aria-expanded="false">
                                <span>
                                    <i className="ti ti-typography"></i>
                                </span>
                                <span className="hide-menu">Typography</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./ui-alerts.html" aria-expanded="false">
                                <span>
                                    <i className="ti ti-alert-circle"></i>
                                </span>
                                <span className="hide-menu">Alerts</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="#" aria-expanded="false">
                                <span>
                                    <i className="ti ti-file-description"></i>
                                </span>
                                <span className="hide-menu">Forms</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link" href="./ui-typography.html" aria-expanded="false">
                                <span>
                                    <i className="ti ti-typography"></i>
                                </span>
                                <span className="hide-menu">Typography</span>
                            </a>
                        </li>
                    </ul>
                </nav>

            </div>

        </aside>


    )
}

export default ERP_SideMenu