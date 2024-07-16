import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';


const WEB_WorkspacePage = () => {
    const [select, setSelect] = useState({ lat: 37.5665, lng: 126.9780 }); 

    const locations = {
      seoul: { lat: 37.5665, lng: 126.9780 },
      india: { lat: 20.5937, lng: 78.9629 },
      vat: { lat: 20.86194, lng: 106.68028 },
    };
  
    useEffect(() => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCQskYtTKl4Kin7M-Bdq3xmkcpPigj3YQw`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);  //구글맵로드
  
      //** 구글맵호출 */
      script.onload = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: select,
          zoom: 10,
        });
  
        new window.google.maps.Marker({
          position: select,
          map,
        });
      };
      // 재호출하고 기존 맵 정보 제거
      return () => {
        document.head.removeChild(script);
      };
    }, [select]);
  
    const ButtonOnClick = (location) => {
      setSelect(locations[location]);
    };
  
    return (
      <div>
        <div className='mb-3'>
              <h1 className='text-center mb-5'>세계로 뻗어가는 쇠똥구리</h1>
              <img className='place-gsa-img' src='/images/menupage/gs1.png' alt='GSA' />
        </div>
          <div className='text-center mb-3'>
              <Button className='me-3' variant='outline-success' onClick={() => ButtonOnClick('seoul')}>서울</Button>
              <Button className='me-3' variant='outline-warning' onClick={() => ButtonOnClick('india')}>인도</Button>
              <Button variant='outline-info' onClick={() => ButtonOnClick('vat')}>베트남</Button>
          </div>
          <Container className='map-center-plz'>
              <div id='map'  style={{ width: '80%', height: '500px', marginBottom: '20px' }}></div>
          </Container>
      </div>
    );
  };
  

export default WEB_WorkspacePage