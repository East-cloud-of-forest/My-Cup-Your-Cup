import Profile from "./Profile";
import AllDesigns from "./AllDesigns";
import MyDesigns from "./MyDesigns";
import LikedDesigns from "./LikedDesigns"

const MypageComp = () => {
    return (
        <>
            <h1>마이페이지</h1>
            <Profile />
            <AllDesigns />
            <MyDesigns />
            <LikedDesigns />
        </>
    )
}
export default MypageComp;