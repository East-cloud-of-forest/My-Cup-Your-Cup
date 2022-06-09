import './DesignsGrid.scss'
import { IMAGES } from '../../../images';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ButtonComp, ModalComp2 } from '../../index-comp/IndexComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function LikedDesigns() {
    const [isOpen, setIsOPen] =useState(false);
    const handleOpen = () => setIsOPen(!isOpen);

    if (isOpen) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <div className='header'>
                <span id='title'>찜한 디자인</span>
                <a href="#">더보기</a>

                
            </div>
            {/* 리스트/링크/이미지 클릭시 해당 상품 모달은 path로 네비게이트? */}
            <Container fluid="sm">
                
                <Row>
                    {  
                        IMAGES.map( (image, i) => (

                            <Col key={i}>
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
                            >
                            <img src={image.src}/>
                            </ModalComp2>
                        </Col>
                        ))
                    } 
                </Row>
            </Container>
        </>
    )
}