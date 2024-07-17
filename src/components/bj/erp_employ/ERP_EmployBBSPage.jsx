import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';

const ERP_EmployBBSPage = () => {
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const [listtable, setListtable] = useState([]);
    const [page, setPage]=useState(1);
    const [size, setSize]=useState(5);
    const [key, setKey] = useState('employ_bbs_admin');
    const [word, setWord] = useState('');
    

    const callAPI = async() => {
        const res = await axios.get(`/employ/bbs/list.json?key=${key}&word=${word}&page=${page}&size=${size}`);
        console.log(res.data);
        setList(res.data.list);
    }

    const callAPIlist = async() => {
        const res = await axios.get(`/employ/bbs/listtable`)
        console.log(res.data);
        setListtable(res.data);

    }
    useEffect(()=>{
        callAPI();
        callAPIlist();
    }, []);





  return (
    <div>
        {sessionStorage.getItem('member_info_id') && 
        <div className='text-end'>
            <a href='/erp/employ/insert'>
                <Button variant='outline-primary btn-sm'>글쓰기</Button>
            </a>
        </div>
       }
 
        <Table>
            <thead>
                <tr>
                    <td>상태</td>
                    <td>제목</td>
                    <td>작성자</td>
                    <td>작성일</td>
                    <td>조회수</td>
                </tr>
            </thead>
            <tbody>
                {listtable && listtable.filter((bbs)=> bbs.employ_bbs_type === 1).map(bbs=>
                     <tr key={bbs.employ_bbs_id}>
                     <td><div style={{color:'red'}}>접수중</div></td>
                         <td>
                             <a href={`/erp/employ/read/${bbs.employ_bbs_id}`}>
                                 <td>{bbs.employ_bbs_title}</td>
                             </a>   
                         </td> 
                     <td>{bbs.employ_bbs_admin}</td>
                     <td>{bbs.employ_bbs_regdate}</td>
                     <td>{bbs.employ_bbs_viewcnt}</td>
                 </tr>
                )}
            </tbody>
            <tbody>
                {list && list.filter((bbs)=> bbs.employ_bbs_type === 0).map(bbs=>
                    <tr key={bbs.employ_bbs_id}>
                        <td>완료</td>
                            <td>
                                <a href={`/erp/employ/read/${bbs.employ_bbs_id}`}>
                                    <td>{bbs.employ_bbs_title}</td>
                                </a>   
                            </td> 
                        <td>{bbs.employ_bbs_admin}</td>
                        <td>{bbs.employ_bbs_regdate}</td>
                        <td>{bbs.employ_bbs_viewcnt}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>
  )
}

export default ERP_EmployBBSPage