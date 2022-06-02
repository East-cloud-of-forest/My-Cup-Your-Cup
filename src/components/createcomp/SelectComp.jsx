import { useState } from "react";

const SelectComp = (props) => {
    
    const [metSelect,setMetSelect] = useState(0)

    const changeMet = (e)=>{
        setMetSelect(e.target.value);
    }

    const [sizeSelect,setSizeSelect] = useState(0)

    const changeSize = (e)=>{
        setSizeSelect(e.target.value);
    }
    
    const [strawSelect,setStrawSelect] = useState(0)

    const changeStraw = (e)=>{
        setStrawSelect(e.target.value);
    }

    //split 함수

    const summa =  parseInt(metSelect)+parseInt(sizeSelect)+parseInt(strawSelect)

    
    return (
        <div>
            <select  className="cre_selectbox" onChange={changeMet}>
                <option value="0" selected>재질을 선택하세요</option>
                <option value="10000">스테인리스</option>
                <option value="5000_pla">플라스틱</option>
            </select>

            <select className="cre_selectbox" onChange={changeSize}>
                <option value="0" selected>용량</option>
                <option value="5000_big">대</option>
                <option value="3000_mid">중</option>
                <option value="2000_small">소</option>
            </select>

            <select className="cre_selectbox" onChange={changeStraw}>
                <option value="0" selected>빨대</option>
                <option value="2000_use">사용</option>
                <option value="0_none">미사용</option>
            </select>

            <div className="cre_calc">
                <p>총 가격</p>
                <h3>{summa.toLocaleString()}원</h3>
            </div>
        </div>
    )

}

export default SelectComp;