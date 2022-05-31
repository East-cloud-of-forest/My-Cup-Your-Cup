//import { useState } from "react"
import ColorComp from "./ColorComp";
import Memo from "./Memo";
import SelectComp from "./SelectComp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateBack, faArrowRotateForward, faArrowsAltV,faArrowsAltH, faTrash,faPaintBrush } from '@fortawesome/free-solid-svg-icons'

const CreateComp =() =>{

    const optimg = require("./img/1.jpg")

    return (
        <div className="cre_all">

            <div className="cre_result">
                <div className="cre_edit">
                    <div className="cre_editdiv">
                        <FontAwesomeIcon icon={faPaintBrush} className="cre_icon" />
                        새로만들기
                    </div>
                    <div className="cre_editdiv">
                        <FontAwesomeIcon icon={faArrowsAltH} className="cre_icon" />
                        좌우반전
                    </div>
                    <div className="cre_editdiv">
                        <FontAwesomeIcon icon={faArrowsAltV} className="cre_icon" />
                        상하반전
                    </div>
                    <div className="cre_editdiv">
                        <FontAwesomeIcon icon={faArrowRotateBack} className="cre_icon" />
                        왼 회전
                    </div>
                    <div className="cre_editdiv">
                        <FontAwesomeIcon icon={faArrowRotateForward} className="cre_icon" />
                        오른 회전
                    </div>
                    <div className="cre_editdiv">
                        <FontAwesomeIcon icon={faTrash} className="cre_icon" />
                        삭제
                    </div>
                </div>

                <div>
                    <img className="cre_img" src={optimg} alt="" />
                </div>
            </div>


            <div className="cre_opt">
                <h2>상품명</h2>

                <p>색이름</p>

                <div id="colorDiv">
                    <ColorComp/>
                </div>

                <SelectComp/>

                <div className="cre_calc">
                    <p>총 가격</p>
                    <h3>원</h3>
                </div>

                <div id="btn">
                    <div className="cre_prev">미리보기</div>
                    <div className="cre_savepay">
                        <div className="cre_save">저장</div>
                        <div className="cre_pay">결제</div>
                    </div>
                </div>
            </div>

            <Memo/>
        </div>
    )
}

export default CreateComp;