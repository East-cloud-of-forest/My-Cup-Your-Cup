import Profile from "./Profile";
import AllDesigns from "./Grid/AllDesigns";
import MyDesigns from "./Grid/MyDesigns";
import LikedDesigns from "./Grid/LikedDesigns";

const MypageComp = () => {
    return (
        <>
            <Profile />
            <div className="title">
                <h2>마이페이지</h2>
                <div className="tags">
                    <span>태그</span>
                    <span>태그2</span>
                    <span>태그3</span>
                </div>
            </div>
            
            <AllDesigns />
            <MyDesigns />
            <LikedDesigns />
        </>
    )
}
export default MypageComp;