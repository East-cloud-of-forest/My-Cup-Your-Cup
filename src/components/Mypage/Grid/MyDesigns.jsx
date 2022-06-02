import "./DesignsGrid.scss";
// import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IMAGES, getImageById } from "../../../images";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import { ModalComp } from "../../index-comp/IndexComp"

export default function MyDesigns() {

    return (
    <>
        <div className="header">
            <span id="title">나의 디자인</span>
            <a href="#">더보기</a>
        </div>

        <Container fluid="sm">
            <img src={IMAGES[0].src} alt={IMAGES[0].title} />
            <ModalComp imageURL={IMAGES[0].src} title={IMAGES[0].title} />
        </Container>
    </>
    );
}