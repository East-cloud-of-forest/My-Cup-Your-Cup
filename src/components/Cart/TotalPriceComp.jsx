import React from 'react';
import './TotalPriceComp.scss'
import { useSelector } from 'react-redux';

function TotalPriceComp() {
    let formatter = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
    });
    const {items} = useSelector( (state) => ({ items : state.cartReducer.items }) );
    console.log(items)
    const selected = items.filter( item => item.selected === true );
    const totals = selected.map( s => s.total )
    // console.log(totals)
    let sum = 0;
    const totalPrice = totals.reduce( (prev, curr) => prev + curr, sum )
    console.log(totalPrice);
    return (
        <div className='price-container'>
            <p style={{ display: "block"}}>총 배송비 <br /> 
            <span className='price'>{formatter.format(2500)}</span> </p>
            <p>총 상품가격 <br />
            <span className='price'>{formatter.format(Number(totalPrice))}</span> </p>
            <hr />
            <span className='price'>{formatter.format(Number(totalPrice+2500))}</span>

        </div>
    );
}

export default TotalPriceComp;