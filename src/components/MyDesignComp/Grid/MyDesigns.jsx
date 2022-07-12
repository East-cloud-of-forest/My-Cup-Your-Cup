import "./DesignsGrid.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Popover, Overlay } from "react-bootstrap";
import { ButtonComp, ModalComp, ProfileComp } from "../../index-comp/IndexComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useDispatch, } from "react-redux";
import { deleteFirebaseData, getFirebaseData } from "../../../datasources/firebase";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../../modules/addCart";

export default function MyDesigns(user) {
    const [ designs, setdesigns ] = useState([]);
    const [ show, setShow ] = useState(false);
    const [ target, setTarget ] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef();

    // 디자인 가져오기
    const getDesign = () => async () => {
        try{
            let array = [];
            const designColRef = getFirebaseData("MyDesign"); // 파이어스토어 컬렉션 문서 가져오기
            (await designColRef).forEach( (doc) => { 
                array.push({ 
                    id: doc.id, 
                    title: doc.data().title, 
                    text: doc.data().text,
                    image: doc.data().image,
                    tag: doc.data().tag,
                    private: doc.data().private,
                    user: doc.data().user,
                    createdAt: doc.data().createdAt,
                    cupInfo: doc.data().cupInfo,
                });
            })
            setdesigns(array); 
        } catch (e) { console.log(e); }
    }
    useEffect(()=> {dispatch(getDesign());}, [dispatch]);

    // 인증된 유저의 디자인만 가져오기
    const myDesign = designs.filter( d => (d.user.uid === user.user.uid) );
    // 수정, 삭제 팝오버
    const handleClick = (e) => {
        setShow(!show);
        setTarget(e.target);
    }
    // 삭제버튼 클릭시
    const deletePost = async (id) => {
        try {
            alert('정말 삭제하시겠습니까?');
            await deleteFirebaseData('MyDesign', id);
            window.location.reload();
        }
        catch (e) { console.log(e); }
    }
    // 날짜표시
    const datefn = (d) => {
        let postDate = new Date(d);
        return `${postDate.getFullYear()}-${postDate.getMonth()+1}-${postDate.getDate()}`
    }
    // 장바구니 추가
    const onAddItem = useCallback(
        (tumblur) => dispatch(addItem(tumblur)),
        [dispatch]
    );
    const addToCart = (info) => {
        onAddItem({
        image: info.image,
        name: info.name,
        color: info.color,
        material: info.material,
        size: info.size,
        strow: info.strow,
        shape: info.shape,
        price: info.price,
        quantity: info.quantity,
        total: info.total
        });
        navigate('/cart')
    }

    return (
        <>
        <div className="header">
            <h3 id="title">나의 디자인</h3>
            <a href="#">더보기</a>
        </div>

        <Container fluid="sm">
        <Row>
            {
                myDesign.length >= 1 ? 
                ( myDesign.map(design => (
                <Col xl="2" lg="3" md="4" sm="6" key={design.id}>
                    <ModalComp 
                        button={
                            <div id="temp_image">
                                <img src={design.image} alt={design.title}/>
                            </div>
                            }
                        image={<img src={design.image} alt={design.title}/>}
                        className="design_modal"
                    >
                    <div className="modal_head" ref={ref}>
                        <h2>{design.title}</h2>
                    
                        <ButtonComp icon onClick={handleClick}>
                            <FontAwesomeIcon icon={solid("ellipsis-vertical")} />
                        </ButtonComp>
                        <Overlay
                            show={show}
                            target={target}
                            placement="left"
                            container={ref}
                            containerPadding={20}
                            rootClose
                            onHide={() => setShow(false)}
                        >
                            <Popover id="ellipsis_popover">
                                <ButtonComp icon onClick={() => navigate(`/edit/${design.id}`)}>
                                    <FontAwesomeIcon icon={solid("pen-to-square")}/> 수정
                                </ButtonComp> <br/>
                                <ButtonComp icon onClick={()=> deletePost(design.id)}>
                                    <FontAwesomeIcon icon={solid("trash-can")}/> 삭제
                                </ButtonComp>
                            </Popover>
                        </Overlay>
                        
                    </div>
                        {
                            design.private === true ? (
                                <span style={{ fontSize: "smaller", color: "gray" }}>
                                    <FontAwesomeIcon icon={solid("lock")}/> 비공개 게시물입니다
                                </span>) : null
                        }
                    <div className="modal_body">
                        <p>{design.text}</p>
                        <div className="hashtag">
                            { 
                                design.tag.map( (tag, i) => (
                                    <span key={i}>{tag}</span>
                                ))
                            }
                        </div>
                    </div>

                    <div className="modal_footer">
                        <div className="profile_block">
                            <ProfileComp
                                className="profile" 
                                justName 
                                userName={user.user.displayName} 
                                imageURL={user.user.photoURL}
                            />
                            <span id="date_span">{datefn(design.createdAt)}</span>
                        </div>
                        <div className="button_block">
                        <ButtonComp icon id="like_btn">
                            <FontAwesomeIcon icon={solid("heart")} />
                        </ButtonComp>
                        <ButtonComp icon id="share-btn">
                            <FontAwesomeIcon icon={solid("share-nodes")} />
                        </ButtonComp>  
                        <ButtonComp icon id="create-btn" 
                            onClick={() => {
                                addToCart(design.cupInfo)}
                        }>
                            <FontAwesomeIcon
                                icon={solid('cart-shopping')}
                            ></FontAwesomeIcon>
                        </ButtonComp>
                        </div>
                    </div>
                </ModalComp>
                </Col>)
                )) : ( <p>나의 디자인이 없습니다.</p> )
            }
        </Row>
        
        </Container>
    </>
    );
}
