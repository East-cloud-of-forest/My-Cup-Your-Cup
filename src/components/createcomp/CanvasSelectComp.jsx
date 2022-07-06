import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { SwatchesPicker } from "react-color";

const CanvasSelectComp = ({ selectOnObject, setCanvasObjects, canvasObjects, selectType }) => {
  const textChange = (e, type) => {
    const textsclone = [...canvasObjects];
    switch (type) {
      case "input":
        textsclone[selectOnObject] = {
          ...textsclone[selectOnObject],
          text: e.target.value,
        };
        setCanvasObjects(textsclone);
        break;
      case "font":
        textsclone[selectOnObject] = {
          ...textsclone[selectOnObject],
          font: e.target.value,
        };
        setCanvasObjects(textsclone);
        break;
      case "color":
        textsclone[selectOnObject] = {
          ...textsclone[selectOnObject],
          color: e.hex,
        };
        setCanvasObjects(textsclone);
        break;
      case "colorinput":
        textsclone[selectOnObject] = {
          ...textsclone[selectOnObject],
          color: e.target.value,
        };
        setCanvasObjects(textsclone);
        break;
    }
  };

  const obj = canvasObjects[selectOnObject];

  return (
    <div className="canvas_select">
      {!selectType.type ? null : (
        <>
          <input
            type="text"
            value={obj.text}
            onChange={(e) => textChange(e, "input")}
            className="textinput"
          />

          <select
            style={{ fontFamily: obj.font }}
            onChange={(e) => textChange(e, "font")}
            value={obj.font}
            size="4"
          >
            <option
              value="ROKAFSansBold"
              style={{ fontFamily: "ROKAFSansBold" }}
            >
              바른공군체
            </option>
            <option value="OKDDUNG" style={{ fontFamily: "OKDDUNG" }}>
              읒뚱체
            </option>
            <option value="OKGUNG" style={{ fontFamily: "OKGUNG" }}>
              읒궁체
            </option>
            <option
              value="HSGyeoulNoonkott20"
              style={{ fontFamily: "HSGyeoulNoonkott20" }}
            >
              HS겨울눈꽃체2.0
            </option>
            <option value="ulsanjunggu" style={{ fontFamily: "ulsanjunggu" }}>
              울산중구전용서체
            </option>
            <option
              value="PyeongChangPeace-Light"
              style={{ fontFamily: "PyeongChangPeace-Light" }}
            >
              평창평화체-Light
            </option>
            <option
              value="PyeongChangPeace-Bold"
              style={{ fontFamily: "PyeongChangPeace-Bold" }}
            >
              평창평화체-bold
            </option>
            <option
              value="TTCrownMychewR"
              style={{ fontFamily: "TTCrownMychewR" }}
            >
              마이쮸체
            </option>
            <option
              value="DeogonPrincess"
              style={{ fontFamily: "DeogonPrincess" }}
            >
              덕온공주체
            </option>
          </select>

          <div className="color_select">
            <label htmlFor="colorinput" style={{ color: obj.color }}>
              <FontAwesomeIcon icon={solid('eye-dropper')} />
              {obj.color && obj.color.toUpperCase()}
            </label>
            <input
              type="color"
              id="colorinput"
              onBlur={(e) => textChange(e, "colorinput")}
            />
            <SwatchesPicker onChange={(color) => textChange(color, "color")} />
          </div>
        </>
      )}
    </div>
  );
};

export default CanvasSelectComp;
