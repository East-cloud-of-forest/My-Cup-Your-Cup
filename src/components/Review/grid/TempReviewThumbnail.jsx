import './ReviewThumbnail.scss'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { ProfileComp, StarRating } from '../../index-comp/IndexComp'

const TempReviewThumbnail = (props) => {
  const [number, setNumber] = useState(0)
  //const { boardImage, boardTitle, boardRating, boardContent } = props.board
  const { review, rating, user, images } = props.review

  return (
    <Card id="review_card">
      <Card.Img variant="top" src={images.image0} />

      <Card.Body>
        <div className="review_top">
          <StarRating rating={rating}></StarRating>
          <div className="review_heart">
            <i>
              <FontAwesomeIcon icon={solid('heart')} size="sm" />
            </i>
            <span>{number}</span>
          </div>
        </div>

        <div className="review_body">
          <p className="review_text">{review}</p>
        </div>

        <hr />

        <div className="caption review_footer">
          <span>2022-06-01</span>
          <span>
            <ProfileComp
              justName
              imageURL={
                'https://cdn.pixabay.com/photo/2016/11/29/04/31/caffeine-1867326_960_720.jpg'
              }
              userName='user1'
            ></ProfileComp>
          </span>
        </div>
      </Card.Body>
    </Card>
  )
}
export default TempReviewThumbnail
