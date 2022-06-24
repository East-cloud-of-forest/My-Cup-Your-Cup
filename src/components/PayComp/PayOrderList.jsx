import React from "react";

const PayOrderList = ({selected, totalPrice}) => {
    return (
        <div>
            <div className="pay_div">
                <h3 className="pay_title">주문 목록</h3>
                <hr className="pay_main_hr"/>
                    <div className="pay_list">
                        {
                            selected.map( (item, i) => (
                                <div className="pay_product" key={i}>
                                    <img className="pay_thumb" src={item.image} alt={item.name }/>
                                    <div className="pay_product_content">
                                        <p>[상품명] {`${item.name} [옵션] ${item.material} /${item.size} /빨대유무${item.strow}`}</p>
                                        
                                        <p>{item.total.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                <hr className="pay_main_hr"/>
                <h4 className="pay_cost">총 <span>{(totalPrice + 2500).toLocaleString()}</span> 원</h4>
            </div>
        </div>
    );
};

export default PayOrderList;