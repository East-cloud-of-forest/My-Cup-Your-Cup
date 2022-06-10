import React from 'react';
import ProductComp from '../../components/Cart/ProductComp';
import TotalPriceComp from '../../components/Cart/TotalPriceComp';

function Cart() {
    return (
        <div>
            <h2 style={{
                margin: "50px 0 0 50px"
            }}>장바구니</h2>
            {/* 레이아웃 참고를 위해 임시로 생성한 인풋텍스트입니다 */}
            <input type="checkbox" style={{ margin: "50px 0 0 50px" }}/> 전체선택

            <ProductComp />
            <ProductComp />
            <TotalPriceComp />
            <button>결제하기</button>
        </div>
    );
}

export default Cart;