

import React from 'react'

import './SearchID.scss'


const SearchID = (props) => {

    const { open, close } = props;
    
    return(
        <div className={ open ? 'openModal modal' : 'modal' }>

        {open ? (
            <section>

                <header>
                    해더 부분 <button className="close" onClick={close}>X</button>
                </header>
                
                <main>아이디찾기 모달창</main>

            </section>
        ) : null }

        </div>

    )
}

export default SearchID

