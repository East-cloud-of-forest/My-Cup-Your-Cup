import React, { useState, useCallback } from 'react';
import "./PayPage.scss";
import PayAddress from '../../components/PayComp/PayAddress';
import PayOrderList from '../../components/PayComp/PayOrderList';
import PayMethod from '../../components/PayComp/PayMethod';
import { useSelector, useDispatch } from 'react-redux';
import PayFixed from '../../components/PayComp/PayFixed';
import { deleteItem } from "../../modules/addCart"

const PayPage = () => {
    const {items} = useSelector( (state) => ({ items : state.cartReducer.items }) );
    const selectedItems = items.filter( item => item.selected === true );

    const dispatch = useDispatch();
    const onDeleteItem = useCallback( (id)=>dispatch(deleteItem(id)), [dispatch]);
    
    const [cost,setCost] = useState(0)
    const getData = (cost) =>{
        setCost(cost);
    }

    //주소를 받아와서 요건이 충족되지않으면 complete로 넘어가지않게 함
    const [addInfo,setAddInfo] = useState("")
    const getAddressNum = (address) =>{
        setAddInfo(address)
    }
    const [addDetail,setAddDetail] = useState("")
    const getAddressDetail = (address) =>{
        setAddDetail(address)
    }

    const [receiverName,setReceiverName] = useState("")
    const getName = (name) => {
        setReceiverName(name)
    }

    const [phoneNum,setPhoneNum] = useState("")
    const getNum = (num)=>{
        setPhoneNum(num)
    }


    return (
        <div className='pay_all_div'>
            <h1 className='pay_h1'>결제 페이지</h1>
            
            {/**주문목록 */}
            <div>
                <PayOrderList items={selectedItems} cost={cost} getData={getData}/>
            </div>

            {/**배송지정보 */}
            <div>
                <PayAddress getName={getName} getNum={getNum} getAddressNum={getAddressNum} getAddressDetail={getAddressDetail} />
            </div>

            {/**결제수단 */}
            <div>
                <PayMethod />
            </div>

            {/**픽스 div */}
            <div>
                <PayFixed items={selectedItems} onDeleteItem={onDeleteItem} cost={cost} receiverName={receiverName} phoneNum={phoneNum} addInfo={addInfo} addDetail={addDetail} />
            </div>
        </div>
    );
};

export default PayPage;