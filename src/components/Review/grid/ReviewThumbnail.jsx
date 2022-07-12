import './ReviewThumbnail.scss'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { ProfileComp, StarRating } from '../../index-comp/IndexComp'

const TempReviewThumbnail = (props) => {
  const [number, setNumber] = useState(0)
  const { review, rating, user, images, createdAt } = props.review
  
  // 날짜표시
  const timeStamp = createdAt;
  let postDate = new Date(timeStamp);

  return (
    <Card id="review_card">
      <Card.Img variant="top" src={images.image0.url} />

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
          <span>
            {`${postDate.getFullYear()}-${postDate.getMonth()+1}-${postDate.getDate()}`}
          </span>
          <span>
            {
              <ProfileComp
                justName
                imageURL={user.photoURL}
                userName={user.displayName}
              ></ProfileComp>
            }
            
          </span>
        </div>
      </Card.Body>
    </Card>
  )
}
export default TempReviewThumbnail
