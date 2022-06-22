import { ButtonComp, ProfileComp, ModalComp } from '../../index-comp/IndexComp'
import './ReviewAndModalComp.scss'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReviewThumbnail from './ReviewThumbnail'

const ReviewModalComp = (props) => {
  const { boardImage, boardTitle, boardRating, boardContent } = props.board
  return (
    <div>
      <ModalComp
        button={<ReviewThumbnail board={props.board} />}
        imageSRC={boardImage}
        className="review_modal"
      >
        <div className="modal_top">
          <div className="profile_block">
            <ProfileComp
              justName
              imageURL={
                'https://cdn.pixabay.com/photo/2016/11/29/04/31/caffeine-1867326_960_720.jpg'
              }
            />
            <div>
              <p>user1</p>
              <p className='caption'>2022-06-07</p>
            </div>
          </div>
          <span>1234</span>
          <span>{boardRating}</span>
        </div>

        <h2 className="title-inside-modal">{boardTitle}</h2>

        <p>{boardContent}</p>
        <span className="hashtag"></span>
        <div>
          <ButtonComp>
            <FontAwesomeIcon icon={solid('heart')}></FontAwesomeIcon>
          </ButtonComp>
          <ButtonComp>
            <FontAwesomeIcon icon={solid('share-nodes')}></FontAwesomeIcon>
          </ButtonComp>
        </div>
      </ModalComp>
    </div>
  )
}
export default ReviewModalComp
