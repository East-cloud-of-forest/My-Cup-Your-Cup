const PayAddress = () => {
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
                                <input type="number" placeholder="우편번호" className="pay_address_addressnum" /> <button>검색</button><br />
                                <input type="text" className="pay_address_address" /><input type="text" className="pay_address_address" />
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