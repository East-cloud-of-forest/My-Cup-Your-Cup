import React, {useCallback, useState} from 'react';
import './Cart.scss'
import ProductComp from '../../components/Cart/ProductComp';
import TotalPriceComp from '../../components/Cart/TotalPriceComp';
import { ButtonComp } from '../../components/index-comp/IndexComp';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, minusOne, plusOne, selectItem, numberInput } from "../../modules/addCart"
import { useNavigate } from 'react-router-dom';

function Cart() { 
    const {items} = useSelector( (state) => ({ items : state.cartReducer.items }) );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onDeleteItem = useCallback( (id)=>dispatch(deleteItem(id)), [dispatch]);
    const onSelectItem = useCallback( (id)=>dispatch(selectItem(id)), [dispatch]);
    const onPlusOne = useCallback( (id)=>dispatch(plusOne(id)), [dispatch]);
    const onMinusOne = useCallback( (id)=>dispatch(minusOne(id)), [dispatch]);
    //const onInput = useCallback( (id, number) => dispatch(numberInput(id, number)), [dispatch]);
    
    // 총상품가격 - items 중 selected==true 인 객체의 total을 가져와 전부 더하기
    // let selected = items.filter( item => item.selected === true );
    // console.log("선택상품"+selected); // 선택된 애들만 배열로 들어옴
    // let sum = 0;
    // selected.forEach( item => sum += item );

    // 결제페이지로 이동
    const toPayment = () => {
        navigate('/pay');
    }

    return (
        <div className='cart-container'>
            <div className="item">
                <h2>장바구니</h2>
            </div>
            <div className="item"></div>

            <div className="item">
                {/* 상품 출력되는 곳 */}
                <input type="checkbox" style={{ margin: "50px 0 0 50px" }}
                /> 전체선택
                {
                    items.length >=1 ? (
                    items.map( (item) => ( 
                        <ProductComp 
                            item={item}
                            key={item.id}
                            onDeleteItem={onDeleteItem}
                            onSelectItem={onSelectItem}
                            onPlusOne={onPlusOne}
                            onMinusOne={onMinusOne}
                            //onInput={onInput}
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
                    <ButtonComp color="mint" onClick={()=> navigate('/')}>
                        취소
                    </ButtonComp>
                    <ButtonComp onClick={toPayment} color="red">결제하기</ButtonComp>
                </div>
                
            </div>
        </div>
    );
}

export default Cart;