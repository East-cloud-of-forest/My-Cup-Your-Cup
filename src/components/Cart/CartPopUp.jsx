import React from 'react';
import './CartPopUp.scss';
import ProductComp from './ProductComp';
import { useSelector, useDispatch } from 'react-redux'
import { ButtonComp } from '../index-comp/IndexComp';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { deleteItem } from '../../modules/addCart';
import { useEffect } from 'react';

function CartPopUp({handleClick}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {items} = useSelector( (state) => ({ items : state.cartReducer.items}) );
    const onDeleteItem = useCallback( (id) => dispatch(deleteItem(id)) );
    
    // useEffect( (e) => {
    //     handleClick(e)
    // }, [items])

    const emptyStyle = {
        textAlign: "center",
        position: "relative",
        top: "50px",
    }

    return (
        <div className='popup_content'>
            <h4>장바구니</h4>
            {
                items.length >= 1 ? 
                    <div>
                        {items.map( item => (
                            <ProductComp PopUp item={item} key={item.id} onDeleteItem={onDeleteItem}/> ))
                        }
                        <div className='btn_block'>

                            <ButtonComp color="brown" onClick={()=>{
                                navigate('/cart');
                                document.body.click();
                            }}>
                                장바구니 보기
                            </ButtonComp>
                            <ButtonComp color="darkgreen" onClick={()=>{
                                navigate('/pay');
                                document.body.click();
                            }}>
                                결제하기
                            </ButtonComp>
                        </div>
                    </div>
                    
                : ( <div style={emptyStyle}>
                        <p >장바구니가 비어있습니다!</p>
                        <ButtonComp color="mint" onClick={()=>{
                            navigate('/create');
                            document.body.click();
                            }}>
                                제작하러 가기
                        </ButtonComp>
                    </div>
                )
                
            }
        </div>
    );
}

export default CartPopUp;