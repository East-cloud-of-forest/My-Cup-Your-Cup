import {
  ButtonComp,
  ProfileComp,
  ModalComp,
  StarRating,
  SliderComp,
} from '../../index-comp/IndexComp'
import './ReviewAndModalComp.scss'
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReviewThumbnail from './ReviewThumbnail'

const ReviewModalComp = (props) => {
  const { boardImage, boardTitle, boardRating, boardContent } = props.board
  return (
    <div>
      <ModalComp
        button={<ReviewThumbnail board={props.board} />}
        image={
          <SliderComp>
            <img src={boardImage} />
          </SliderComp>
        }
        className="review_modal"
      >
        <div className="modal_top">
          <div className="star">
            <StarRating rating={boardRating} />
          </div>
        </div>

        <div className="modal_body">
          <h5 className="modal_title">{boardTitle}</h5>
          <div className="option">
            <p>옵션01</p>
            <p>옵션02</p>
            <p>옵션03</p>
            <p>옵션04</p>
          </div>
          <div className="hashtag">
            <span>임시</span>
            <span>해쉬</span>
            <span>태그</span>
          </div>
          <p>{boardContent}</p>
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
            <ProfileComp
              justName
              imageURL={
                'https://cdn.pixabay.com/photo/2016/11/29/04/31/caffeine-1867326_960_720.jpg'
              }
              size="md"
            />
            <div>
              <p>user1</p>
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
export default ReviewModalComp
