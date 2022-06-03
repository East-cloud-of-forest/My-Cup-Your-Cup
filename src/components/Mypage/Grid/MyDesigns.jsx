import "./DesignsGrid.scss";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IMAGES, getImageById } from "../../../images";
import { ModalComp2 } from "../../index-comp/IndexComp"

export default function MyDesigns() {
    const [isOpen, setIsOPen] =useState(false);
    const handleOpen = () => setIsOPen(!isOpen);

    if (isOpen) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
    <>
        <div className="header">
            <span id="title">나의 디자인</span>
            <a href="#">더보기</a>
        </div>

        <Container fluid="sm">
            <Row>
                {
                    IMAGES.map( (image, i) => (
                        <Col>
                            <ModalComp2 >
                                <img src={IMAGES[i].src} alt={IMAGES[i].title } />
                                
                            </ModalComp2>
                        </Col>
                        
                    ))
                }
            </Row>
        </Container>
    </>
    );
}