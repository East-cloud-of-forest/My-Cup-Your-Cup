import React, {useCallback, useState} from 'react';
import './Cart.scss'
import ProductComp from '../../components/Cart/ProductComp';
import TotalPriceComp from '../../components/Cart/TotalPriceComp';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, minusOne, plusOne, selectItem } from "../../modules/addCart"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Cart() { 
    const {items} = useSelector( (state) => ({ items : state.cartReducer.items }) );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onDeleteItem = useCallback( (id)=>dispatch(deleteItem(id)), [dispatch]);
    const onSelectItem = useCallback( (id)=>dispatch(selectItem(id)), [dispatch]);
    const onPlusOne = useCallback( (id)=>dispatch(plusOne(id)), [dispatch]);
    const onMinusOne = useCallback( (id)=>dispatch(minusOne(id)), [dispatch]);
    
    console.log(items);
    // 로컬스토리지에 저장 - 최상위컴포넌트에 작성할 것
    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(items))
    }, [])
        // JSON.parse( window.localStorage.getItem('cart'))

    return (
        <div className='cart-container'>
            <div className="item">
                <h2>장바구니</h2>
            </div>
            <div className="item"></div>

            <div className="item">
                {/* 상품 출력되는 곳 */}
                <input type="checkbox" style={{ margin: "50px 0 0 50px" }}/>전체선택
                {
                    // itemsInStorage.length >=1 ? (
                    //     itemsInStorage.map( (item, i) => (
                    //         <ProductComp
                    //         item={item}
                    //         key={item.id}
                    //         onDeleteItem={onDeleteItem}
                    //         onSelectItem={onSelectItem}
                    //         onPlusOne={onPlusOne}
                    //         onMinusOne={onMinusOne}
                    //         //onInput={onInput}
                    //         idx={i}
                    //     />
                    //     ))
                    // ) : (<p style={{ margin: "50px 0 50px 50px" }}>장바구니가 비어있습니다.</p>)
                }
                {
                    items.length >=1 ? (
                    items.map( (item, i) => ( 
                        <ProductComp
                            item={item}
                            key={item.id}
                            onDeleteItem={onDeleteItem}
                            onSelectItem={onSelectItem}
                            onPlusOne={onPlusOne}
                            onMinusOne={onMinusOne}
                            idx={i}
                        />
                    ))
                    ) : (
                        <p style={{ margin: "50px 0 50px 50px" }}>장바구니가 비어있습니다.</p>
                    )
                }
            </div> 
            <div className="item">
                {/* 가격 출력되는 곳 */
                    (items.length >=1 ) && (<TotalPriceComp items={items}/>) 

                
                }
                
            </div>
        </div>
    );
}

export default Cart;