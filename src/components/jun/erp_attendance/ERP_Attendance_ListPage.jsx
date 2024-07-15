import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Col, Dropdown, Row, Table } from 'react-bootstrap'
import { FaUser } from 'react-icons/fa6'

const ERP_Attendance_ListPage = () => {
    const member_info_key = sessionStorage.getItem("member_info_key");
    const [currentDate, setCurrentDate] = useState(moment());
    const [attendance, setAttendance] = useState({});
    const [list, setList] = useState([]);
    const { member_attendance_date, member_attendance_start, member_attendance_end,
        hours_worked, minutes_worked } = list;

    const callAttendance = async (date) => {
        const formattedDate = date.format('YYYY-MM-DD');
        const url = `/erp/attendance/member?member_info_key=${member_info_key}&member_attendance_date=${formattedDate}`;
        const res = await axios.get(url);
        // console.log(res.data);
        setAttendance(res.data);
    }

    useEffect(() => {
        callAttendance(currentDate);
    }, [currentDate]);


    const callAttendanceList = async () => {
        const url = `/erp/attendance/listMember/${member_info_key}`;
        const res = await axios.get(url);
        // console.log(res.data.listMember);
        setList(res.data.listMember);
    }

    useEffect(() => {
        callAttendanceList();
    }, [])


    // 출근
    const onShift = async () => {
        if (!attendance) {
            const url = '/erp/attendance';
            await axios.post(url, { member_info_key });
            alert("출근완료");
        } else {
            alert("이미 출근하셨습니다!");
            return;
        }
    }

    // 퇴근
    const onLeave = async () => {
        const url = '/erp/attendance';
        await axios.put(url, { member_info_key });
        alert("퇴근완료");
    }

    const handlePreviousMonth = () => {
        setCurrentDate(currentDate.clone().subtract(1, 'months'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.clone().add(1, 'months'));
    };

    const getWeeksInMonth = (date) => {
        const startOfMonth = date.clone().startOf('month').startOf('week');
        const endOfMonth = date.clone().endOf('month').endOf('week');
        const weeks = [];
        let currentWeek = startOfMonth.clone();

        while (currentWeek.isBefore(endOfMonth)) {
            weeks.push({
                start: currentWeek.clone(),
                end: currentWeek.clone().endOf('week'),
            });
            currentWeek.add(1, 'week');
        }

        return weeks;
    };

    const weeksInMonth = getWeeksInMonth(currentDate);

    const getAttendanceForDate = (date) => {
        return list.find(item => moment(item.member_attendance_date).isSame(date, 'day'));
    };

    return (
        <Row>
            <Col md={2} className='bg-light p-5'>
                <div className="d-flex flex-column align-items-center">
                    <div className='mb-5'>
                        <h2>근태관리</h2>
                    </div>
                    <div className="mb-3">
                        <FaUser size={50} />
                    </div>
                    <div className="mb-3">
                        <Button variant="primary" size="lg" block onClick={onShift}>출근하기</Button>
                    </div>
                    <div className="mb-3">
                        <Button variant="secondary" size="lg" block onClick={onLeave}>퇴근하기</Button>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            근무상태변경
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">상태 1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">상태 2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">상태 3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Col>
            <Col md={10} className='p-5'>
                <div className='mb-5'>
                    <h2>근태현황</h2>
                </div>
                <div className='text-center mb-5'>
                    <Row className='justify-content-center'>
                        <Col>
                            <Button onClick={handlePreviousMonth}>&lt;</Button>
                        </Col>
                        <Col>
                            {currentDate.format('YYYY-MM')}
                        </Col>
                        <Col>
                            <Button onClick={handleNextMonth}>&gt;</Button>
                        </Col>
                    </Row>
                </div>
                <Card className="mb-3">
                    <Card.Body>
                        <Row>
                            <Col md={4}>
                                <Card.Text>기본근무 (09:00 - 18:00)</Card.Text>
                            </Col>
                            <Col md={8} className="text-right">
                                <Card.Text>이번주 초과: 0h 0m 0s</Card.Text>
                                <Card.Text>이번주 잔여: 40h 0m 0s</Card.Text>
                                <Card.Text>이번달 누적: 0h 0m 0s</Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <Accordion defaultActiveKey="0">
                    {weeksInMonth.map((week, index) => (
                        <Accordion.Item eventKey={index.toString()} key={index}>
                            <Accordion.Header>
                                {week.start.format('MM월 DD일')} - {week.end.format('MM월 DD일')}
                            </Accordion.Header>
                            <Accordion.Body>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>일자</th>
                                            <th>업무시작</th>
                                            <th>업무종료</th>
                                            <th>총 근무시간</th>
                                            <th>근무시간 상세</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array(7).fill(0).map((_, dayIndex) => {
                                            const currentDay = week.start.clone().add(dayIndex, 'days');
                                            const attendance = getAttendanceForDate(currentDay);
                                            const startTime = attendance ? moment(attendance.member_attendance_start).format('HH:mm') : '-';
                                            const endTime = attendance ? moment(attendance.member_attendance_end).format('HH:mm') : '-';
                                            return (
                                                <tr key={dayIndex}>
                                                    <td>{currentDay.format('YYYY-MM-DD')}</td>
                                                    <td>{startTime}</td>
                                                    <td>{endTime}</td>
                                                    <td>{attendance ? `${attendance.hours_worked}h ${attendance.minutes_worked}m` : '-'}</td>
                                                    <td>{attendance ? '상세 내용' : '-'}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Col>
        </Row>
    )
}

export default ERP_Attendance_ListPage