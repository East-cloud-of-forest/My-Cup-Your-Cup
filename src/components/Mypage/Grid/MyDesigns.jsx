import "./DesignsGrid.scss";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IMAGES, getImageById } from "../../../images";
import { ButtonComp, ModalComp2 } from "../../index-comp/IndexComp"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

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
                            <ModalComp2
                                text={image.title}
                                title={image.title}
                                button={ 
                                    <div>
                                        <ButtonComp>
                                            <FontAwesomeIcon icon={solid("heart")}></FontAwesomeIcon>
                                        </ButtonComp>
                                        <ButtonComp>
                                            <FontAwesomeIcon icon={solid("share-nodes")}></FontAwesomeIcon>
                                        </ButtonComp>  
                                        <ButtonComp>제작하러가기</ButtonComp>
                                    </div>
                                }
                                imageSRC={image.src}
                            >
                            <img src={image.src}/>
                            </ModalComp2>
                        </Col>
                        
                    ))
                }
            </Row>
        </Container>
    </>
    );
}