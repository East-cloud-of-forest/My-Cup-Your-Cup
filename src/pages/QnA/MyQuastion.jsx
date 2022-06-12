
import React from 'react'

import "../QnA/MyQuastion.scss"
import QnAmenu from './QnAmenu'



const MyQuastion = () => {

    return (
    <div>
        
        <QnAmenu />

        <div class="board">
        <table class="in_board">
            
            <thead class="menu">
                <th>번호</th>
                <th>카테고리</th>
                <th>제목</th>
                <th></th>
                <th>글쓴이</th>
                <th>날짜</th>
            </thead>
            <tbody class="contents">
                <tr>
                    <td>1</td>
                    <td>배송</td>
                    <td>@월 @일 배송 관련 질문</td>
                    <td class="answer"><span class="">답변완료</span></td>
                    <td>User</td>
                    <td>6/11</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>회원</td>
                    <td>회원가입 관련 문의글 올립니다</td>
                    <td class="answer"><span class="">답변완료</span></td>
                    <td>User</td>
                    <td>6/12</td>
                </tr>
            </tbody>

        </table>
    </div>

    </div>
    )
}

export default MyQuastion
