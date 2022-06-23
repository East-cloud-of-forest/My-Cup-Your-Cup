import React, { useState } from 'react';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';

const Main = () => {
	// 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)

	// 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }

	// 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }

    return(
        <div>
            <button type='button' onClick={openPostCode}>검색</button>
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode onClose={closePostCode} />
                        <button type='button' onClick={closePostCode} className='postCode_btn'>x</button>
                    </PopupDom>
                )}
            </div>
        </div>
    )
}

export default Main;