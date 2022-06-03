import './DesignsGrid.scss'
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function LikedDesigns() {
    const [ designs, setDesigns] = useState([
        { id: 1, title : "제목1" },
        { id: 2, title : "제목2" },
        { id: 3, title : "제목3" },
        { id: 4, title : "제목4" },
        { id: 5, title : "제목5" },
        { id: 6, title : "제목6" },
    ]);
    return (
        <>
            <div className='header'>
                <span id='title'>찜한 디자인</span>
                <a href="#">더보기</a>

                
            </div><Container fluid="sm">
                <Row>
                    {
                        designs.map( (design) => (
                        <Col xs={6} sm={4} md={2} key={design.id}>
                            <div className='design-thumb'>
                                
                            </div>
                            <p>{ design.title }</p>
                        </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}