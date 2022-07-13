import "./Design.scss";
import { Container, Row, Col } from "react-bootstrap";
import { getFirebaseData } from "../../datasources/firebase";
import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadingEnd, loadingStart } from "../../modules/loading";
import DesignModalComp from "../../components/DesignModalComp/DesignModalComp";

const Design = () => {
  const dispatch = useDispatch();
  const startLoading = useCallback(() => dispatch(loadingStart()), [dispatch]);
  const endLoading = useCallback(() => dispatch(loadingEnd()), [dispatch]);

  // 파이어스토어에서 마이디자인컬렉션 가져오기
  const [designCol, setDesignCol] = useState([]);
  const getDesign = () => async () => {
    startLoading();
    document.body.style.overflow = "hidden";
    try {
      let array = [];
      const designColRef = getFirebaseData("MyDesign");
      (await designColRef).forEach((doc) => {
        //console.log(doc);
        array.push({
          //id: doc.data().id, // undefined 뜸 -> 없어도 되지않을까..?
          title: doc.data().title,
          text: doc.data().text,
          image: doc.data().image,
          tag: doc.data().tag,
          user: doc.data().user,
          createdAt: doc.data().createdAt,
          private: doc.data().private,
          cupInfo: doc.data().cupInfo,
        });
      });
      setDesignCol(array);
      document.body.style = "";
      endLoading();
    } catch (err) {
      console.log(err.message);
      document.body.style = "";
      endLoading();
    }
  };

  // 공개된 디자인만 가져오기
  const oDesigns = designCol.filter((d) => d.private === false);
  useEffect(() => {
    dispatch(getDesign());
  }, [dispatch]);

  return (
    <div className="design_page">
      <div>
        <h1>잔디자인</h1>
        <Container fluid>
          <Row>
            {oDesigns.map((design, i) => (
              <Col xl="2" lg="3" md="4" sm="6" key={i}>
                <DesignModalComp design={design} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default Design;
