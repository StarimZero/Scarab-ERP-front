import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

const ERP_Sales_ListPage = () => {



    const onClickSaleInsert = (e) => {
        window.location.href="/erp/sales/insert";
    }

  return (
    <Row>
        <Col>
            <div>
                <Button onClick={onClickSaleInsert}>판매입력하기</Button>
                
            </div>
        </Col>
    </Row>
  )
}

export default ERP_Sales_ListPage