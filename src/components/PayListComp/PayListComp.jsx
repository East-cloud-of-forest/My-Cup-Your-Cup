import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../datasources/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { Spinner } from 'react-bootstrap'
import { loadingEnd, loadingStart } from "../../modules/loading";

const PayListComp = () => {
  const { user } = useSelector((a) => a.enteruser);

  const [list, setList] = useState([]);

  const { loading } = useSelector((a) => a.loading)
  const dispatch = useDispatch()
  const startLoading = useCallback(() => dispatch(loadingStart()), [dispatch])
  const endLoading = useCallback(() => dispatch(loadingEnd()), [dispatch])

  const buyList = async () => {
    startLoading()
    document.body.style.overflow = 'hidden'
    let userID = user.uid;
    const docRef = doc(db, "user", userID);
    getDoc(docRef).then((r) => {
      //uid의 itemList가져옴
      const data = r.data().itemsList;
      
      //날짜값 push
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

      console.log(list);
      document.body.style = ''
      endLoading()
    });
  };

  useEffect(() => {
    if (user) {
      
      buyList();
      
    }
  }, [user]);

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
        <div>
          <h3 className="pl_date" key={i}>{Object.keys(l)}</h3>
          <hr />
          {Object.values(l)[0].map((v,index) => (
            <div className="pl_item" key={index}>
              <div>
                <img className="pl_item_pic" src={v.itemImage} alt="" />
                <p>{v.itemName} - {v.itemSize}</p>
              </div>
              <p className="pl_price">{v.itemPrice}원</p>
            </div>
          ))}
          
        </div>
      ))}

      <hr className="pay_main_hr" />
    </div>
  );
};

export default PayListComp;
