import React from 'react';
import { useContext } from 'react';
import DataContext from '../../modules/cupInfo';
import './TotalPriceComp.scss'

function TotalPriceComp() {
    const data = useContext(DataContext);
    return (
        <div className='price-container'>
            <p>총 배송비 <br /> 2500원 </p>
            <p>총 상품가격</p>
            <p>{ data.state.price }</p>
        </div>
    );
}

export default TotalPriceComp;