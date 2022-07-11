import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../datasources/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { Spinner } from 'react-bootstrap'
import { loadingEnd, loadingStart } from "../../modules/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from 'react-router-dom';
import { reviewItem } from "../../modules/review";
import { addReviewItem } from "../../modules/writeReview";

const PayListComp = () => {
  const { user } = useSelector((a) => a.enteruser);

  const [list, setList] = useState([]);

  const { loading } = useSelector((a) => a.loading)
  const dispatch = useDispatch()
  const startLoading = useCallback(() => dispatch(loadingStart()), [dispatch])
  const endLoading = useCallback(() => dispatch(loadingEnd()), [dispatch])

  const navigate = useNavigate();

  const buyList = async () => {
    let userID = user.uid;
    const docRef = doc(db, "user", userID);
    getDoc(docRef).then((r) => {
      //uid의 itemList가져옴
      const data = r.data().itemsList;
      
      //날짜값 push
      if(data===undefined){
        alert("결제내역이 없습니다.")
        navigate(-1)
      }else{ 
        startLoading()
        document.body.style.overflow = 'hidden'
        const dateArr = [];
        for (let i = 0; i < data.length; i++) {
          dateArr.push(data[i].boughtDate);
        }
        //push된 날짜 중 중복날짜 제거
        const dateNewArr = [...new Set(dateArr)]

        const finalList = [];
        for (let i = 0; i < dateNewArr.length; i++) {
          finalList.push({
            [dateNewArr[i]]: data.filter((l) => l.boughtDate == dateNewArr[i]),
          });
        }
        setList(finalList);

        document.body.style = ''
        endLoading()
      }
    });
  };

  useEffect(() => {
    if (user) {
      buyList();
    }
  }, [user]);
  
  const sendReviewItem = useCallback((item)=>dispatch(addReviewItem(item)),[dispatch])
  const writeReview = (i,index) =>{
    console.log(Object.values(list[i])[0][index])
    sendReviewItem(Object.values(list[i])[0][index])
    navigate("/review/write");
  }

  return (
    <div className="pl_main">

        {loading ? (
          <div className="pullpage_loading">
            <Spinner animation="border" role="status" />
          </div>
        ) : null}

      <hr className="pay_main_hr" />
      <h1 className="pl_title">결제 내역</h1>
      <hr className="pay_main_hr" />
      {list.map((l, i) => (
        <div key={i}>
          <h3 className="pl_date">{Object.keys(l)}</h3>
          <hr />
          {Object.values(l)[0].map((v,index) => (
            <div className="pl_item" key={index}>
              <div>
                <img className="pl_item_pic" src={v.itemImage} alt="" />
                <p>{v.itemName} - {v.itemSize}</p>
              </div>
              <div className="pl_for_flex">
                <div className="pl_writeReview" onClick={()=>{writeReview(i,index)}} >
                  <FontAwesomeIcon icon={faPen} /> 
                  &nbsp;리뷰 작성
                </div>
                <p className="pl_price">{v.itemPrice}원</p>
              </div>
            </div>
          ))}
          
        </div>
      ))}

      <hr className="pay_main_hr" />
    </div>
  );
};

export default PayListComp;
