import "./ReviewComp.scss";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

const ReviewComp = ({ boardImage, boardTitle, boardRating }) => {
  const [number, setNumber] = useState(0);

  return (
    <Container fluid="xs">
      <Row>
        <Col md="12" sm="6" xs="6">
          <Card id="review_card">
            <Card.Img variant="top" src={boardImage} />
            <Card.Body>
              <Card.Title>
                {boardTitle}
                <div className="heart_span">
                  <FontAwesomeIcon icon={solid("heart")} size="x" />
                  <span>{number}</span>
                </div>
              </Card.Title>
              <Card.Text>{boardRating}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">조회수 0000회 2022-06-07</small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ReviewComp;
