import React from 'react';
import './TotalPriceComp.scss'

function TotalPriceComp({totalPrice}) {
    let formatter = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
    });

    return (
        <div className='price-container'>
            <p style={{ display: "block"}}>총 배송비 <br /> 
            <span className='price'>{formatter.format(2500)}</span> </p>
            <p>총 상품가격 <br />
            <span className='price'>{formatter.format(totalPrice)}</span> </p>
            <p></p>
        </div>
    );
}

export default TotalPriceComp;