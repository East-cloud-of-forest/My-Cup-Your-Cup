import './ProductComp.scss'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ButtonComp } from '../index-comp/IndexComp';
import { useNavigate } from 'react-router-dom';


function ProductComp({ item, onDeleteItem, onSelectItem, onPlusOne, onMinusOne, idx, PopUp }) {
    const [q, setQ] = useState();
    const quantity= item.quantity;
    let formatter = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
    });
    
    const plus = () => {
        onPlusOne(item.id);
    };
    const minus = () => {
        onMinusOne(item.id);
    };

    const onSelect = () => {
        onSelectItem(item.id);
    };
    const onDelete = () => {
        let id = item.id;
        onDeleteItem(id);
        //window.localStorage.removeItem('cart', JSON.stringify(item[id-1]));
    }

    const navigate = useNavigate();

    return (
        <>
        {
            PopUp ? (
                <div className="popup_container">
                    <img className='popup_img' src={item.image} alt={item.name} />
                        <div className='popup_text'>
                            <p className="popup_title">{item.name}</p>
                            <p className="popup_options">
                                색상: {item.color} <br/>
                                모양: {item.shape} <br />
                                재질: {item.material} <br/>
                                용량: {item.size} <br/> 
                                빨대: {item.strow} <br/>
                                수량: {item.quantity}
                            </p>
                        </div>
                        
                        <div>
                            <p className='popup_price'>{ formatter.format(item.total) }</p>
                            <ButtonComp icon onClick={onDelete}>
                                <FontAwesomeIcon icon={solid("trash-can")} />
                            </ButtonComp>
                        </div>
                </div>
            ) : (
            <div className="product-container">
                <input id='itemCheckbox' 
                    type="checkbox" 
                    onChange={onSelect}
                    checked={item.selected}
                    ></input>
                <label htmlFor='itemCheckbox' />
                <img src={item.image} alt="product-pic"></img>
                <div className='product-text'>
                    <h4 className='product-title'> {`${idx+1}. ${item.name}`} </h4>
                    <p>
                        색상: {item.color} <br/>
                        모양: {item.shape} <br />
                        재질: {item.material} <br/>
                        용량: {item.size} <br/> 
                        빨대: {item.strow} </p>

                    <div className="product-quantity">
                            <ButtonComp icon>
                                <FontAwesomeIcon icon={solid("minus")} onClick={()=> {
                                    if(quantity>1){
                                        minus();
                                    }
                                }}/>
                            </ButtonComp>
                            <input
                                disabled
                                style={{border:0, fontWeight:'bold'}} 
                                id="qtyForm"
                                type="text"
                                value={quantity} 
                                required  
                                onChange={()=> setQ(quantity) } min="1" />
                            <ButtonComp  icon>
                                <FontAwesomeIcon icon={solid("plus")} onClick={plus}/>
                            </ButtonComp>
                        
                    </div>
                </div>
                <div className='mdButtons'>
                        <ButtonComp icon onClick={()=>{navigate(-1)}}>
                            <FontAwesomeIcon icon={solid("pen-to-square")} />
                        </ButtonComp>
                        <ButtonComp icon onClick={onDelete}>
                            <FontAwesomeIcon icon={solid("trash-can")} />
                        </ButtonComp>
                </div>
                <p className='product-price'>{ formatter.format(item.total) }</p>
            </div>
            )
            }
        </>
    );
}

export default ProductComp;