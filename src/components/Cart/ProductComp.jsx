import './ProductComp.scss'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ButtonComp } from '../index-comp/IndexComp';

function ProductComp() {
    return (
        <div className="product-container">
            
                {/* 임시 체크박스 수정할 것 */}
            <input id='itemCheckbox' type="checkbox"></input>
            <img src='https://cdn.pixabay.com/photo/2021/04/06/03/07/souvenir-6155134__340.jpg' alt='product-preview'></img>
            <div className='product-text'>
                <h4 className='product-title'>Product Title</h4>
                <p>재질: 스테인리스<br/>용량: 대<br/> 빨대: 미사용</p>

                <div className="product-quantity">
                        <ButtonComp icon>
                            <FontAwesomeIcon icon={solid("minus")} />
                        </ButtonComp>
                        <input id="qtyForm" type="text" required />{/* input form으로 바꿀것 */}
                        <ButtonComp icon>
                            <FontAwesomeIcon icon={solid("plus")} />
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
            
            <p className='product-price'>80,000 원</p>
            
        </div>
    );
}

export default ProductComp;