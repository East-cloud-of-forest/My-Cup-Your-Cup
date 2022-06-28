import "./MyDesign.scss";
import { ProfileComp } from "../../components/index-comp/IndexComp";
import MyDesigns from "../../components/MyDesignComp/Grid/MyDesigns";
import LikedDesigns from "../../components/MyDesignComp/Grid/LikedDesigns";
import { Link } from "react-router-dom";

const MyDesign = () => {
  return (
    <>
      <div className="mydesign_header">
        <div className="title_hashtag">
          <h2>마이페이지</h2>
          <ul className="hashtag">
            <li>
              <span>태그1</span>
            </li>
            <li>
              <span>태그2</span>
            </li>
            <li>
              <span>태그3</span>
            </li>
          </ul>
        </div>
        <ProfileComp
          //icon
          // justName
          imageURL={
            "https://cdn.pixabay.com/photo/2016/11/29/04/31/caffeine-1867326_960_720.jpg"
          }
          userName={"user1"}
          intro={"I am User1. My websites are "}
          fbURL={"https://www.facebook.com"}
          isntaURL={"https://www.instagram.com"}
        />
      </div>

      <MyDesigns />
      <LikedDesigns />
    </>
  );
};
export default MyDesign;
