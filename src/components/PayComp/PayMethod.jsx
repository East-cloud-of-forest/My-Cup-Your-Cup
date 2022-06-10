import {useState} from 'react'
import React from "react";

const PayMethod = () => {

    const [bankbookStyle,setBankbookStyle] = useState({
        display:"none"
    });
    const [cardStyle,setcardStyle] = useState({
        display:"none"
    });
    const [phoneStyle,setPhoneStyle] = useState({
        display:"none"
    });

    const bankbookRef = React.useRef();
    const cardRef = React.useRef();
    const phoneRef = React.useRef();

    const [category,setCategory] = useState("")

    const changeMethod =(e)=>{

        setCategory(e.target.value);

        if(e.target.value===bankbookRef.current.id){
            setBankbookStyle({display:""})
        }else{
            setBankbookStyle({display:"none"});
        };
        if(e.target.value===cardRef.current.id){
            setcardStyle({display:""})
        }else{
            setcardStyle({display:"none"});
        };
        if(e.target.value===phoneRef.current.id){
            setPhoneStyle({display:""})
        }else{
            setPhoneStyle({display:"none"});
        };
    }

    return (
        <div>
            <div className="pay_div">
                <h3 className="pay_title">결제방식 선택</h3>
                <hr className="pay_main_hr"/>
                <table className="pay_method_table">
                    <tbody>
                        <tr className="pay_method_table_tr">
                            <td className="pay_table_cate">결제수단선택</td>
                            <td>
                                <input type="radio" name="pay_method" onChange={changeMethod} value="무통장입금" id="bankbook"/>
                                <label htmlFor="bankbook" className="pay_method_select">무통장입금</label>
                                <input type="radio" name="pay_method" onChange={changeMethod} value="카드 결제" id="card"/>
                                <label htmlFor="card" className="pay_method_select">카드 결제</label>
                                <input type="radio" name="pay_method" onChange={changeMethod} value="휴대폰 결제" id="phone"/>
                                <label htmlFor="phone" className="pay_method_select">휴대폰 결제</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="pay_table_cate">{category}</td>
                            
                            <td className="pay_methods_td">

                                <div className='pay_bankbook' ref={bankbookRef} id="무통장입금" style={bankbookStyle}>
                                    <select defaultValue="select_bank" className="pay_bank_select">
                                        <option value="select_bank">은행 선택</option>
                                        <option value="NH">농협</option>
                                        <option value="SH">신한</option>
                                        <option value="WR">우리</option>
                                    </select>
                                    <input type="number" className='pay_bankbook_num' placeholder='계좌번호'/>
                                    <input type="text" className='pay_bankbook_p' placeholder='예금주' />
                                </div>

                                <div className='pay_card' ref={cardRef} id="카드 결제"  style={cardStyle}>
                                    <select defaultValue="select_card" className="pay_card_select">
                                        <option value="select_card">카드선택</option>
                                        <option value="NH">농협</option>
                                        <option value="SH">신한</option>
                                        <option value="WR">우리</option>
                                        <option value="SS">삼성</option>
                                    </select>
                                    <input type="number" className='pay_card_num' placeholder='카드번호'/>
                                    <input type="password" className='pay_card_password' placeholder='비밀번호' /><br />
                                    <input type="email" className='pay_card_email' placeholder='이메일을 입력해주세요'/>
                                </div>

                                <div className='pay_phone' ref={phoneRef} id="휴대폰 결제" style={phoneStyle}>
                                    <select defaultValue="select_phone" className="pay_phone_select">
                                        <option value="select_phone">통신사선택</option>
                                        <option value="SKT">SKT</option>
                                        <option value="KT">KT</option>
                                        <option value="LG">LG U+</option>
                                        <option value="AD">알뜰폰</option>
                                    </select>

                                    <input type="number" className='pay_phone_num' />
                                    <span className='pay_phone_hy'>-</span>
                                    <input type="number" className='pay_phone_num' />
                                    <span className='pay_phone_hy'>-</span>
                                    <input type="number" className='pay_phone_num' /><br />
                                    
                                    <span className='pay_sub_title'>가입자 주민번호</span>
                                    <input type="password" className='pay_phone_personal_num' maxLength="6" />
                                    <span className='pay_phone_hy'>-</span>
                                    <input type="password" className='pay_phone_personal_num' maxLength="7" /><br />

                                    <span className='pay_sub_title'>결제알림 이메일</span>
                                    <input type="email" className='pay_card_email' placeholder='이메일을 입력해주세요'/>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr className="pay_main_hr"/>
            </div>
        </div>
    );
};

export default PayMethod;