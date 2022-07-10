import "./Create.scss";
import SelectComp from "../../components/createcomp/SelectComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhiskeyGlass,
  faFileArrowUp,
  faFont,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonComp } from "../../components/index-comp/IndexComp";
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import CanvasComp from "../../components/createcomp/CanvasComp";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import CanvasSelectComp from "../../components/createcomp/CanvasSelectComp";
import FreeDesignComp from "../../components/createcomp/FreeDesignComp";

const CreatePage = () => {
  const canvasRef = useRef(null);

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
  const [active, setActive] = useState(false);
  const [display, setDisplay] = useState(true);
  const timeToggle = function (kind, time) {
    setTimeout(() => {
      kind === "active" ? setActive(!active) : setDisplay(!display);
    }, time);
  };

  const openClick = () => {
    console.log(1);
    clearTimeout(timeToggle);
    if (display) {
      setDisplay(!display);
      timeToggle("active", 0);
    } else {
      setActive(!active);
      timeToggle("display", 500);
    }
  };

  //텀블러 변경 및 텀블러 이름값 가져오기
  const [tumShape, setTumShape] = useState("");
  const changeTum = (e) => {
    setPic(e.currentTarget.id);
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

  // 사이드 에딧트
  const [sideEditOpen, setSideEditOpen] = useState(false);
  const sideEditToggle = () => {
    setSideEditOpen(!sideEditOpen);
  };

  //재질변경에 따른 내용 변경
  //아코디언 내용 변경
  const [tumType, setTumType] = useState([]);
  const [pic, setPic] = useState("1");
  useEffect(() => {
    if (material === "pla") {
      setTumType([
        { name: "기본형", id: "pla_1" },
        { name: "원통형", id: "pla_2" },
      ]);
      setPic("pla_1");
      setTumShape("기본형");
    } else if (material === "stain") {
      setTumType([
        { name: "기본형", id: "stain_1" },
        { name: "원통형", id: "stain_2" },
        { name: "컵형", id: "stain_3" },
      ]);
      setPic("stain_1");
      setTumShape("기본형");
    } else {
      setTumType([]);
      setPic("1");
      setTumShape("");
    }
  }, [material]);

  // 요소 추가
  const [canvasObjects, setCanvasObjects] = useState([]);
  const [objId, setObjId] = useState(0);

  // 요소 선택
  const [selectOnObject, setSelectOnObject] = useState(null);

  const addText = () => {
    const objClone = [...canvasObjects];
    objClone.push({
      type: "text",
      text: "텍스트",
      font: "ROKAFSansBold",
      size: 32,
      color: "#000000",
      id: objId,
      x: -1000,
      y: -1000,
      show: true,
    });
    setCanvasObjects(objClone);
    setSelectOnObject(canvasObjects.length);
    sideEditToggle();
    setObjId(objId + 1);
  };

  // 파일 추가
  const addImage = (e) => {
    if (e.target) {
      let img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      Array.from(e.target.files).forEach((file) => {
        img.src = URL.createObjectURL(file);
      });
      const objClone = [...canvasObjects];
      img.onload = () => {
        objClone.push({
          img: img,
          id: objId,
          x: -1000,
          y: -1000,
          width: img.width,
          height: img.height,
          show: true,
        });
        setCanvasObjects(objClone);
        setSelectOnObject(canvasObjects.length);
        sideEditToggle();
        setObjId(objId + 1);
      };
    } else {
      const img = e;
      const objClone = [...canvasObjects];
      objClone.push({
        img: img,
        id: objId,
        x: -1000,
        y: -1000,
        width: img.width,
        height: img.height,
        show: true,
      });
      setCanvasObjects(objClone);
      setSelectOnObject(canvasObjects.length);
      sideEditToggle();
      setObjId(objId + 1);
    }
  };

  // 삭제
  const deletText = (i) => {
    setSelectOnObject(null);
    const objClone = canvasObjects.filter(
      (text) => text.id !== canvasObjects[i].id
    );
    setCanvasObjects(objClone);
  };

  // 전부 삭제
  const allDeleteText = () => {
    setSelectOnObject(null);
    setCanvasObjects([]);
    setObjId(0);
  };

  // 레이어 선택
  const selectLayer = (i) => {
    setSelectOnObject(i);
  };

  // 레이어 가리기
  const showToggle = (i) => {
    const textsclone = [...canvasObjects];
    textsclone[i] = {
      ...textsclone[i],
      show: !textsclone[i].show,
    };
    setCanvasObjects(textsclone);
  };

  // 레이어 드래그
  const [grab, setGrab] = useState(null);
  const [dragclass, setDragclass] = useState("");
  const [dragover, setDragover] = useState("");
  const dragOver = (e) => {
    const eIndex = Number(e.currentTarget.dataset.position);
    const gIndex = Number(grab.dataset.position);
    setDragover(eIndex);
    const top = e.currentTarget.clientHeight * 0.2;
    const bottom = e.currentTarget.clientHeight * 0.8;
    const mx = e.clientY - e.currentTarget.getBoundingClientRect().top;
    if (eIndex !== gIndex) {
      if (top > mx) {
        setDragclass("top");
      } else if (bottom < mx) {
        setDragclass("bottom");
      } else {
        setDragclass("middle");
      }
    } else {
      setDragclass("");
    }
    e.preventDefault();
  };

  const drageStart = (e, i) => {
    setGrab(e.currentTarget);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget);

    setSelectOnObject(i);
  };

  const dragEnd = (e) => {
    e.dataTransfer.dropEffect = "move";
    setGrab(null);
    setDragclass("");
  };

  const drop = (e) => {
    const grabPosition = Number(grab.dataset.position);
    const targetPosition = Number(e.currentTarget.dataset.position);
    const objClone = [...canvasObjects];

    switch (dragclass) {
      case "top":
        const topPosition =
          grabPosition > targetPosition ? targetPosition + 1 : targetPosition;
        objClone.splice(topPosition, 0, objClone.splice(grabPosition, 1)[0]);
        break;
      case "middle":
        objClone[grabPosition] = objClone.splice(
          targetPosition,
          1,
          objClone[grabPosition]
        )[0];
        break;
      case "bottom":
        const bottomPosition =
          grabPosition < targetPosition ? targetPosition - 1 : targetPosition;
        objClone.splice(bottomPosition, 0, objClone.splice(grabPosition, 1)[0]);
        break;
    }
    setDragclass("");
    setSelectOnObject(targetPosition);
    setCanvasObjects(objClone);
  };

  // 선택된 요소의 타입
  const selectType = canvasObjects[selectOnObject]
    ? canvasObjects[selectOnObject]
    : { type: null };

  // 무료이미지
  const [freeImageActive, setFreeImageActive] = useState(false);

  return (
    <div className="cre_all">
      <FreeDesignComp
        active={freeImageActive}
        setFreeImageActive={setFreeImageActive}
        addImage={addImage}
      />
      {/**제작화면 */}
      <div className="cre_result">
        {/* 레이어 */}
        <div className={classNames("layer", tumType.length !== 0 && "show")}>
          <div className="header">
            레이어
            <ButtonComp icon onClick={allDeleteText}>
              <FontAwesomeIcon icon={solid("eraser")} />
            </ButtonComp>
          </div>
          <ul className="layer_body">
            {canvasObjects.map((item, i) => (
              <li
                data-position={i}
                className={classNames(
                  "item",
                  selectOnObject === i && "select",
                  dragover === i && dragclass
                )}
                key={i}
                onClick={() => {
                  selectLayer(i);
                }}
                onDragOver={dragOver}
                onDragStart={(e) => {
                  drageStart(e, i);
                }}
                onDragEnd={dragEnd}
                onDrop={drop}
                draggable="true"
              >
                <div className="icon">
                  {item && item.type ? (
                    <FontAwesomeIcon icon={solid("font")} />
                  ) : (
                    <FontAwesomeIcon icon={solid("image")} />
                  )}
                </div>

                <div className="content">
                  {item && item.type ? (
                    <p>{item.text}</p>
                  ) : (
                    <div className="image_box">
                      <img
                        src={item && item.img.currentSrc}
                        alt="item_image"
                        draggable="false"
                      />
                    </div>
                  )}
                </div>

                <div className="btns">
                  <ButtonComp
                    icon
                    onClick={() => {
                      deletText(i);
                    }}
                  >
                    <FontAwesomeIcon icon={solid("trash-can")} />
                  </ButtonComp>
                  <ButtonComp
                    icon
                    onClick={(e) => {
                      e.stopPropagation();
                      showToggle(i);
                    }}
                  >
                    {item.show ? (
                      <FontAwesomeIcon icon={solid("eye")} />
                    ) : (
                      <FontAwesomeIcon icon={regular("eye-slash")} />
                    )}
                  </ButtonComp>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/**메인이미지 */}
        <div className="cre_mainImg">
          <CanvasComp
            colorData={colorData}
            pic={pic}
            canvasObjects={canvasObjects}
            setCanvasObjects={setCanvasObjects}
            selectOnObject={selectOnObject}
            setSelectOnObject={setSelectOnObject}
            canvasRef={canvasRef}
          />
        </div>

        {/* 사이드 에딧 */}
        <div
          className={classNames(
            "side_edit",
            sideEditOpen ? "side_edit_active" : null
          )}
        >
          <div className="side_edit_toggle">
            <ButtonComp
              color="white"
              onClick={() => {
                sideEditToggle();
                active && openClick();
              }}
            >
              {!sideEditOpen ? (
                <FontAwesomeIcon icon={solid("caret-right")} />
              ) : (
                <FontAwesomeIcon icon={solid("caret-left")} />
              )}
            </ButtonComp>
          </div>
          <ul>
            <li>
              <div
                className={classNames(
                  "cre_acc_click",
                  tumType.length === 0 ? "unactive" : null
                )}
              >
                <FontAwesomeIcon
                  icon={faWhiskeyGlass}
                  className="cre_icon2"
                  onClick={() => {
                    tumType.length !== 0 && openClick();
                  }}
                />
                텀블러변경
              </div>
              <ul
                className={classNames(
                  "tumtype_select",
                  active ? "active" : null,
                  display ? "displaynone" : null
                )}
              >
                {tumType.map((a, i) => (
                  <li key={i}>
                    <div id={a.id} onClick={changeTum}>
                      {i === 0 ? <FontAwesomeIcon icon={solid("1")} /> : null}
                      {i === 1 ? <FontAwesomeIcon icon={solid("2")} /> : null}
                      {i === 2 ? <FontAwesomeIcon icon={solid("3")} /> : null}
                      {a.name}
                    </div>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              {tumType.length === 0 ? (
                <div className="cre_acc_click unactive">
                  <FontAwesomeIcon icon={faFileArrowUp} className="cre_icon2" />
                  이미지 업로드
                </div>
              ) : (
                <>
                  <label htmlFor="imageUpload">
                    <div className="cre_acc_click">
                      <FontAwesomeIcon
                        icon={faFileArrowUp}
                        className="cre_icon2"
                      />
                      이미지 업로드
                    </div>
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    onChange={addImage}
                    accept="image/*"
                  />
                </>
              )}
            </li>
            <li>
              <div
                className={classNames(
                  "cre_acc_click",
                  tumType.length === 0 ? "unactive" : null
                )}
              >
                <FontAwesomeIcon
                  icon={faFont}
                  className="cre_icon2"
                  onClick={() => {
                    tumType.length !== 0 && addText();
                  }}
                />
                텍스트 추가
              </div>
            </li>
            <li>
              <div
                className={classNames(
                  "cre_acc_click",
                  tumType.length === 0 && "unactive"
                )}
                onClick={() => {
                  tumType.length !== 0 && setFreeImageActive(true);
                }}
              >
                <FontAwesomeIcon icon={faStar} className="cre_icon2" />
                무료 디자인
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="cre_option_hidden">
        <div className={!selectType.type ? "option_active" : "select_active"}>
          <SelectComp
            getColorName={getColorName}
            getColorData={getColorData}
            colorData={colorData}
            colorName={colorName}
            tumShape={tumShape}
            getProductName={getProductName}
            material={material}
            getTypeData={getTypeData}
            productName={productName}
            setSideEditOpen={setSideEditOpen}
            canvasRef={canvasRef}
            pic={pic}
          />
          <CanvasSelectComp
            selectOnObject={selectOnObject}
            setCanvasObjects={setCanvasObjects}
            canvasObjects={canvasObjects}
            selectType={selectType}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
