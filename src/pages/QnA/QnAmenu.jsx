

import React from 'react'
import { Link } from 'react-router-dom'



import "../QnA/QnAmenu.scss"


const QnAmenu = () => {


    return(
        <div>

            
        <div className="QnAmain_header">
        
        <Link className="FAQ" to='/QnAmenu/FaqPage'>
                <span>자주 묻는 질문</span>
        </Link>

        <Link className="my_quastion" to='/QnAmenu/MyQuastion'>
                <span>나의 문의게시글</span>
        </Link>

        <Link className="ask" to='/QnAmenu/Ask'>
                <span>문의하기</span>
        </Link>

        </div>

        </div>
    )
}

export default QnAmenu