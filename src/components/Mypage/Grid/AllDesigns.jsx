import './DesignsGrid.scss'
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function AllDesigns() {
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
                <span id='title'>전체보기</span>
                <a href="#">더보기</a>
            </div>
            
            <Container fluid="sm">
                <Row>
                    {
                        designs.map( (design) => (
                        <Col xs={6} sm={4} md={2} key={design.id}>
                            <div className='design_thumb'>
                                
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