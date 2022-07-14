import { useEffect, useState, useCallback } from "react";
import { ButtonComp, ModalComp } from "../index-comp/IndexComp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../modules/addCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import classNames from "classnames";
import { useRef } from "react";

const SelectComp = ({
  getTypeData,
  getProductName,
  colorName,
  tumShape,
  getColorData,
  getColorName,
  colorData,
  productName,
  setSideEditOpen,
  canvasRef,
  setSelectOnObject
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const colors = [
    { code: "#FFFFFF", name: "흰색" },
    { code: "#ff8e8e", name: "빨간색" },
    { code: "#33b4ff", name: "파란색" },
    { code: "#333333", name: "검정색" },
    { code: "#ffff80", name: "노란색" },
    { code: "#8aff8a", name: "초록색" },
    { code: "#aaaaaa", name: "회색" },
  ];

  const colorSelect = (e) => {
    getColorData(e.target.id);

    for (let i = 0; i < colors.length; i++) {
      if (e.target.id === colors[i].code) {
        getColorName(colors[i].name);
      }
    }
  };

  // 재질 선택
  const [tumMet, setTumMet] = useState({
    name: `상품명 &nbsp;`,
    price: 0,
    met: "none",
  });
  const changeMet = (value) => {
    const met = value.split("_")[1];
    let metObj = {
      price: parseInt(value),
      met: met,
    };
    if (met === "pla") {
      metObj.name = "플라스틱 텀블러 ";
    } else if (met === "stain") {
      metObj.name = "스테인리스 텀블러 ";
    } else {
      metObj.name = `상품명 &nbsp;`;
    }
    setTumMet(metObj);
    getTypeData(met);
  };

  // 사이즈 선택
  const [tumSize, setTumSize] = useState({
    name: "",
    price: 0,
    size: "",
  });
  const changeSize = (value) => {
    const size = value.split("_")[1];
    let sizeObj = {
      price: parseInt(value),
      size: size !== "none" ? size : "",
    };
    if (size === "big") {
      sizeObj.name = "(950ml) ";
    } else if (size === "mid") {
      sizeObj.name = "(500ml) ";
    } else if (size === "small") {
      sizeObj.name = "(350ml) ";
    } else {
      sizeObj.name = "";
    }
    setTumSize(sizeObj);
  };

  // 빨대 선택
  const [tumStraw, setTumStraw] = useState({
    use: "none",
    price: 0,
  });
  const changeStraw = (value) => {
    setTumStraw({
      price: parseInt(value),
      use: value.split("_")[1],
    });
  };

  // 갯수 설정
  const [count, setCount] = useState(1);
  const changeCount = (kind) => {
    switch (kind) {
      case "plus":
        setCount(count + 1);
        break;
      case "minus":
        if (count > 1) {
          setCount(count - 1);
        }
        break;
    }
  };

  // state로 전달
  const onAddItem = useCallback(
    (tumblur) => dispatch(addItem(tumblur)),
    [dispatch]
  );

  const notDoneDesign = () => {
    if (tumMet.met === "none") {
      alert("컵 재질을 선택해주세요");
    } else if (tumSize.size === "") {
      alert("컵 사이즈를 선택해주세요");
    } else if (tumStraw.use === "none") {
      alert("빨대사용 여부를 선택해 주세요");
    }
  };

  const [canvasImage, setCanvasImage] = useState();
  const getDesignImage = () => {
    setCanvasImage(canvasRef.current.toDataURL());
  };

  // 가격정보
  const summa = tumMet.price + tumSize.price + tumStraw.price;
  // 이름정보
  useEffect(() => {
    getProductName(tumMet.name + tumSize.name + tumShape);
  }, [tumMet, tumSize, tumShape]);

  const doneDesign = (kind) => {
    onAddItem({
      image: canvasRef.current.toDataURL(),
      name: tumMet.name + tumSize.name,
      color: colorName,
      material: tumMet.met,
      size: tumSize.size,
      strow: tumStraw.use,
      shape: tumShape,
      price: tumMet.price + tumSize.price + tumStraw.price,
      quantity: count,
    });
    switch (kind) {
      case "cart":
      case "pay":
        navigate("/" + kind);
        break;
      case "upload":
        navigate("/create/upload");
        break;
    }
  };

  // 캔버스 말고 다른 곳 선택 시 선택 해제
  const blockRef = useRef(null)
  useEffect(() => {
    const ref = blockRef.current
    const pd = (e) => {
      if (blockRef.current.className === e.currentTarget.className) {
        setSelectOnObject(null)
      }
    }
    ref.addEventListener('pointerdown', pd, false)
    return () => {
      ref.removeEventListener('pointerdown', pd)
    }
  }, [blockRef])

  return (
    <div className="option_select" ref={blockRef}>
      <h2 dangerouslySetInnerHTML={{ __html: productName }}></h2>
      <p>{colorName}</p>

      <div className="cre_colorDiv">
        {colors.map((color) => (
          <div
            className={classNames(
              "cre_color",
              colorData === color.code ? "active" : null
            )}
            id={color.code}
            key={color.name}
            style={{ backgroundColor: color.code }}
            onClick={colorSelect}
          ></div>
        ))}
      </div>

      <div className="select_block">
        <p>재질</p>
        <div className="Met_select">
          <div className={tumMet.met === "stain" ? "actvie" : null}>
            <ButtonComp
              tile
              color="white"
              onClick={() => {
                tumMet.met === "none" && setSideEditOpen(true);
                changeMet("20000_stain");
              }}
            >
              스테인리스
            </ButtonComp>
          </div>
          <div className={tumMet.met === "pla" ? "actvie" : null}>
            <ButtonComp
              tile
              color="white"
              onClick={() => {
                tumMet.met === "none" && setSideEditOpen(true);
                changeMet("10000_pla");
              }}
            >
              플라스틱
            </ButtonComp>
          </div>
        </div>

        <p>크기</p>
        <div className="size_select">
          <div className={tumSize.size === "big" ? "actvie" : null}>
            <ButtonComp
              tile
              color="white"
              onClick={() => changeSize("10000_big")}
            >
              950ml
            </ButtonComp>
          </div>
          <div className={tumSize.size === "mid" ? "actvie" : null}>
            <ButtonComp
              tile
              color="white"
              onClick={() => changeSize("6000_mid")}
            >
              500ml
            </ButtonComp>
          </div>
          <div className={tumSize.size === "small" ? "actvie" : null}>
            <ButtonComp
              tile
              color="white"
              onClick={() => changeSize("4000_small")}
            >
              350ml
            </ButtonComp>
          </div>
        </div>

        <p>빨대 사용</p>
        <div className="straw_select">
          <div className={tumStraw.use === "use" ? "actvie" : null}>
            <ButtonComp
              tile
              color="white"
              onClick={() => changeStraw("4000_use")}
            >
              사용
            </ButtonComp>
          </div>
          <div className={tumStraw.use === "unuse" ? "actvie" : null}>
            <ButtonComp
              tile
              color="white"
              onClick={() => changeStraw("0_unuse")}
            >
              미사용
            </ButtonComp>
          </div>
        </div>
      </div>

      <div className="cre_calc">
        <p>총 가격</p>
        <h3>{summa.toLocaleString()} 원</h3>
      </div>

      <div id="btn">
        {tumMet.met !== "none" &&
        tumSize.size !== "" &&
        tumStraw.use !== "none" ? (
          <>
            <ModalComp
              button={
                <ButtonComp color="brown" onClick={getDesignImage}>
                  디자인 완료
                </ButtonComp>
              }
              image={
                <div className="imgs">
                  <img src={canvasImage} alt="" />
                </div>
              }
              bigimage
            >
              <div className="create_modal">
                <div>
                  <h4
                    dangerouslySetInnerHTML={{
                      __html: tumMet.name + tumSize.name + tumShape,
                    }}
                  ></h4>
                  <div className="product_info">
                    <p>{colorName}</p>
                    <p>{tumShape}</p>
                    <p>{tumMet.met}</p>
                    <p>
                      {tumSize.size} {tumSize.name}
                    </p>
                    <p>
                      {tumStraw.use === "use" ? "빨대 사용" : "빨대 미사용"}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="count_pay">
                    <div className="plus_minus">
                      <ButtonComp
                        color="red"
                        tile
                        onClick={() => changeCount("minus")}
                      >
                        <FontAwesomeIcon icon={solid("minus")} />
                      </ButtonComp>
                      <p>{count}</p>
                      <ButtonComp
                        color="green"
                        tile
                        onClick={() => changeCount("plus")}
                      >
                        <FontAwesomeIcon icon={solid("plus")} />
                      </ButtonComp>
                    </div>
                    <div className="pay">
                      <p>총 금액</p>
                      <p>{(summa * count).toLocaleString()} 원</p>
                    </div>
                  </div>
                  <div className="end_btns">
                    <ButtonComp
                      color="white"
                      tile
                      onClick={() => doneDesign("cart")}
                    >
                      장바구니
                    </ButtonComp>
                    <ButtonComp
                      color="white"
                      tile
                      onClick={() => doneDesign("pay")}
                    >
                      결제
                    </ButtonComp>
                  </div>
                </div>
              </div>
            </ModalComp>
            <ButtonComp onClick={() => {
              doneDesign("upload")
              }} color="darkgreen">
              저장
            </ButtonComp>
          </>
        ) : (
          <>
            <ButtonComp color="brown" onClick={notDoneDesign}>
              디자인 완료
            </ButtonComp>
            <ButtonComp onClick={notDoneDesign} color="darkgreen">
              저장
            </ButtonComp>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectComp;
