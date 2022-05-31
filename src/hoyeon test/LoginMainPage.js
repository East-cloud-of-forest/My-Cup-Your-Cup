

import React from 'react'

import {Link} from 'react-router-dom'

import "../hoyeon test/LoginMainPage.css"

import faceBookButton from "../img/페이스북 로그인 버튼.png"
import GoogleButton from "../img/구글 로그인 버튼.png"




const LoginMainPage = () => {




    return (
        <div>
        <i className="fa-solid fa-alicorn"></i>


        <div className="main-container">
            <div className="main-wrap">
    
                <header>
    
                    <div className="logo-wrap">
                        <h1>내잔네잔 로그인</h1>
                    </div>
    
                </header>
    
    
    
                <section className="login-input-section-wrap">
    
                    <div className="login-input-wrap">
                        <input placeholder="아이디을 입력하세요" type="text" />
                    </div>
    
                    <div className="login-input-wrap password-wrap">
                        <input placeholder="비밀번호를 입력하세요" type="password" />
                    </div>
    
                    <div className="login-button-wrap">
                        <a href=""><button>로그인</button></a>
                    </div>
    
                </section>
    
            <section className="forget-account-p"> 
                <p><a href="" className="forget-account-a">아이디 찾기</a>   |  <a href="" className="forget-account-a">비밀번호 찾기</a>  | <a href="Join" className="forget-account-a">회원가입</a></p>
            </section>   
    
    
    
                    
            <div className="container">
    
                <h2>간편 로그인 버튼</h2>
    
                <div><a href="https://accounts.google.com/ServiceLogin?hl=ko&passive=true&continue=https://www.google.co.kr/&ec=GAZAmgQ"><img className="GoogleButton" src={GoogleButton} /></a></div>
                <div><a href="https://ko-kr.facebook.com/"><img className="FacebookButton" src={faceBookButton} /></a></div>
    
            </div>


    
            </div>
        </div>
    </div>
    )
}


export default LoginMainPage