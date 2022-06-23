import { useEffect, useState, useCallback } from "react";
import { ButtonComp } from '../../components/index-comp/IndexComp'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../modules/addCart";

const SelectComp = ({material, getTypeData, getProductName, getCupInfo, colorName}) => {
    const items = useSelector( (state)=> state.cartReducer.items );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onAddItem = useCallback( (item)=>dispatch(addItem(item)), [dispatch]);

    //총 가격을 계산하기위한 useState
    const [metSelect,setMetSelect] = useState(0);
    //보여지는 이미지를 변경하기 위한 useState
    const [tumMetType,setTumMetType] = useState("");
    //제목을 변경하기위한 useState
    const [tumMetName,setTumMetName] = useState("상품명")
    // 컵 정보를 담은 state
    const [ cupInfo, setCupInfo ] = useState({
        id: 1,
        name: "", // CreatePage 에서 받아온 prop
        image:"https://images.unsplash.com/photo-1544003484-3cd181d17917?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
        color: colorName,
        material: "",
        size: "",
        strow: "",
        price: 0,
        selected: true,
        total: 0,
        quantity: 1,

    })

    const sendCupInfo = () => {
        setCupInfo({
            ...cupInfo,
            name: tumMetName+tumSizeName,
            color: colorName,
            material: tumMetType,
            size:tumSizeName,
            strow:tumStrawType,
            price: summa,
            total: summa
        })
    }

    // 결제버튼 클릭시 실행될 함수
    const toPayOrCart = (e) => {
        e.preventDefault();
        onAddItem(cupInfo);
        // const formData = new FormData(e.target)
        // for (let [ key, value] of formData.entries()) {
        //     console.log(key, value)
        // } 
        // console.log(e.target.elements);
        // console.log(formData);
        navigate('/cart')

    }

    //장바구니아이템 로컬스토리지에 저장 >> 한박자 느림..왜???
    useEffect(()=> {
        window.localStorage.setItem('cart', JSON.stringify(items))
    }, [items]);

    const changeMet = (e)=>{
        setMetSelect(e.target.value);

        const metWord = e.target.value.split("_");
        setTumMetType(metWord[1]);
        // 임의로 추가한 코드
        setCupInfo(()=>({
            ...cupInfo,
            name: tumMetName+tumSizeName,
            material: metWord[1],
            price: summa,
            total: summa
        }))
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
        // 임의로 추가한 코드
        setCupInfo({
            ...cupInfo,
            name: tumMetName+tumSizeName,
            size: sizeWord[1],
            price: summa,
            total: summa
        })

    }

    const [strawSelect,setStrawSelect] = useState(0);
    const [tumStrawType,setTumStrawType] = useState("");

    const changeStraw = (e)=>{
        setStrawSelect(e.target.value);
        const strawWord = e.target.value.split("_");
        setTumStrawType(strawWord[1])
        // 임의로 추가한 코드
        setCupInfo({
            ...cupInfo,
            name: tumMetName+tumSizeName,
            strow: strawWord[1],
            price: summa,
            total: summa
        })

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
            <form onSubmit={toPayOrCart} name="cupForm">
                <select defaultValue="0_none" className="cre_selectbox" onChange={changeMet} required>
                    <option value="0_none">재질을 선택하세요</option>
                    <option value="20000_stain">스테인리스</option>
                    <option value="10000_pla">플라스틱</option>
                </select>

                <select defaultValue="0_none" className="cre_selectbox" onChange={changeSize} required>
                    <option value="0_none">용량</option>
                    <option value="10000_big">950ml</option>
                    <option value="6000_mid">500ml</option>
                    <option value="4000_small">350ml</option>
                </select>

                <select defaultValue="0_none" className="cre_selectbox" onChange={changeStraw} required>
                    <option value="0_none">빨대</option>
                    <option value="4000_use">사용</option>
                    <option value="0_unuse">미사용</option>
                </select>

                <div className="cre_calc">
                    <p>총 가격</p>
                    <h3>{summa.toLocaleString()}원</h3>
                </div>

                <div id="btn">
                    {/* submit 이벤트로 묶여서 모든 버튼이 클릭시 같은 페이지로넘어감 */}
                        <ButtonComp>미리보기</ButtonComp>
                        <ButtonComp>저장</ButtonComp>
                    <div className="cre_savepay">

                        <ButtonComp style={{width:'100%'}}
                            type="submit" onClick={sendCupInfo} name="cart"
                        >장바구니</ButtonComp>
                        <ButtonComp style={{width:'100%'}}
                            type="submit" onClick={sendCupInfo} name="pay"
                            // 왜인지는 모르겠으나 버튼에도 온클릭이벤트에 setCupInfo 함수를 넣어주니
                            // 결제버튼 하나만 눌러도 컵 정보가 전달되었다..
                        >결제</ButtonComp>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default SelectComp;