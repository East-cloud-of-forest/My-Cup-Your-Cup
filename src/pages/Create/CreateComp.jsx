//import { useState } from "react"
import "./Create.scss";
import ColorComp from "../../components/createcomp/ColorComp";
import SelectComp from "../../components/createcomp/SelectComp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateBack, faArrowRotateForward, faArrowsAltV,faArrowsAltH, faTrash,faPaintBrush, faWhiskeyGlass, faFileArrowUp, faFont, faStar } from '@fortawesome/free-solid-svg-icons'
import { ButtonComp } from '../../components/index-comp/IndexComp'

const CreateComp =() =>{

    const optimg = require("../../components/createcomp/img/1.jpg")

    return (
        <div className="cre_all">

            {/**제작화면 */}
            <div className="cre_result">

                {/**에딧 아이콘 */}
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


                {/**메인이미지 */}
                <div className="mainImg">
                    <img className="cre_img" src={optimg} alt="" />

                    {/**에딧 2 */}
                    <div className="cre_edit2">
                        <div className="cre_editdiv2">
                            <FontAwesomeIcon icon={faWhiskeyGlass} className="cre_icon2" />
                            텀블러변경
                        </div>
                        <div className="cre_editdiv2">
                            <FontAwesomeIcon icon={faFileArrowUp} className="cre_icon2" />
                            이미지 업로드
                        </div>
                        <div className="cre_editdiv2">
                            <FontAwesomeIcon icon={faFont} className="cre_icon2" />
                            텍스트 추가
                        </div>
                        <div className="cre_editdiv2">
                            <FontAwesomeIcon icon={faStar} className="cre_icon2" />
                            무료 디자인
                        </div>
                    </div>
                </div>
            </div>


            <div className="cre_opt">
                <h2>상품명</h2>

                <p>색이름</p>

                <div id="colorDiv">
                    <ColorComp/>
                </div>

                <SelectComp/>

                <div id="btn">
                    <ButtonComp>미리보기</ButtonComp>
                <div className="cre_savepay">
                    <ButtonComp style={{width:'100%'}}>저장</ButtonComp>
                    <ButtonComp style={{width:'100%'}}>결제</ButtonComp>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CreateComp;