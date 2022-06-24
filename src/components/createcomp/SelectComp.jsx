import { useEffect, useState, useCallback } from 'react'
import { ButtonComp } from '../index-comp/IndexComp'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../modules/addCart'

const SelectComp = ({
  getTypeData,
  getProductName,
  colorName,
}) => {
  // 뭔지 모름
  const items = useSelector((state) => state.cartReducer.items)
  //장바구니아이템 로컬스토리지에 저장 >> 한박자 느림..왜???
  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(items))
  }, [items])
  //

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 재질 선택
  const [tumMet, setTumMet] = useState({
    name: '상품명',
    price: 0,
    met: 'none',
  })
  const changeMet = (e) => {
    const met = e.target.value.split('_')[1]
    let metObj = {
      price: parseInt(e.target.value),
      met: met,
    }
    if (met === 'pla') {
      metObj.name = '플라스틱 텀블러'
    } else if (met === 'stain') {
      metObj.name = '스테인리스 텀블러'
    } else {
      metObj.name = '상품명'
    }
    setTumMet(metObj)
    getTypeData(met)
  }

  // 사이즈 선택
  const [tumSize, setTumSize] = useState({
    name: '',
    price: 0,
    size: '',
  })
  const changeSize = (e) => {
    const size = e.target.value.split('_')[1]
    let sizeObj = {
      price: parseInt(e.target.value),
      size: size !== 'none' ? size : '',
    }
    if (size === 'big') {
      sizeObj.name = '(950ml)'
    } else if (size === 'mid') {
      sizeObj.name = '(500ml)'
    } else if (size === 'small') {
      sizeObj.name = '(350ml)'
    } else {
      sizeObj.name = ''
    }
    setTumSize(sizeObj)
  }

  // 빨대 선택
  const [tumStraw, setTumStraw] = useState({
    use: 'none',
    price: 0,
  })
  const changeStraw = (e) => {
    setTumStraw({
      price: parseInt(e.target.value),
      use: e.target.value.split('_')[1]
    })
  }

  // state로 전달
  const onAddItem = useCallback((tumblur) => dispatch(addItem(tumblur)), [
    dispatch,
  ])
  const sendCupInfo = () => {
    if (tumMet === '상품명') {
      alert('컵 재질을 선택해주세요')
    } else if (tumSize === '') {
      alert('컵 사이즈를 선택해주세요')
    } else if (tumStraw === 'none') {
      alert('빨대사용 여부를 선택해 주세요')
    } else {
      onAddItem({
        image: null,
        name: tumMet.name + tumSize.name,
        color: colorName,
        material: tumMet.met,
        size: tumSize.size,
        strow: tumStraw.use,
        price: tumMet.price + tumSize.price + tumStraw.price,
        quantity: 1,
      })
      navigate('/cart')
    }
  }

  // 가격정보
  const summa = tumMet.price + tumSize.price + tumStraw.price
  // 이름정보
  useEffect(() => {
    getProductName(tumMet.name + tumSize.name)
  }, [tumMet, tumSize])

  return (
    <div>
      <select
        defaultValue="0_none"
        className="cre_selectbox"
        onChange={changeMet}
      >
        <option value="0_none">재질을 선택하세요</option>
        <option value="20000_stain">스테인리스</option>
        <option value="10000_pla">플라스틱</option>
      </select>

      <select
        defaultValue="0_none"
        className="cre_selectbox"
        onChange={changeSize}
      >
        <option value="0_none">용량</option>
        <option value="10000_big">950ml</option>
        <option value="6000_mid">500ml</option>
        <option value="4000_small">350ml</option>
      </select>

      <select
        defaultValue="0_none"
        className="cre_selectbox"
        onChange={changeStraw}
      >
        <option value="0_none">빨대</option>
        <option value="4000_use">사용</option>
        <option value="0_unuse">미사용</option>
      </select>

      <div className="cre_calc">
        <p>총 가격</p>
        <h3>{summa.toLocaleString()}원</h3>
      </div>

      <div id="btn">
        <ButtonComp>미리보기</ButtonComp>
        <div className="cre_savepay">
          <ButtonComp style={{ width: '100%' }}>저장</ButtonComp>
          <ButtonComp style={{ width: '100%' }}>장바구니</ButtonComp>
          <ButtonComp
            style={{ width: '100%' }}
            onClick={sendCupInfo}
          >
            결제
          </ButtonComp>
        </div>
      </div>
    </div>
  )
}

export default SelectComp
