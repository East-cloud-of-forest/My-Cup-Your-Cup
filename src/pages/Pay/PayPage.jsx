import React from 'react';
import "./PayPage.scss";
import PayAddress from '../../components/PayComp/PayAddress';
import PayOrderList from '../../components/PayComp/PayOrderList';
import PayMethod from '../../components/PayComp/PayMethod';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PayFixed from '../../components/PayComp/PayFixed';

const PayPage = () => {
    const {items} = useSelector( (state) => ({ items : state.cartReducer.items }) );
    
    // 총 금액
    const selected = items.filter( item => item.selected === true );
    const totals = selected.map( s => s.total )

    let sum = 0;
    const totalPrice = totals.reduce( (prev, curr) => prev + curr, sum )


    return (
        <div className='pay_all_div'>
            <h1 className='pay_h1'>결제 페이지</h1>
            
            {/**주문목록 */}
            <div>
                <PayOrderList items={items} totalPrice={totalPrice} />
            </div>

            {/**배송지정보 */}
            <div>
                <PayAddress/>
            </div>

            {/**결제수단 */}
            <div>
                <PayMethod/>
            </div>

            {/**픽스 div */}
            <div>
                <PayFixed totalPrice={totalPrice} />
            </div>
        </div>
    );
};

export default PayPage;