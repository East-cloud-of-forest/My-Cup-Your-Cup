import PayPopupPostCode from './PayPopupPostCode';
import { ModalComp } from '../index-comp/IndexComp';
import { useState } from 'react';

const PayAddress = () => {
    
    //우편번호 가져오는 함수
    const [addressNum,setAddressNum] = useState("")
    
    const getNumData = (addressNum) => {
        setAddressNum(addressNum);
    }

    //주소 가져오는 함수
    const [addresslen,setAddresslen] = useState("")
    
    const getAddData = (addresslen) => {
        setAddresslen(addresslen);
    }

    return (
        <div>
            <div className="pay_div">
                <h3 className="pay_title">배송지정보</h3>
                <hr className="pay_main_hr"/>
                <table className="pay_address_table">
                    <tbody>

                        <tr className="pay_address_table_tr">
                            <td className="pay_table_cate">수령인</td>
                            <td><input type="text" className="pay_address_input_name" /></td>
                        </tr>

                        <tr className="pay_address_table_tr">
                            <td className="pay_table_cate">연락처</td>
                            <td>
                                <input type="number" className="pay_address_input_phone" />
                                <span className="pay_phone_hy">-</span>
                                <input type="number" className="pay_address_input_phone" />
                                <span className="pay_phone_hy">-</span>
                                <input type="number" className="pay_address_input_phone" />
                            </td>
                        </tr>

                        <tr className="pay_address_table_tr">
                            <td className="pay_table_cate">배송 주소</td>
                            <td>
                                <input type="text" placeholder="우편번호" className="pay_address_addressnum" defaultValue={addressNum} />
                                <ModalComp button={
                                    <button
                                        style={{
                                            height:"40px", 
                                            width:"80px",
                                            color: "black",
                                            border: "#c9c9c9 solid 3px"
                                        }}
                                    >검색</button>
                                }height='80vh'>
                                    <PayPopupPostCode getNumData={getNumData} getAddData={getAddData} />
                                </ModalComp><br />
                                <input type="text" className="pay_address_address" placeholder="주소" defaultValue={addresslen} /><br />
                                <input type="text" className="pay_address_address" placeholder="나머지 주소" />
                            </td>
                        </tr>

                        <tr className="pay_address_table_tr2">
                            <td className="pay_table_cate">배송 메모</td>
                            <td><input type="text" className="pay_address_memo" placeholder="배송시 요청사항을 적어주세요"/></td>
                        </tr>

                    </tbody>
                </table>
                <hr className="pay_main_hr"/>
            </div>
        </div>
    );
};

export default PayAddress;