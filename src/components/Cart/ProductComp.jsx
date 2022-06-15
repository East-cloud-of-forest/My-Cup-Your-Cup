import './ProductComp.scss'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ButtonComp } from '../index-comp/IndexComp';

function ProductComp() {
    const [ quantity, setQuantity ] = useState(1);
    const [ price, setPrice ] = useState(15000);
    let formatter = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
    });

    return (
        <div className="product-container">

                {/* 임시 체크박스 수정할 것 */}
            <input id='itemCheckbox' type="checkbox" ></input>
            <img src='https://cdn.pixabay.com/photo/2021/04/06/03/07/souvenir-6155134__340.jpg' alt='product-preview'></img>
            <div className='product-text'>
                <h4 className='product-title'>Product Title</h4>
                <p>재질: 스테인리스<br/>용량: 대<br/> 빨대: 미사용</p>

                <div className="product-quantity">
                        <ButtonComp icon>
                            <FontAwesomeIcon icon={solid("minus")} onClick={() => {
                                setQuantity(quantity - 1);
                            }}/>
                        </ButtonComp>
                        <input id="qtyForm" type="number" required placeholder={quantity} min="1"/>
                        <ButtonComp icon>
                            <FontAwesomeIcon icon={solid("plus")} onClick={() => {
                                setQuantity(quantity + 1);
                            }}/>
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
                
            {/* 
                quantity 증가될때 가격도 같이 올라가도록 설정하기 

                
            */}
            <p className='product-price'>{ formatter.format(price) }</p>
                
        </div>
    );
}

export default ProductComp;