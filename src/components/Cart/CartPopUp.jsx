import React from 'react';
import ProductComp from './ProductComp';
import { useSelector } from 'react-redux'
import { ButtonComp } from '../index-comp/IndexComp';
import { useNavigate } from 'react-router-dom';

function CartPopUp(props) {
    const {items} = useSelector( (state)=> ({ items : state.cartReducer.items}) )
    const navigate = useNavigate();

    return (
        <div>
            <h4>장바구니</h4>
            {
                items.length >= 1 ? 
                    <div>
                        {items.map( item => (
                            <ProductComp PopUp item={item} key={item.id}/> ))
                        }
                        <ButtonComp onClick={()=>{
                            navigate('/cart'); // 모달창 닫게 하기
                        }}>
                            장바구니 보기</ButtonComp>
                        <ButtonComp onClick={()=>{
                            navigate('/pay');
                        }}>
                            결제</ButtonComp>
                    </div>
                    
                : ( <p style={{ textAlign: "center" }}>장바구니가 비어있습니다!</p> )
                
            }
        </div>
    );
}

export default CartPopUp;