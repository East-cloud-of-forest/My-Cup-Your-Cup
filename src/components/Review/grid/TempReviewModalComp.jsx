import {
  ButtonComp,
  ProfileComp,
  ModalComp,
  StarRating,
  SliderComp,
} from '../../index-comp/IndexComp'
import './Temp.scss'
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TempReviewThumbnail from './TempReviewThumbnail'

const TempReviewModalComp = (props) => {
  const { review, rating, tages, user, images, boughtDate, itemName, itemColor } = props.review
  return (
    <div>
      <ModalComp
        button={<TempReviewThumbnail review={props.review} />}
        image={
          <SliderComp dots={false} infinite={true}>
            { Object.values(images).map( (image,i) => (
              <div key={i}>
                <img id="image" src={image.url} key={image.name} alt="review-image" />
              </div>
            ))}
          </SliderComp>
        }
        className="review_modal"
      >
        <div className="modal_top">
          <div className="star">
            <StarRating rating={rating} />
          </div>
        </div>

        <div className="modal_body">
          {/* <h5 className="modal_title">임시제목</h5> */}
          <div className="option">
            <p>상품명 : {itemName}</p>
            <p>색상 : {itemColor}</p>
            <p>구매일자 : {boughtDate}</p>
          </div>
          <div className="hashtag">
            {tages.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
          <p>{review}</p>
          <div className="score">
            <i>
              <FontAwesomeIcon icon={regular('eye')} />
            </i>
            <span>1234</span>
            <i>
              <FontAwesomeIcon icon={regular('heart')} />
            </i>
            <span>1234</span>
          </div>
        </div>

        <div className="modal_footer">
          <div className="profile_block">
            <ProfileComp justName imageURL={user.photoURL} size="md" />
            <div>
              <p>{user.displayName}</p>
              <p className="caption">2022-06-07</p>
            </div>
          </div>
          <div>
            <ButtonComp icon>
              <FontAwesomeIcon icon={solid('heart')} />
            </ButtonComp>
            <ButtonComp icon>
              <FontAwesomeIcon icon={solid('share-nodes')} />
            </ButtonComp>
          </div>
        </div>
      </ModalComp>
    </div>
  )
}
export default TempReviewModalComp
