const SelectComp = () => {
    
    return (
        <div>
            <select name="" id="" className="cre_selectbox">
                <option value="none" selected>재질을 선택하세요</option>
                <option value="">스테인리스</option>
                <option value="">플라스틱</option>
            </select>

            <select name="" id="" className="cre_selectbox">
                <option value="none" selected>용량</option>
                <option value="">대</option>
                <option value="">중</option>
                <option value="">소</option>
            </select>

            <select name="" id="" className="cre_selectbox">
                <option value="none" selected>빨대</option>
                <option value="">사용</option>
                <option value="">미사용</option>
            </select>
        </div>
    )

}

export default SelectComp;