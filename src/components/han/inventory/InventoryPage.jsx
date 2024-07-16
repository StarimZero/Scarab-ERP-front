import React from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'

const InventoryPage = () => {




  return (
    <Row className='justify-content-center'>
        <h1>재고리스트</h1>
        <div className='mb-2'><Button>전체거래내역</Button></div>
        <div>
            <Button className='me-2'>전체</Button>
            <Button className='me-2'>창고1</Button>
            <Button className='me-2'>창고2</Button>
            <Button className='me-2'>창고3</Button>
        </div>
        <Col lg={10}>
            <Table>
                <thead className='text-center'>
                    <tr>
                        <td>코드</td>
                        <td>이름</td>
                        <td>사진</td>
                        <td>타입</td>
                        <td>최근거래내역</td>
                    </tr>
                </thead>
                <tbody className='align-middle text-center'>

                </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default InventoryPage