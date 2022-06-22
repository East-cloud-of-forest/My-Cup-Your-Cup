

import React from 'react'

import './SearchPassword.scss'


const SearchPassword = (props) => {

    const { open, close } = props;
    
    return(
        <div className={ open ? 'openModal loginmodal' : 'loginmodal' }>

        {open ? (
            <section>

                <header>
                    해더 부분 <button className="close" onClick={close}>X</button>
                </header>
                
                <main>비밀번호찾기 모달창</main>

            </section>
        ) : null }

        </div>

    )
}

export default SearchPassword

