import './MyDesign.scss'
import { ProfileComp } from '../../components/index-comp/IndexComp'
import MyDesigns from '../../components/MyDesignComp/Grid/MyDesigns'
import LikedDesigns from '../../components/MyDesignComp/Grid/LikedDesigns'
import { useSelector } from 'react-redux'
import MyReviewsComp from '../../components/MyDesignComp/Grid/MyReviews'

const MyDesign = () => {
  const {user} = useSelector((user)=> user.enteruser)

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
        {
          // 로그인된 상태에서 뜨는 부분
          user ? (
            <div className="profile_block">
              <ProfileComp
                imageURL={user.photoURL}
                userName={user.displayName}
                intro={`${user.displayName}의 디자인입니다`}
                fbURL={'https://www.facebook.com'}
                instaURL={'https://www.instagram.com'}
              />
            </div> ) : null 
        }
      </div> {/* 헤더 끝 */}
      {
        user ? ( 
        <>
          <MyDesigns />
          <LikedDesigns />
          <MyReviewsComp /> 
        </> ) : null
      }

    </div>
  );
};
export default MyDesign;
