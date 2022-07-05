import React from 'react';
import { useSelector } from 'react-redux'
import { db } from '../../datasources/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useState,useEffect } from 'react';

const PayListComp = () => {

  const { user } = useSelector((a) => a.enteruser)
  
  const [list, setList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [fList,setFList] = useState([]);

  const buyList =  async () => {
    
    let userID = user.uid

    const docRef = doc(db,"user",userID);
    const userData = (await getDoc(docRef)).data();

    //배열로 데이터의 키를 배열로 변환하여 아이템리스트의 인덱스를 구함
    const listIndex = Object.keys(userData).indexOf("itemsList")
    
    //아이템리스트의 값을 반환하게 함
    const itemListValue = Object.values(userData)[listIndex];
    
    console.log(itemListValue)
    
    setList(itemListValue)

    console.log(list);
    
    //날짜 모으기
    const dateArr = []

    for (let i = 0; i < list.length; i++) {
      dateArr.push(list[i].boughtDate);
    }
    //중복 제거된 날짜 배열
    const dateNewArr = [...new Set(dateArr)]
    setDateList(dateNewArr)

    const finalList =[];

    for (let i = 0; i < dateList.length; i++) {
      finalList.push(
        { [dateList[i]] : list.filter( l => l.boughtDate == dateList[i])}
      )
    }

    setFList(finalList)
    
    console.log(fList[0])
  }

  useEffect(()=>{
    buyList()
  },[user])

  return (
    <div>
      <hr className="pay_main_hr"/>

      {fList.map((d,i)=>(
        <div>
          <h3 key={i}></h3>
        </div>
      ))}

        {/* {list.map((t,index) => (
          
          <div key={index}>
            <img src={t.itemImage} alt="" />
            <p>{t.itemName} - {t.itemSize}</p>
            <hr />
          </div>
        ))} */}

      <hr className="pay_main_hr"/>
    </div>
  );
};

export default PayListComp;