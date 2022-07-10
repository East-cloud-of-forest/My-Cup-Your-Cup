import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import "./FreeDesignComp.scss";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { loadingEnd, loadingStart } from "../../modules/loading";

const FreeDesignComp = ({ active, setFreeImageActive, addImage }) => {
  const storage = getStorage();
  const listRef = ref(storage, "freeDesign");
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((a) => a.loading);
  const startLoading = useCallback(() => dispatch(loadingStart()), [dispatch]);
  const endLoading = useCallback(() => dispatch(loadingEnd()), [dispatch]);

  const getImages = async () => {
    startLoading();
    document.body.style.overflow = "hidden";
    const imgArray = [];
    await listAll(listRef)
      .then(async (res) => {
        const promise = res.items.map(async (itemRef) => {
          return await getDownloadURL(ref(storage, itemRef.fullPath)).then(
            (r) => {
              const img = new Image();
              img.crossOrigin = "anonymous";
              img.src = r;
              img.onload = () => {
                imgArray.push(img);
              };
            }
          );
        });
        await Promise.all(promise);
      })
      .catch((e) => {
        console.log(e);
      });
    setImages(imgArray);
    document.body.style = "";
    endLoading();
  };

  useEffect(() => {
    getImages();
  }, []);

  // 밖에 눌러 모달 닫기
  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setFreeImageActive(false);
    }
  };

  // 무료 이미지 추가
  const sendImg = (src) => {
    addImage(src);
    setFreeImageActive(false);
  };

  return (
    <>
      {loading ? (
        <div className="pullpage_loading">
          <Spinner animation="border" role="status" />
        </div>
      ) : null}

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
                    <div
                      className="free_img_item"
                      onClick={() => {
                        sendImg(img);
                      }}
                    >
                      <img src={img.src} alt="free_img"></img>
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
