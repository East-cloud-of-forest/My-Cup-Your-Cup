import React from 'react';
import DropdownChildComp from './DropdownChildComp';

const DropdownComp = props => {
    const [dropdownMet, setDropdownMet] = React.useState(false);

    const [dropdownStr, setDropdownStr] = React.useState(false);


    //재질
    const select_S = () =>{
        document.getElementById("cre_mete").innerHTML="스테인리스"
        setDropdownMet(!dropdownMet)
    }
    
    const select_P = () =>{
        document.getElementById("cre_mete").innerHTML="플라스틱"
        setDropdownMet(!dropdownMet)
    }

    //빨대
    const use_S = () =>{
        document.getElementById("cre_str").innerHTML="사용"
        setDropdownStr(!dropdownStr)
    }
    
    const unuse_S = () =>{
        document.getElementById("cre_str").innerHTML="미사용"
        setDropdownStr(!dropdownStr)
    }

    return (
        <div id='app'>
            <div className='cre_dropdownDiv'>
                <div id='cre_mete' onClick={(e) => setDropdownMet(!dropdownMet)}>
                재질을 선택하세요
                </div>
                <DropdownChildComp visibility={dropdownMet}>
                    <ul className='cre_DdList'>
                        <li><div onClick={select_S}>스테인리스</div></li>
                        <li><div onClick={select_P}>플라스틱</div></li>
                    </ul>
                </DropdownChildComp>
            </div>

            <div className='cre_dropdownDiv'>
                <div id='cre_str' onClick={(e) => setDropdownStr(!dropdownStr)}>
                빨대
                </div>
                <DropdownChildComp visibility={dropdownStr}>
                    <ul className='cre_DdList'>
                        <li><div onClick={use_S}>사용</div></li>
                        <li><div onClick={unuse_S}>미사용</div></li>
                    </ul>
                </DropdownChildComp>
            </div>
        </div>
    )
};

export default DropdownComp;