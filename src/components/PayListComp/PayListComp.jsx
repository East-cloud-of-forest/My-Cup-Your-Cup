import React from 'react';
import { useSelector } from 'react-redux'
import { db } from '../../datasources/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useState,useEffect } from 'react';

const PayListComp = () => {

  const { user } = useSelector((a) => a.enteruser)
  
  const [list, setList] = useState([]);

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
  }

  useEffect(()=>{
    buyList()
  },[user])

  return (
    <div>
      <hr className="pay_main_hr"/>

        {list.map((a,i) => (
          <div key={i}>
            <img src={a.itemImage} alt="" />
            <p>{a.itemName} - {a.itemSize}</p>
            <hr />
          </div>
        ))}

      <hr className="pay_main_hr"/>
    </div>
  );
};

export default PayListComp;