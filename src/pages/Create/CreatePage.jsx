import "./Create.scss";
import ColorComp from "../../components/createcomp/ColorComp";
import SelectComp from "../../components/createcomp/SelectComp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateBack, faArrowRotateForward, faArrowsAltV,faArrowsAltH, faTrash,faPaintBrush, faWhiskeyGlass, faFileArrowUp, faFont, faStar, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { ButtonComp } from '../../components/index-comp/IndexComp'
import { useState, useRef } from "react";
import React from "react";

const CreatePage =() =>{

    const optimg = require("../../components/createcomp/img/1.jpg")

    //아이콘 변경 및 레이어 visible 함수 (faEye는 보이는 상태, faEyeSlash는 안보이는 상태)
    const [basicIcon,setBasicIcon] = useState(faEye)
    const changeIcon = () => {
        if(basicIcon===faEye){
        setBasicIcon(faEyeSlash)}
        else {
            setBasicIcon(faEye)
        }
    }

    //아코디언 버튼
    const parentRef = React.useRef(null);
    const childRef = React.useRef(null);

    const [open,setOpen] = useState(false);

    const openClick=()=>{
        if(parentRef.current.clientWidth>0){
            parentRef.current.style.width="0";
        }else{
            parentRef.current.style.width=`${childRef.current.clientWidth}px`
        };
        setOpen(!open);
    }

    
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
                <div className="cre_mainImg">
                    <img className="cre_img" src={optimg} alt="" />

                    {/**에딧 2 */}
                    <div className="cre_acc">

                        <div className="cre_acc_clicked" ref={parentRef}>
                            <div className="cre_acc_display" ref={childRef}>
                                <div className="cre_acc_icon">
                                    <FontAwesomeIcon icon={faFont} className="cre_icon2" />
                                    텀블러 1
                                </div>
                                <div className="cre_acc_icon">
                                    <FontAwesomeIcon icon={faFont} className="cre_icon2" />
                                    텀블러 2
                                </div>
                                <div className="cre_acc_icon">
                                    <FontAwesomeIcon icon={faFont} className="cre_icon2" />
                                    텀블러 3
                                </div>
                            </div>
                        </div>

                        <div className="cre_acc_click">
                            <FontAwesomeIcon icon={faWhiskeyGlass} className="cre_icon2" onClick={openClick}/>
                            텀블러변경
                        </div>

                    </div>


                    <div className="cre_edit2">
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

                    {/**레이어 창*/}
                    <div className="cre_layer_div">
                        <div className="cre_layer_title">레이어 관리</div>
                        <div className="cre_layers">
                            {/**반복해서 추가 될 레이어 div */}
                            <div className="cre_layer">레이어1<FontAwesomeIcon icon={basicIcon} className="cre_layer_icon" onClick={changeIcon} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div className="cre_opt">
                <h2>상품명</h2>

                <p>색이름</p>

                <div className="cre_colorDiv">
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

export default CreatePage;