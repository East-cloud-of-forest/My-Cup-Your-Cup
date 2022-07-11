
import React from 'react'

import "../QnA/MyQuastion.scss"
import QnAmenu from './QnAmenu'
import { Link } from 'react-router-dom'
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers'

import { propTypes } from 'react-bootstrap/esm/Image'


import Article from './Article'
import { useState } from 'react'
import Ask from './Ask'
import App from '../../App'




const MyQuastion = (props) => {

    // 게시글 데이터 
    const [ post, setPost ] = useState([
        {id: 1, category:"회원", date:'날짜', title:"게시글 테스트", body:"게시글테스트 출력"},
        {id: 2, category:"배송", date:'날짜', title:"게시글 테스트2", body:"2번째 게시글"},
    ])
    
    // 게시판 세부 기능 컨트롤
    const [ mode, setMode ] = useState("READ")
    const [ id, setId ] = useState(null)
    const [ nextId, setNextId ] = useState(4)


    let postText = null;
    let title, body = null;


    // 게시글 읽기 모드일 경우 실행

    if (mode === "READ") {
        for(let i=0; i<post.length; i++) {
            if(post[i].id === id) {
                title = post[i].title;
                body = post[i].body;
            }
        }

        postText = <Article title={title} body={body} />
    }


    // 게시글 쓰기 모드일 경우 실행
// mode === "CREATE"
    else if (mode==="READ") {
        
            const createPost = props.getNewPost

            const date = createPost.year+"."+createPost.month+"."+createPost.day
            const newPost1 = {id:nextId, category: createPost.category, date: date, title: createPost.title, body: createPost.body}
            const newPost2 = [...post]

            newPost2.push(newPost1)

            setPost(newPost2)
            setNextId(nextId+1)

            setMode('READ')
        }
    


    // 게시글 출력 관련

    let list = []
    const ChangeReadMode = () => {
        setMode("READ")
    }

    for(let i=0; i<post.length; i++) {
        
        let p = post[i]

        const ReadPostId = () => {
            setId(p.id)
        }

        
        list.push(
            <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.category}</td>
                <td>
                    <a href=""
                    onClick={(e)=> {
                        e.preventDefault();
                        ChangeReadMode() ;
                        ReadPostId();
                    }}>
                    {p.title}
                    </a>
                </td>
                <td>가입회원</td>
                <td>{p.date}</td>
                <td className="answer">답변준비중</td>
            </tr>
        )
    }




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
                {list}
            </tbody>

        </table>

        </div>



        {/* 기존 게시판 백업*/}
    {/* <div>

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

    </div> */}


    </div>

    <div className='postText'>
            {/* 게시글 출력 확인용 */}
                { postText }
    </div>

</div>
    )
}

export default MyQuastion
