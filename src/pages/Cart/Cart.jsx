import React, {useCallback, useState} from 'react';
import './Cart.scss'
import ProductComp from '../../components/Cart/ProductComp';
import TotalPriceComp from '../../components/Cart/TotalPriceComp';
import { ButtonComp } from '../../components/index-comp/IndexComp';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, selectItem } from "../../modules/addCart"

function Cart() { 
    const {items} = useSelector( (state) => ({ items : state.cartReducer.items }) );
    const dispatch = useDispatch();
    const onDeleteItem = useCallback( (id)=>dispatch(deleteItem(id)), [dispatch]);
    const onSelectItem = useCallback( (id)=>dispatch(selectItem(id)), [dispatch]);
    
    // 총상품가격 받아오기
    const [ prices, setPrices ] = useState();
    const getPrice = (price) => {


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
                            getPrice={getPrice}
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
                    <ButtonComp color="mint">이전</ButtonComp>
                    <ButtonComp color="red">결제하기</ButtonComp>
                </div>
                
            </div>
        </div>
    );
}

export default Cart;