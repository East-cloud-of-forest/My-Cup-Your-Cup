import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonComp } from '../index-comp/IndexComp';
import './TotalPriceComp.scss'

function TotalPriceComp({ items }) {
    let formatter = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
    });
    const navigate = useNavigate();
    // 총 금액
    const selected = items.filter( item => item.selected === true );
    const totals = selected.map( s => s.total )

    let sum = 0;
    const totalPrice = totals.reduce( (prev, curr) => prev + curr, sum )

    // 결제페이지로 이동
    const toPayment = () => {
        navigate('/pay');
    }

    return (
        <div className='price_container'>
        
        <div className='text_container'>
            <p style={{ display: "block"}}>총 배송비 <br /> 
            <span className='price'>{formatter.format(2500)}</span> </p>
            <p>총 상품가격 <br />
            <span className='price'>{formatter.format(Number(totalPrice))}</span> </p>
            <hr />
            <span className='price'>{formatter.format(Number(totalPrice+2500))}</span>

        </div>
            <div className='buttons'>
                {/* 이전에 저장된 데이터 뜨게 하려면?? -> 수정 버튼에서 구현 */}
                <ButtonComp color="brown" onClick={()=> navigate('/')}>
                    취소
                </ButtonComp>
                <ButtonComp color="darkgreen" onClick={toPayment}>결제하기</ButtonComp>
            </div>
        </div>
    );
}

export default TotalPriceComp;