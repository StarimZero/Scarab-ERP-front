import React from 'react';

const WEB_CompanyCEO = () => {


  const imageStyle = {
    width: '100%',
    height: 'auto',
    display: 'flex',
    padding: '20px',
    borderRadius: '100px',
    maxWidth: '700px',
    margin: 'auto',
  };

  return (
    <div>
      <img src='/images/menupage/ceo.png' alt='CEO' style={imageStyle} />
        <div className='text-center'>
            안녕하세요. ceo 쇠똥입니다.
            <p>내용어쩌구~<br/>
                저쩌구
            </p>
            <div className='text-end me-5'>
                <div>(주)쇠똥구리대표이사</div>
                <h2>쇠똥</h2>
               
            </div>

        </div>
    </div>
  );
};

export default WEB_CompanyCEO;
