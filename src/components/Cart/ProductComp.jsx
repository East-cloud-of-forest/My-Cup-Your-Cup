import React from 'react';

function ProductComp() {
    return (
        <div className="product-container">
            {/* 임시 체크박스 수정할 것 */}
            <input type="checkbox"></input>
            <img src='' alt='product-preview'></img>
            <h4>Product Title</h4>
            {/* 버튼 아이콘으로 적용할것 */}
            <button>M</button>
            <button>D</button>

            <p>재질: 스테인리스<br/>용량: 대<br/> 빨대: 미사용</p>
            
            <div className="product-quantity">
                <p>
                    <button>-</button>
                    <span>4</span> {/* input form으로 바꿀것 */}
                    <button>+</button>
                </p>
            </div>

            <p>80,000 원</p>
        </div>
    );
}

export default ProductComp;