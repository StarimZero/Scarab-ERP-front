import axios from 'axios';
import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';

const ERP_insertMessagePage = () => {

    const onSendmsg =async() => {
        await axios.post('/erp/sendmessage/insert', {
            
        });
    }
    
  return (
    <div>
    <h2 className='text-center mb-4'>메신저 쓰기</h2>

    <div className='text-start mb-2'>
             <Button className='btn-sm' variant='outline-primary'>보내기</Button>
    </div>

    <Form.Control  type="file" className='mb-3' style={{width: '40%'}}/>


       <Form>
         <Form.Group as={Row} className="mb-3" >
           <Form.Label column sm="1">받는 사람 :</Form.Label>
           <Col sm="9">
             <Form.Select>
               <option></option>
             </Form.Select>
           </Col>
         </Form.Group>

         <Form.Group className='mt-2'>
           <Form.Control as="textarea" rows={10}  style={{ width: '90%' }}/>

         </Form.Group>
       </Form>


 </div>
  )
}

export default ERP_insertMessagePage