import React from 'react';
import './TotalPriceComp.scss'

function TotalPriceComp() {
    return (
        <div className='price-container'>
            <p>총 배송비</p>
            <p> 2,500 원 </p>
            <p>총 상품금액</p>
            <p> 80,000 원</p>
        </div>
    );
}

export default TotalPriceComp;