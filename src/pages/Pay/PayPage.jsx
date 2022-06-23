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
    
    const [cost,setCost] = useState(0)

    const getData = (cost) =>{
        setCost(cost);
    }

    return (
        <div className='pay_all_div'>
            <h1 className='pay_h1'>결제 페이지</h1>
            
            {/**주문목록 */}
            <div>
                <PayOrderList items={items} cost={cost} getData={getData}/>
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
                <PayFixed cost={cost} />
            </div>
        </div>
    );
};

export default PayPage;