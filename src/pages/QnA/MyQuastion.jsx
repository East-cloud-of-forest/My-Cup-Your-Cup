
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

    const [test, setTest] = useState(null)

    let aa = null;

    const getPost = () => {
         // firestore에 있는 post 컬렉션 데이터를 호출한다
        getFirebaseData('post')
        .then((result) => {
            result.forEach((doc)=> {
                aa = doc.data()
            })
            console.log(aa.food)
            console.log(aa.num1)
        })

        // 정상적으로 데이터 호출 됬을 경우 forEach 반복문으로 
        // post 컬렉션 데이터를 콘솔로그에 하나씩 출력한다.
        // 잠시 주석처리 .then(r=>
        //     r.forEach(d=>console.log(d.data()))
        //     )
    }

    // UI가 재 랜더링 될때마다 getPost 함수를 실행한다.
    useEffect(()=>{
        getPost()
    })

    // 게시글 데이터 
    const [ post, setPost ] = useState([
        {id: 1, category:"회원", date:'날짜', title:"게시글 테스트", body:"게시글테스트 출력"},
        {id: 2, category:"배송", date:'날짜', title:"게시글 테스트2", body:"2번째 게시글"},
    ])
    
    // 게시판 세부 기능 컨트롤
    const [ mode, setMode ] = useState()
    const [ id, setId ] = useState(null)
    const [ nextId, setNextId ] = useState(3)

    // firestore에서 가져온 게시글 데이터 저장
    const [ firestoreBODY, setfirestoreBODY ] = useState(["임의 내용"])
    const [ firestoreCATEGORY, setfirestoreCATEGORY ] = useState(["임의 카테고리"])
    const [ firestoreDATE, setfirestoreDATE ] = useState(["2022년 0월0일"])
    const [ firestoreTITLE, setfirestoreTITLE ] = useState(["임의 제목"])


    let postText = null;
    let title, body = null;


    // 게시글 읽기 모드일 경우 실행


        for(let i=0; i<post.length; i++) {
            if(post[i].id === id) {
                title = post[i].title;
                body = post[i].body;


            }
        }

        postText = <Article title={title} body={body} />



    // 게시글 쓰기 모드일 경우 실행

        
    if(false) {

        const newPost1 = {id:nextId, category: firestoreCATEGORY, date: firestoreDATE, title: firestoreTITLE, body: firestoreBODY}
        const newPost2 = [...post]

        newPost2.push(newPost1)

        setPost(newPost2)
        setNextId(nextId+1)
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
