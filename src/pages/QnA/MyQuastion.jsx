
import React from 'react'

import "../QnA/MyQuastion.scss"
import QnAmenu from './QnAmenu'
import { Link } from 'react-router-dom'



const MyQuastion = () => {

    return (
    <div>
        
        <QnAmenu />


        <div className="board">

    <div>

        <table className="in_board">
            
            <thead className="menu">
                <th>번호</th>
                <th>카테고리</th>
                <th>제목</th>
                <th>글쓴이</th>
                <th>작성일</th>
                <th>진행상태</th>
            </thead>
            <tbody className="contents">
                <tr>
                    <td>1</td>
                    <td>배송</td>
                    <td>배송 주문 질문</td>
                    <td>User</td>
                    <td>2022.6.11</td>
                    <td className="answer"><span class="">답변완료</span></td>
                </tr>

                <tr>
                    <td>2</td>
                    <td>회원</td>
                    <td>회원가입 관련 문의글 올립니다</td>
                    <td>User</td>
                    <td>2022.6.12</td>
                    <td className="answer"><span class="">답변완료</span></td>
                </tr>

                <tr>
                    <td>3</td>
                    <td>배송</td>
                    <td>주문한 제품이 언제 도착할까요?</td>
                    <td>User</td>
                    <td>2022.6.19</td>
                    <td className="answer"><span class="">답변완료</span></td>
                </tr>

                <tr>
                    <td>4</td>
                    <td>주문</td>
                    <td>제품 주문 방법</td>
                    <td>User</td>
                    <td>2022.6.23</td>
                    <td className="answer_Ready"><span class="">답변준비중</span></td>
                </tr>

                <tr>
                    <td>5</td>
                    <td>결제</td>
                    <td>결제 관련 문의사항</td>
                    <td>User</td>
                    <td>2022.7.04</td>
                    <td className="answer_Ready"><span class="">답변준비중</span></td>
                </tr>
            </tbody>

        </table>

            <div className="Next_Page">
                <span><Link to="" style={{ textDecoration: 'none' }}>1</Link></span>
                <span><Link to="" style={{ textDecoration: 'none' }}>2</Link></span>
                <span><Link to="" style={{ textDecoration: 'none' }}>3</Link></span>
            </div>

    </div>

    </div>
</div>
    )
}

export default MyQuastion
