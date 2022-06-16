import { useEffect, useState } from "react";
import React from "react";

const SelectComp = ({material, getTypeData, getProductName}) => {

    //총 가격을 계산하기위한 useState
    const [metSelect,setMetSelect] = useState(0);
    //보여지는 이미지를 변경하기 위한 useState
    const [tumMetType,setTumMetType] = useState("");
    //제목을 변경하기위한 useState
    const [tumMetName,setTumMetName] = useState("상품명");

    const changeMet = (e)=>{
        setMetSelect(e.target.value);

        const metWord = e.target.value.split("_");
        
        setTumMetType(metWord[1]);
    }

    //총가격용
    const [sizeSelect,setSizeSelect] = useState(0);
    //제목변경용
    const [tumSizeType,setTumSizeType] = useState("");
    const [tumSizeName,setTumSizeName] = useState("");

    const changeSize = (e)=>{
        setSizeSelect(e.target.value);
        const sizeWord = e.target.value.split("_");
        setTumSizeType(sizeWord[1]);
    }
    
    const [strawSelect,setStrawSelect] = useState(0);
    const [tumStrawType,setTumStrawType] = useState("");

    const changeStraw = (e)=>{
        setStrawSelect(e.target.value);
        const strawWord = e.target.value.split("_");
        setTumStrawType(strawWord[1]);
    }

    const summa =  parseInt(metSelect)+parseInt(sizeSelect)+parseInt(strawSelect)

    
    useEffect(()=>{
        material=tumMetType;
        getTypeData(material);
    });
    
    
    useEffect(()=>{
        //상품명 prop 해주기
        if(tumMetType==="pla"){
            setTumMetName("플라스틱 텀블러");
        }else if(tumMetType==="stain"){
            setTumMetName("스테인리스 텀블러");
        }else{
            setTumMetName("상품명");
        };

        if(tumSizeType==="big"){
            setTumSizeName("(950ml)");
        }else if(tumSizeType==="mid"){
            setTumSizeName("(500ml)");
        }else if(tumSizeType==="small"){
            setTumSizeName("(350ml)");
        }else{
            setTumSizeName("");
        }

        getProductName(tumMetName+tumSizeName);
    })

    return (
        <div>
            <select defaultValue="0_none" className="cre_selectbox" onChange={changeMet}>
                <option value="0_none">재질을 선택하세요</option>
                <option value="20000_stain">스테인리스</option>
                <option value="10000_pla">플라스틱</option>
            </select>

            <select defaultValue="0_none" className="cre_selectbox" onChange={changeSize}>
                <option value="0_none">용량</option>
                <option value="10000_big">950ml</option>
                <option value="6000_mid">500ml</option>
                <option value="4000_small">350ml</option>
            </select>

            <select defaultValue="0_none" className="cre_selectbox" onChange={changeStraw}>
                <option value="0_none">빨대</option>
                <option value="4000_use">사용</option>
                <option value="0_unuse">미사용</option>
            </select>

            <div className="cre_calc">
                <p>총 가격</p>
                <h3>{summa.toLocaleString()}원</h3>
            </div>
        </div>
    )

}

export default SelectComp;