import React from 'react';
import './Cart.scss'
import ProductComp from '../../components/Cart/ProductComp';
import TotalPriceComp from '../../components/Cart/TotalPriceComp';

function Cart() {


    return (
        <div className='cart-container'>
            <h2 style={{
                margin: "50px 0 0 50px"
            }}>장바구니</h2>

            <input type="checkbox" style={{ margin: "50px 0 0 50px" }}/> 전체선택
            
            <ProductComp  />

            <TotalPriceComp />
            
            <button>결제하기</button>
        </div>
    );
}

export default Cart;