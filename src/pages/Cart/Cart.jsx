import React from 'react';
import './Cart.scss'
import ProductComp from '../../components/Cart/ProductComp';
import TotalPriceComp from '../../components/Cart/TotalPriceComp';
import { ButtonComp } from '../../components/index-comp/IndexComp';

function Cart({ items, addedItem, onDelete }) { 
    return (
        <div className='cart-container'>
            <div className="item">
                <h2>장바구니</h2>
            </div>
            <div className="item"></div>

            <div className="item">
                {/* 상품 출력되는 곳 */}
                <input type="checkbox" style={{ margin: "50px 0 0 50px" }}/> 전체선택
                {
                    // items.map( (item, id) => 
                    //     <ProductComp key={id} id={id} items={item}
                    //         onDelete={onDelete(id)}
                    //     />
                    // )
                }
            </div> 
            <div className="item">
                {/* 가격 출력되는 곳 */}
                <TotalPriceComp />
                <div className='buttons'>
                    <ButtonComp>이전</ButtonComp>
                    <ButtonComp>결제하기</ButtonComp>
                </div>
                
            </div>
        </div>
    );
}

export default Cart;