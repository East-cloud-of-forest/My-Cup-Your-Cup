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
    const onSelectItem = useCallback( (id, total)=>dispatch(selectItem(id, total)), [dispatch]);
    
    // 총상품가격 - items 중 selected==true 인 객체의 total을 가져와 전부 더하기
    let selected = items.filter( item => item.selected == true );
    console.log(selected); // 선택된 애들만 배열로 들어옴
    let sum = 0;
    selected.forEach( item => sum += item );
    console.log(sum.toString()); 

    // const selectAll = (selectAll) => {
    //     const checkboxes = document.getElementByName('checkbox')
    //     checkboxes.forEach( (checkbox) => {
    //         checkbox.checked = selectAll.checked;
    //     })
    // }

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
                <TotalPriceComp items={items} />
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