import { useEffect } from "react";
import React from "react";

const PayOrderList = ({items, cost, getData}) => {

    let payCost = 0
    for (let i = 0; i < items.length; i++) {
        payCost=payCost+items[i].total;
    };
    
    useEffect(()=>{
        cost=payCost;
        getData(cost);
    },[payCost])

    return (
        <div>
            <div className="pay_div">
                <h3 className="pay_title">주문 목록</h3>
                <hr className="pay_main_hr"/>
                    <div className="pay_list">
                        {
                            items.map( (item, i) => (
                                <div className="pay_product" key={i}>
                                    <img className="pay_thumb" src={item.image} alt={item.name }/>
                                    <div className="pay_product_content">
                                        <p>[상품명] {`${item.name} [옵션] ${item.material} ${item.size} 빨대 ${item.strow}`}</p>
                                        <p>{item.total}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                <hr className="pay_main_hr"/>
                <h4 className="pay_cost">총 {payCost+2500} 원</h4>
            </div>
        </div>
    );
};

export default PayOrderList;