import "./MyDesign.scss";
import { ProfileComp } from "../../components/index-comp/IndexComp";
import MyDesigns from "../../components/MyDesignComp/Grid/MyDesigns";
import LikedDesigns from "../../components/MyDesignComp/Grid/LikedDesigns";
import { useDispatch, useSelector } from "react-redux";
import MyReviewsComp from "../../components/MyDesignComp/Grid/MyReviews";
import { useCallback, useEffect, useState } from "react";
import { dataResultModule } from "../../modules/firebaseData";
import { getFirebaseData } from "../../datasources/firebase";
import { loadingEnd, loadingStart } from "../../modules/loading";

const MyDesign = () => {
  const {user} = useSelector((user)=> user.enteruser)
  const [review, setReview] = useState([]);
  const dispatch = useDispatch();
  const startLoading = useCallback(() => dispatch(loadingStart()), [dispatch])
  const endLoading = useCallback(() => dispatch(loadingEnd()), [dispatch])

  const getReviews = () => async () => {
    startLoading()
    try {
      
      let array = []
      const reviewRef = getFirebaseData('Review');
      (await reviewRef).forEach( doc => {
        (doc.data().user.uid === user.uid) &&
        array.push(
          {
          id : doc.id,
          rating : doc.data().rating,
          tages : doc.data().tages,
          review : doc.data().review,
          images: doc.data().images,
          user: doc.data().user,
          }
        )
      })
      setReview(array)
    } catch (e) { console.log(e) }
    endLoading()
  }

  useEffect(() => { dispatch(getReviews()) }, [dispatch])

  return (
    <div className="mydesign_page">
      <div className="mydesign_header">
        <div>
          <h2>마이디자인</h2>
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
        { // 로그인된 상태에서 뜨는 부분 
          user ? ( 
            <div className="profile_block">
              <ProfileComp
                imageURL={user.photoURL} // 사진없을시 어떻게할지 생각
                userName={user.displayName}
                intro={`${user.displayName}의 디자인입니다`}
                fbURL={"https://www.facebook.com"}
                instaURL={"https://www.instagram.com"}
              />
            </div> ) : null }
      </div> {/* 헤더 끝 */}
        {
          user && review ? ( <>
          <MyDesigns user={user} />
          <LikedDesigns user={user} />
          <MyReviewsComp user={user} review={review} /> 
        </> ) : null
        }
      </div>
  );
};
export default MyDesign;
