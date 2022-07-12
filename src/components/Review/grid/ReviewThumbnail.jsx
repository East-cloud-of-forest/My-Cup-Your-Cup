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
          <span>2022-06-01</span>
          <span>
            {
              // user.photoURL ? 
              <ProfileComp
                justName
                imageURL={user.photoURL}
                userName={user.displayName}
              ></ProfileComp>
              //  :
              // <ProfileComp
              //   justName
              //   imageURL={null}
              //   userName={user.displayName}
              // ></ProfileComp>
            }
            
          </span>
        </div>
      </Card.Body>
    </Card>
  )
}
export default TempReviewThumbnail
