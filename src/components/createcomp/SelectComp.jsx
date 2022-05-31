import { useState } from "react";

const SelectComp = () => {
    
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

    
    return (
        <div>
            <select  className="cre_selectbox" onChange={changeMet}>
                <option value="0" selected>재질을 선택하세요</option>
                <option value="10000">스테인리스</option>
                <option value="5000">플라스틱</option>
            </select>

            <select className="cre_selectbox" onChange={changeSize}>
                <option value="0" selected>용량</option>
                <option value="5000">대</option>
                <option value="3000">중</option>
                <option value="2000">소</option>
            </select>

            <select className="cre_selectbox" onChange={changeStraw}>
                <option value="0" selected>빨대</option>
                <option value="2000">사용</option>
                <option value="0">미사용</option>
            </select>

            <p>{parseInt(metSelect)+parseInt(sizeSelect)+parseInt(strawSelect)}</p>
        </div>
    )

}

export default SelectComp;