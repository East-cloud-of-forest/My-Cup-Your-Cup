import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
//import { ButtonComp } from "../../index-comp/IndexComp";
import { useState } from "react";
import "./StarComp.scss";

const StarComp = ({ onClick }) => {
  const rating = [0, 1, 2, 3, 4];
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const starClicked = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    console.log(clickStates);
  };

  return (
    <div className="rating_div">
      {/**
      {rating.map((s) => (
        <ButtonComp
          key={s}
          icon
          onClick={() => starClicked(s)}
          className={clicked[s] && "yellowStar"}
        >
          <FontAwesomeIcon icon={solid("star")} size="2x" />
        </ButtonComp>
      ))}
      */}
      {rating.map((s) => (
        <button
          key={s}
          onClick={() => {
            starClicked(s);
            onClick(clicked);
          }}
          className={clicked[s] ? "yellowStar" : ""}
        >
          <FontAwesomeIcon icon={solid("star")} size="2x" />
        </button>
      ))}
    </div>
  );
};
export default StarComp;
