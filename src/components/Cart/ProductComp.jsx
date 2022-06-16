import './ProductComp.scss'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ButtonComp } from '../index-comp/IndexComp';
import { useContext } from 'react';
import DataContext from '../../modules/cupInfo';

function ProductComp({ title, options, price, image }) {
    const [ quantity, setQuantity ] = useState(1);
    const data = useContext(DataContext)

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

    return (
        <div className="product-container">

                {/* 임시 체크박스 수정할 것 */}
            <input id='itemCheckbox' type="checkbox" ></input>
            <img src='https://cdn.pixabay.com/photo/2021/04/06/03/07/souvenir-6155134__340.jpg' alt='product-preview'></img>
            <div className='product-text'>
                <h4 className='product-title'>Product Title</h4>
                <p>
                    재질: {data.state.material}<br/>
                    용량: {data.state.size}<br/> 
                    빨대: {data.state.strow}</p>

                <div className="product-quantity">
                        <ButtonComp icon>
                            <FontAwesomeIcon icon={solid("minus")} onClick={minus}/>
                        </ButtonComp>
                        <input id="qtyForm" type="number" required value={quantity} min="1" />
                        <ButtonComp  icon>
                            <FontAwesomeIcon icon={solid("plus")} onClick={plus}/>
                        </ButtonComp>
                    
                </div>
            </div>
            <div className='mdButtons'>
                    <ButtonComp icon>
                        <FontAwesomeIcon icon={solid("pen-to-square")} />
                    </ButtonComp>
                    <ButtonComp icon>
                        <FontAwesomeIcon icon={solid("trash-can")} />
                    </ButtonComp>
            </div>
            <p className='product-price'>{ formatter.format(data.state.price*quantity) }</p>
        </div>
    );
}

export default ProductComp;