import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import "./FreeDesignComp.scss";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames";

const FreeDesignComp = ({ active, setFreeImageActive, addImage }) => {
  const storage = getStorage();
  const listRef = ref(storage, "freeDesign");
  const [images, setImages] = useState([]);

  const getImages = async () => {
    const imgArray = [];
    await listAll(listRef)
      .then(async (res) => {
        const promise = res.items.map(async (itemRef) => {
          return await getDownloadURL(ref(storage, itemRef.fullPath)).then(
            (r) => {
              imgArray.push(r);
            }
          );
        });
        await Promise.all(promise);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(imgArray);
    setImages(imgArray);
  };

  useEffect(() => {
    getImages();
  }, []);

  // 밖에 눌러 모달 닫기
  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setFreeImageActive(false)
    }
  }

  // 무료 이미지 추가
  const sendImg = (src) => {
    addImage(src)
    setFreeImageActive(false)
  }

  return (
    <>
      <div
        className={classNames("freedesigncomp_background", active && "actvie")}
        onClick={closeModal}
      >
        <div className="freedesigncomp">
          <h3>무료 디자인</h3>
          <div className="free_images">
            <Container>
              <Row>
                {images.map((img, i) => (
                  <Col key={i} sm="2" xs="4">
                    <div className="free_img_item" onClick={()=>{sendImg(img)}}>
                      <img src={img} alt="free_img"></img>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreeDesignComp;
