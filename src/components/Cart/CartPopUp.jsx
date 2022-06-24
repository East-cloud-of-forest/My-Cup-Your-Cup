import React from 'react';
import ProductComp from './ProductComp';
import { useSelector } from 'react-redux'
import { ButtonComp } from '../index-comp/IndexComp';

function CartPopUp(props) {
    const {items} = useSelector( (state)=> ({ items : state.cartReducer.items}) )
    return (
        <div>
            <h1>장바구니</h1>
            {
                items.length >= 1 ? (
                    items.map( item => (<ProductComp popUp item={item} key={item.id}/> ))
                )
                : ( <p style={{ textAlign: "center" }}>장바구니가 비어있습니다!</p>)
                
            }
        </div>
    );
}

export default CartPopUp;