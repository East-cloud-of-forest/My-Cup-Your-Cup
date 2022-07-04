import "./Create.scss";
import ColorComp from "../../components/createcomp/ColorComp";
import SelectComp from "../../components/createcomp/SelectComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateBack,
  faArrowRotateForward,
  faArrowsAltV,
  faArrowsAltH,
  faTrash,
  faPaintBrush,
  faWhiskeyGlass,
  faFileArrowUp,
  faFont,
  faStar,
  faEye,
  faEyeSlash,
  fa1,
  fa2,
  fa3,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonComp } from "../../components/index-comp/IndexComp";
import React, { useRef, useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import { text } from "@fortawesome/fontawesome-svg-core";
import CanvasComp from "../../components/createcomp/CanvasComp";

const CreatePage = () => {
  //레이어 용
  // const [basicIcon, setBasicIcon] = useState(faEye);
  // const changeIcon = () => {
  //   if (basicIcon === faEye) {
  //     setBasicIcon(faEyeSlash);
  //   } else {
  //     setBasicIcon(faEye);
  //   }
  // };

  //재질 props 받아오는 함수
  const [material, setMaterial] = useState("");

  const getTypeData = (material) => {
    setMaterial(material);
  };

  //컬러 props
  const [colorData, setColorData] = useState("#FFFFFF");
  const getColorData = (colorData) => {
    setColorData(colorData);
  };

  //상품명과 색상명 props 받아오는 함수
  const [productName, setProductName] = useState("상품명");
  const getProductName = (productName) => {
    setProductName(productName);
  };

  const [colorName, setColorName] = useState("흰색");
  const getColorName = (colorName) => {
    setColorName(colorName);
  };

  //아코디언 버튼
  const parentRef = React.useRef();
  const childRef = React.useRef();
  const [active, setActive] = useState(false);
  const [display, setDisplay] = useState(true);
  const timeToggle = function (kind, time) {
    setTimeout(() => {
      kind === "active" ? setActive(!active) : setDisplay(!display);
    }, time);
  };

  const openClick = () => {
    // if(parentRef.current.clientWidth>0){
    //     parentRef.current.style.width="0";
    // }else{
    //     parentRef.current.style.width=`${childRef.current.clientWidth}px`
    // };
    clearTimeout(timeToggle);
    if (display) {
      setDisplay(!display);
      timeToggle("active", 0);
    } else {
      setActive(!active);
      timeToggle("display", 500);
    }
  };

  //아코디언 내용 변경
  const [tumType, setTumType] = useState("");

  const [pic, setPic] = useState("1");

  //텀블러 변경 및 텀블러 이름값 가져오기
  const [tumShape, setTumShape] = useState("");

  const changeTum = (e) => {
    setPic(e.currentTarget.id);
    // console.log(e.target)
    // console.log(e.currentTarget)
    switch (e.currentTarget.id.split("_")[1]) {
      case "1":
        setTumShape("기본형");
        break;
      case "2":
        setTumShape("원통형");
        break;
      case "3":
        setTumShape("컵형");
        break;
      default:
        setTumShape("");
        break;
    }
  };

  //텍스트 편집 토글
  const [editActive, setEditActive] = useState(false);
  const [editDisplay, setEditDisplay] = useState(true);
  const editTimeToggle = function (kind, time) {
    setTimeout(() => {
      kind === "editActive"
        ? setEditActive(!editActive)
        : setEditDisplay(!editDisplay);
    }, time);
  };

  const editClick = () => {
    clearTimeout(editTimeToggle);
    if (display) {
      setEditDisplay(!editDisplay);
      editTimeToggle("editActive", 0);
    } else {
      setEditActive(!editActive);
      editTimeToggle("editDisplay", 0);
    }
  };

  //재질변경에 따른 내용 변경
  useEffect(() => {
    if (material === "pla") {
      setTumType(
        <div className="cre_acc_display" ref={childRef}>
          <div className="cre_acc_icon" id="pla_1" onClick={changeTum}>
            <FontAwesomeIcon icon={fa1} className="cre_icon2" />
            기본형
          </div>
          <div className="cre_acc_icon" id="pla_2" onClick={changeTum}>
            <FontAwesomeIcon icon={fa2} className="cre_icon2" />
            원통형
          </div>
        </div>
      );
      setPic("pla_1");
      setTumShape("기본형");
    } else if (material === "stain") {
      setTumType(
        <div className="cre_acc_display" ref={childRef}>
          <div className="cre_acc_icon" id="stain_1" onClick={changeTum}>
            <FontAwesomeIcon icon={fa1} className="cre_icon2" />
            기본형
          </div>
          <div className="cre_acc_icon" id="stain_2" onClick={changeTum}>
            <FontAwesomeIcon icon={fa2} className="cre_icon2" />
            원통형
          </div>
          <div className="cre_acc_icon" id="stain_3" onClick={changeTum}>
            <FontAwesomeIcon icon={fa3} className="cre_icon2" />
            컵형
          </div>
        </div>
      );
      setPic("stain_1");
      setTumShape("기본형");
    } else {
      setTumType("");
      setPic("1");
      setTumShape("");
    }
  }, [material]);

  //텍스트 스타일 편집
  const [fontSizeEdit, setFontSizeEdit] = useState(12);
  const fontSizeChange = (e) => {
    setFontSizeEdit(e.target.value);
  };

  const [fontColorEdit, setFontColorEdit] = useState("#000");
  const fontColorChange = (e) => {
    console.log(e.target.value);
    setFontColorEdit(e.target.value);
  };

  // 텍스트 추가 임시
  const [texts, setTexts] = useState([]);

  const [textinput, setTextInput] = useState("");
  const textChange = (e) => {
    setTextInput(e.target.value);
  };

  const textClick = () => {
    if (textinput.length !== 0) {
      const textsClone = [...texts];
      textsClone.push({
        text: textinput,
        font: `nanumBold`,
        size: fontSizeEdit,
        color: fontColorEdit,
        id: texts.length,
        x: -1000,
        y: -1000,
      });
      setTexts(textsClone);
    }
    setTextInput("");
  };

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
            <FontAwesomeIcon icon={faArrowRotateBack} className="cre_icon" />왼
            회전
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
          <CanvasComp
            colorData={colorData}
            pic={pic}
            texts={texts}
            setTexts={setTexts}
          />

          {/**에딧 2 */}
          <div className="cre_acc">
            <div
              className={classNames(
                "cre_acc_clicked ",
                active ? "active" : null,
                display ? "displaynone" : null
              )}
              ref={parentRef}
            >
              {tumType}
            </div>

            <div className="cre_acc_click">
              <FontAwesomeIcon
                icon={faWhiskeyGlass}
                className="cre_icon2"
                onClick={openClick}
              />
              텀블러변경
            </div>
          </div>

          <div className="cre_edit2">
            <div className="cre_editdiv2">
              <FontAwesomeIcon icon={faFileArrowUp} className="cre_icon2" />
              이미지 업로드
            </div>
            <div className="cre_editdiv2">
              <FontAwesomeIcon
                icon={faFont}
                className="cre_icon2"
                // onClick={textClick}
                onClick={editClick}
              />
              텍스트 추가
            </div>
            <div className="cre_editdiv2">
              <FontAwesomeIcon icon={faStar} className="cre_icon2" />
              무료 디자인
            </div>
          </div>

          {/* 레이어 편집 */}
          <div
            className={classNames(
              "cre_edit_clicked ",
              editActive ? "editActive" : null,
              editDisplay ? "EditDisplaynone" : null
            )}
          >
            <div>
              <div>
                <p>추가할 텍스트</p>
                <input
                  className="cre_font_input"
                  type="text"
                  value={textinput}
                  onChange={textChange}
                />
              </div>
              <div className="cre_font_editor">
                <p>폰트 사이즈</p>
                <select
                  className="cre_font_selectbox"
                  defaultValue="12"
                  onChange={fontSizeChange}
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="36">36</option>
                  <option value="48">48</option>
                </select>
              </div>
              <div className="cre_font_editor">
                <p>폰트 색상</p>
                <select
                  className="cre_font_selectbox"
                  defaultValue="#000"
                  onChange={fontColorChange}
                >
                  <option value="#000000">검정</option>
                  <option value="#ff0000">빨강</option>
                  <option value="#0000ff">파랑</option>
                  <option value="#00ff00">초록</option>
                </select>
              </div>
            </div>
            <div className="cre_font_edit_btn">
              <ButtonComp
                style={{ width: "80px", height: "40px", fontSize: "15px" }}
                onClick={textClick}
              >
                추가
              </ButtonComp>
              <ButtonComp
                style={{ width: "80px", height: "40px", fontSize: "15px" }}
                onClick={editClick}
              >
                취소
              </ButtonComp>
            </div>
          </div>

          {/**레이어 창*/}
          {/* <div className="cre_layer_div">
                        <div className="cre_layer_title">레이어 관리</div>
                        <div className="cre_layers">
                            {/**반복해서 추가 될 레이어 div
                            <div className="cre_layer">레이어1<FontAwesomeIcon icon={basicIcon} className="cre_layer_icon" onClick={changeIcon} />
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>

      <div className="cre_opt">
        <h2>{productName}</h2>
        <h2>{tumShape}</h2>

        <p>{colorName}</p>

        <div className="cre_colorDiv">
          <ColorComp getColorName={getColorName} getColorData={getColorData} />
        </div>

        <SelectComp
          colorName={colorName}
          tumShape={tumShape}
          getProductName={getProductName}
          material={material}
          getTypeData={getTypeData}
        />
      </div>
    </div>
  );
};

export default CreatePage;
