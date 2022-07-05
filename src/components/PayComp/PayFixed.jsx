import React from 'react';
import {ButtonComp} from '../../components/index-comp/IndexComp'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { db, setFirebaseData } from '../../datasources/firebase'
import { doc, getDoc } from 'firebase/firestore';

const PayFixed = ({onDeleteItem, items, cost, receiverName, phoneNum, addInfo, addDetail}) => {
    
    const navigate = useNavigate()

    const { user } = useSelector((a) => a.enteruser)
    const sendFirebase = async () => {
        // let userInfo = user.reloadUserInfo
        let userID = user.uid

        const docRef = doc(db,"user",userID);
        getDoc(docRef).then(r => console.log(r.data()))

        //기존 데이터 가져오기위한 선언
        const userData = (await getDoc(docRef)).data();

        //구매상품 데이터 추가
        const boughtItems = userData.itemsList?userData.itemsList:[]
        const date = new Date();
        
        for (let i = 0; i < items.length; i++) {
            const boughtItem = {
                boughtDate : date.toLocaleDateString('ko-kr'),
                itemImage : items[i].image,
                itemName : items[i].name,
                itemSize : items[i].size,
                itemStraw : items[i].strow,
                itemColor : items[i].color,
                itemQ : items[i].quantity,
                itemPrice : items[i].total
            };
            boughtItems.push(boughtItem);
        }

        await setFirebaseData('user', userID, {
            ...userData,
            itemsList : boughtItems
        })
    }

    const sendComplete = async () => {
        if(addInfo===""){
            alert("주소를 입력해주세요")
        }else if(addDetail===""){
            alert("상세주소를 입력해주세요")
        }else if(receiverName===""){
            alert("상품 수령인 성명을 입력하세요")
        }else if(phoneNum===""){
            alert("연락처를 입력하세요")
        }
        else{
            navigate('/complete')
            //추가로 firebase로 보내준다
            await sendFirebase()

            for (let i = 0; i < items.length; i++) {
                let id = items[i].id;
                onDeleteItem(id);
            }
        }
    }

    const sendCart = () => {
        navigate('/cart')
    }

    return (
        <div>
            <div className='pay_result'>
                <h1 className='pay_result_cost'>
                    <span className='pay_result_span'>총
                    </span>{(cost + 2500).toLocaleString()}원</h1>
                <div className='pay_result_buttons'>
                    <ButtonComp
                        onClick={sendCart}
                        style={{
                            width: "80px"
                        }}>취소</ButtonComp>
                    <ButtonComp
                        onClick={sendComplete}
                        style={{
                            width: "160px"
                        }}>결제</ButtonComp>
                </div>
            </div>
        </div>
    );
};

export default PayFixed;