import {
  ButtonComp,
  ModalComp,
  Pagination,
  ProfileComp,
} from '../../components/index-comp/IndexComp'
import './Design.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Container, Row, Col } from 'react-bootstrap'
import { getFirebaseData } from '../../datasources/firebase'
import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadingEnd, loadingStart } from '../../modules/loading'
import { deepCopy } from '@firebase/util'
import { addItem } from '../../modules/addCart'
import DesignModalComp from '../../components/DesignModalComp/DesignModalComp'

const Design = () => {
  
  const {user} = useSelector(user => user.enteruser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startLoading = useCallback(() => dispatch(loadingStart()), [dispatch]);
  const endLoading = useCallback(() => dispatch(loadingEnd()), [dispatch]);

  // 파이어스토어에서 마이디자인컬렉션 가져오기
  const [designCol, setDesignCol] = useState([]);
  const getDesign = () => async () => {
    startLoading();
    document.body.style.overflow = 'hidden';
    try {
      let array = [];
      const designColRef = getFirebaseData('MyDesign');
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
          cupInfo: doc.data().cupInfo
        });
      });
      setDesignCol(array);
      document.body.style = '';
      endLoading();
    } catch (err) {
      console.log(err.message);
      document.body.style = '';
      endLoading();
    }
  }

  // 공개된 디자인만 가져오기
  const oDesigns = designCol.filter((d) => d.private === false);
  useEffect(() => {
    dispatch(getDesign())
  }, [dispatch]);
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

      <Pagination />
    </div>
  )
}
export default Design
