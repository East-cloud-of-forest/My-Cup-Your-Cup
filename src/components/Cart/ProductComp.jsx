import './ProductComp.scss'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ButtonComp } from '../index-comp/IndexComp';
import { useEffect } from 'react';

function ProductComp({ item, onDeleteItem, onSelectItem, getPrice }) {
    const [ quantity, setQuantity ] = useState(1);
    const price = item.price;
    const totalPrice = price*quantity;
    let formatter = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
    });
    
    const plus = () => {
        setQuantity(quantity + 1);;
    }
    const minus = () => {
        setQuantity(quantity - 1);
        
    }
    const onChange = () => {
        onSelectItem(item.id);
        console.log(item)
        if (item.selected == true) {
            getPrice(totalPrice);
        } else { getPrice(0) }
    };

    useEffect( () => {
        if(item.selected == true) {
            getPrice(totalPrice)
        }
    }, [totalPrice])


    return (
        <div className="product-container">
            <input id='itemCheckbox' 
                type="checkbox" 
                onChange={onChange}
                checked={item.selected}
                ></input>
            <img src={item.image} alt="product-pic"></img>
            <div className='product-text'>
                <h4 className='product-title'>주문상품 {item.id} </h4>
                <p>
                    색상: {item.color}
                    재질: {item.material} <br/>
                    용량: {item.size} <br/> 
                    빨대: {item.strow} </p>

                <div className="product-quantity">
                        <ButtonComp icon>
                            <FontAwesomeIcon icon={solid("minus")} onClick={minus}/>
                        </ButtonComp>
                        <input id="qtyForm" type="number" value={quantity} required  
                            onChange={ ()=> setQuantity(quantity)} min="1" />
                        <ButtonComp  icon>
                            <FontAwesomeIcon icon={solid("plus")} onClick={plus}/>
                        </ButtonComp>
                    
                </div>
            </div>
            <div className='mdButtons'>
                    <ButtonComp icon>
                        <FontAwesomeIcon icon={solid("pen-to-square")} />
                    </ButtonComp>
                    <ButtonComp icon onClick={()=> onDeleteItem(item.id)}>
                        <FontAwesomeIcon icon={solid("trash-can")} />
                    </ButtonComp>
            </div>
            <p className='product-price'>{ formatter.format(totalPrice) }</p>
        </div>
    );
}

export default ProductComp;