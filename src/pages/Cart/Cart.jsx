import React from 'react';
import ProductComp from '../../components/Cart/ProductComp';
import TotalPriceComp from '../../components/Cart/TotalPriceComp';

function Cart() {
    return (
        <div>
            <h2>장바구니</h2>
            <ProductComp />
            <ProductComp />
            <TotalPriceComp />
            <button>결제하기</button>
        </div>
    );
}

export default Cart;