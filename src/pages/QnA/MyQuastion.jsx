
import React from 'react'

import "../QnA/MyQuastion.scss"
import { Link } from 'react-router-dom'
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers'

import { propTypes } from 'react-bootstrap/esm/Image'


import Article from './Article'
import { useState } from 'react'
import Ask from './Ask'
import App from '../../App'
import { useEffect } from 'react'
import { getFirebaseData } from '../../datasources/firebase'




const MyQuastion = (props) => {
    const getPost = () => {
        getFirebaseData('post').then(r=>
            r.forEach(d=>console.log(d.data()))
            )
    }
    useEffect(()=>{
        getPost()
    })

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
    else if (mode==="CREATE") {
        
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


    </div>

    <div className='postText'>
            {/* 게시글 출력 확인용 */}
                { postText }
    </div>

</div>
    )
}

export default MyQuastion
