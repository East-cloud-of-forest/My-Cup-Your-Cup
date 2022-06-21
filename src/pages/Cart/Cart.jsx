import React, {useCallback, useState} from 'react';
import './Cart.scss'
import ProductComp from '../../components/Cart/ProductComp';
import TotalPriceComp from '../../components/Cart/TotalPriceComp';
import { ButtonComp } from '../../components/index-comp/IndexComp';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, selectItem } from "../../modules/addCart"
import { useNavigate } from 'react-router-dom';

function Cart() { 
    const {items} = useSelector( (state) => ({ items : state.cartReducer.items }) );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onDeleteItem = useCallback( (id)=>dispatch(deleteItem(id)), [dispatch]);
    const onSelectItem = useCallback( (id)=>dispatch(selectItem(id)), [dispatch]);
    
    // 총상품가격 받아오기
    const getPrice = (id, price) => {
        // 각 컴포넌트에서 받아온 가격을 어디다 저장해둬야하는데..
        // 컴포넌트에 해당하는 상품의 아이디와 총 가격을 인수로 받아오면 ?? 어디에저장...?
    }

    // const selectAll = (selectAll) => {
    //     const checkboxes = document.getElementByName('checkbox')
    //     checkboxes.forEach( (checkbox) => {
    //         checkbox.checked = selectAll.checked;
    //     })
    // }
    console.log(items)
    return (
        <div className='cart-container'>
            <div className="item">
                <h2>장바구니</h2>
            </div>
            <div className="item"></div>

            <div className="item">
                {/* 상품 출력되는 곳 */}
                <input type="checkbox" style={{ margin: "50px 0 0 50px" }}
                    // onClick={selectAll(this)}
                /> 전체선택
                {
                    items.length >=1 ? (
                    items.map( (item) => ( 
                        <ProductComp 
                            item={item}
                            key={item.id}
                            onDeleteItem={onDeleteItem}
                            onSelectItem={onSelectItem}
                            // selectAll={selectAll}
                        /> 
                    ))
                    ) : (
                        <p style={{ margin: "50px 0 0 50px" }}>장바구니가 비어있습니다.</p>
                    )
                }
            </div> 
            <div className="item">
                {/* 가격 출력되는 곳 */}
                <TotalPriceComp />
                <div className='buttons'>
                    {/* 이전에 저장된 데이터 뜨게 하려면?? -> 수정 버튼에서 구현 */}
                    <ButtonComp color="mint" onClick={()=> navigate(-1)}>
                        이전
                    </ButtonComp>
                    <ButtonComp color="red">결제하기</ButtonComp>
                </div>
                
            </div>
        </div>
    );
}

export default Cart;