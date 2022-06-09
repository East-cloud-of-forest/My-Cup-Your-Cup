import "./DesignsGrid.scss";
import { IMAGES } from "../../../images";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ModalComp2 } from "../../index-comp/IndexComp";

export default function LikedDesigns() {
  const [isOpen, setIsOPen] = useState(false);
  const handleOpen = () => setIsOPen(!isOpen);

  if (isOpen) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <div className="header">
        <span id="title">찜한 디자인</span>
        <a href="#">더보기</a>
      </div>
      {/* 리스트/링크/이미지 클릭시 해당 상품 모달은 path로 네비게이트? */}
      <Container fluid="sm">
        <Row>
          {IMAGES.map((image, i) => (
            <Col>
              <ModalComp2>
                <img src={IMAGES[i].src} alt={IMAGES[i].title} />
              </ModalComp2>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
