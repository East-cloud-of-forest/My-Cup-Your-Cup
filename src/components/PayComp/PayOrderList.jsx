<<<<<<< HEAD
import React from "react";

const PayOrderList = ({selected, totalPrice}) => {
=======
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

>>>>>>> 1f7aef9081c865fd38508bbbc70929c931aa641e
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
<<<<<<< HEAD
                <h4 className="pay_cost">총 <span>{(totalPrice + 2500).toLocaleString()}</span> 원</h4>
=======
                <h4 className="pay_cost">총 {payCost+2500} 원</h4>
>>>>>>> 1f7aef9081c865fd38508bbbc70929c931aa641e
            </div>
        </div>
    );
};

export default PayOrderList;