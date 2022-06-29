import React from 'react';
import {ButtonComp} from '../../components/index-comp/IndexComp'
import { useNavigate } from 'react-router-dom'

const PayFixed = ({cost, receiverName, phoneNum, addInfo, addDetail}) => {
    
    const navigate = useNavigate()

    const sendComplete = () => {
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