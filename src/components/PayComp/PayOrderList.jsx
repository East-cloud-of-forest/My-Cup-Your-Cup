import { useEffect } from "react";
import { IMAGES } from "../../images";
import React from "react";

const PayOrderList = ({cost, getData}) => {

    let payCost = 0;

    const paySumRef = React.useRef();

    useEffect(()=>{
        IMAGES.map((image,i)=>{
            for (let index = 0; index < IMAGES.length; index++) {
                payCost = payCost + IMAGES[index].id*10000/IMAGES.length;
            }
            cost=payCost;
            getData(cost);
            paySumRef.current.innerHTML=`${payCost}`;
        })
    })

    return (
        <div>
            <div className="pay_div">
                <h3 className="pay_title">주문 목록</h3>
                <hr className="pay_main_hr"/>
                    <div className="pay_list">
                        {
                            IMAGES.map((image,i)=>(
                                <div className="pay_product" key={i}>
                                    <img className="pay_thumb" src={IMAGES[i].src} alt={IMAGES[i].title }/>
                                    <div className="pay_product_content">
                                        <p>스테인리스, 용량 대, 빨대 사용</p>
                                        <p>{IMAGES[i].id*10000}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                <hr className="pay_main_hr"/>
                <h4 className="pay_cost">총 <span ref={paySumRef}></span> 원</h4>
            </div>
        </div>
    );
};

export default PayOrderList;