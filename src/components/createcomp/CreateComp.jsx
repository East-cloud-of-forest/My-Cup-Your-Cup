//import { useState } from "react"
import ColorComp from "./ColorComp";
import Memo from "./Memo";
import SelectComp from "./SelectComp";
import img from './img/1.jpg'

const CreateComp =() =>{

    return (
        <div className="cre_all">

            <div className="cre_result">
                <div id="edit">편집아이콘</div>

                <div>
                    <img className="cre_img" src={img} alt="" />
                </div>
            </div>


            <div className="cre_opt">
                <h2>상품명</h2>

                <p>색이름</p>

                <div id="colorDiv">
                    <ColorComp/>
                </div>

                <SelectComp/>

                <div id="calc">
                    <p>총 가격</p>
                    <h3>원</h3>
                </div>

                <div id="btn">
                    <div className="cre_prev">미리보기</div>
                    <div className="cre_ar">
                        <div className="cre_save">저장</div>
                        <div className="cre_pay">결제</div>
                    </div>
                </div>
            </div>


            <hr />
            <Memo/>
        </div>
    )
}

export default CreateComp;