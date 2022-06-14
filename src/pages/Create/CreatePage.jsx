import "./Create.scss";
import ColorComp from "../../components/createcomp/ColorComp";
import SelectComp from "../../components/createcomp/SelectComp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateBack, faArrowRotateForward, faArrowsAltV,faArrowsAltH, faTrash,faPaintBrush, faWhiskeyGlass, faFileArrowUp, faFont, faStar, faEye, faEyeSlash,fa1,fa2,fa3 } from '@fortawesome/free-solid-svg-icons'
import { ButtonComp } from '../../components/index-comp/IndexComp'
import { useState } from "react";
import React from "react";
import classNames from "classnames";
import { useEffect } from "react";

const CreatePage =() =>{
    
    //아이콘 변경 및 레이어 visible 함수 (faEye는 보이는 상태, faEyeSlash는 안보이는 상태)
    const [basicIcon,setBasicIcon] = useState(faEye)
    const changeIcon = () => {
        if(basicIcon===faEye){
            setBasicIcon(faEyeSlash)}
        else {
            setBasicIcon(faEye)
        }
    }
    
    //재질 prop 받아오는 함수
    const [material,setMaterial] = useState("")
    
    const getTypeData = (material) =>{
        setMaterial(material);
    };

    const [color,setColor] = useState("")

    //아코디언 버튼
    const parentRef = React.useRef();
    const childRef = React.useRef();
    const [active, setActive] = useState(false)
    const [display, setDisplay] = useState(true)
    const timeToggle = function(kind, time) {
        setTimeout(()=>{
            kind === 'active'? setActive(!active) : setDisplay(!display)
        },time)
    }
    
    const openClick=()=>{
        // if(parentRef.current.clientWidth>0){
        //     parentRef.current.style.width="0";
        // }else{
        //     parentRef.current.style.width=`${childRef.current.clientWidth}px`
        // };
        clearTimeout(timeToggle)
        if (display) {
            setDisplay(!display)
            timeToggle('active', 0)
        } else {
            setActive(!active)
            timeToggle('display', 500)
        }
    }


    //아코디언 내용 변경
    const [tumType,setTumType] = useState("");

    const [pic,setPic] = useState("1")

    const changeTum=(e)=>{
        setPic(e.currentTarget.id)
        // console.log(e.target)
        // console.log(e.currentTarget)
    }

    useEffect(()=>{
        if(material==="pla"){
            setTumType (
                <div className="cre_acc_display" ref={childRef}>
                    <div className="cre_acc_icon" id="pla_1" onClick={changeTum}>
                        <FontAwesomeIcon icon={fa1} className="cre_icon2" />
                        플라스틱1
                    </div>
                    <div className="cre_acc_icon" id="pla_2" onClick={changeTum}>
                        <FontAwesomeIcon icon={fa2} className="cre_icon2" />
                        플라스틱2
                    </div>
                </div>
            );
            setPic("pla_1");
        }else if(material==="stain"){
            setTumType (
                <div className="cre_acc_display" ref={childRef}>
                    <div className="cre_acc_icon" id="stain_1" onClick={changeTum}>
                        <FontAwesomeIcon icon={fa1} className="cre_icon2" />
                        스테인리스1
                    </div>
                    <div className="cre_acc_icon" id="stain_2" onClick={changeTum}>
                        <FontAwesomeIcon icon={fa2} className="cre_icon2" />
                        스테인리스2
                    </div>
                    <div className="cre_acc_icon" id="stain_3" onClick={changeTum}>
                        <FontAwesomeIcon icon={fa3} className="cre_icon2" />
                        스테인리스3
                    </div>
                </div>
            );
            setPic("stain_1")
        }else{
            setTumType("")
        }
    },[material])

    //메인이미지 선언
    const optimg = require(`../../components/createcomp/img/${pic}.png`)

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

                        <div className={
                            classNames("cre_acc_clicked ", active?"active":null, display?"displaynone":null)} 
                            ref={parentRef}
                        >
                            {tumType}
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

                <SelectComp name={material} getTypeData={getTypeData}/>

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