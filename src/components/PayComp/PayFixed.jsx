import React from 'react';
import { ButtonComp } from '../../components/index-comp/IndexComp'

const PayFixed = ({cost}) => {
    return (
        <div>
            <div className='pay_result'>
                <h1 className='pay_result_cost'><span className='pay_result_span'>총 </span>{cost+2500}원</h1>
                <div className='pay_result_buttons'>
                    <ButtonComp style={{width:"80px"}}>취소</ButtonComp>
                    <ButtonComp style={{width:"160px"}}>결제</ButtonComp>
                </div>
            </div>
        </div>
    );
};

export default PayFixed;