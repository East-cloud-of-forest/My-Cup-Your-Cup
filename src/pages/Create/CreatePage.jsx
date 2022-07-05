import './Create.scss'
import ColorComp from '../../components/createcomp/ColorComp'
import SelectComp from '../../components/createcomp/SelectComp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRotateBack,
  faArrowRotateForward,
  faArrowsAltV,
  faArrowsAltH,
  faTrash,
  faPaintBrush,
  faWhiskeyGlass,
  faFileArrowUp,
  faFont,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { ButtonComp } from '../../components/index-comp/IndexComp'
import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import CanvasComp from '../../components/createcomp/CanvasComp'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const CreatePage = () => {
  //재질 props 받아오는 함수
  const [material, setMaterial] = useState('')

  const getTypeData = (material) => {
    setMaterial(material)
  }

  //컬러 props
  const [colorData, setColorData] = useState('#FFFFFF')
  const getColorData = (colorData) => {
    setColorData(colorData)
  }

  //상품명과 색상명 props 받아오는 함수
  const [productName, setProductName] = useState('상품명')
  const getProductName = (productName) => {
    setProductName(productName)
  }

  const [colorName, setColorName] = useState('흰색')
  const getColorName = (colorName) => {
    setColorName(colorName)
  }

  //아코디언 버튼
  const [active, setActive] = useState(false)
  const [display, setDisplay] = useState(true)
  const timeToggle = function (kind, time) {
    setTimeout(() => {
      kind === 'active' ? setActive(!active) : setDisplay(!display)
    }, time)
  }

  const openClick = () => {
    console.log(1)
    clearTimeout(timeToggle)
    if (display) {
      setDisplay(!display)
      timeToggle('active', 0)
    } else {
      setActive(!active)
      timeToggle('display', 500)
    }
  }

  //텀블러 변경 및 텀블러 이름값 가져오기
  const [tumShape, setTumShape] = useState('')
  const changeTum = (e) => {
    setPic(e.currentTarget.id)
    switch (e.currentTarget.id.split('_')[1]) {
      case '1':
        setTumShape('기본형')
        break
      case '2':
        setTumShape('원통형')
        break
      case '3':
        setTumShape('컵형')
        break
      default:
        setTumShape('')
        break
    }
  }

  const [sideEditOpen, setSideEditOpen] = useState(false)
  const sideEditToggle = () => {
    setSideEditOpen(!sideEditOpen)
  }

  //텍스트 편집 토글
  const [editActive, setEditActive] = useState(false)
  const [editDisplay, setEditDisplay] = useState(true)
  const editTimeToggle = function (kind, time) {
    setTimeout(() => {
      kind === 'editActive'
        ? setEditActive(!editActive)
        : setEditDisplay(!editDisplay)
    }, time)
  }

  const editClick = () => {
    clearTimeout(editTimeToggle)
    if (display) {
      setEditDisplay(!editDisplay)
      editTimeToggle('editActive', 0)
    } else {
      setEditActive(!editActive)
      editTimeToggle('editDisplay', 0)
    }
  }

  //재질변경에 따른 내용 변경
  //아코디언 내용 변경
  const [tumType, setTumType] = useState([])
  const [pic, setPic] = useState('1')
  useEffect(() => {
    if (material === 'pla') {
      setTumType([
        { name: '기본형', id: 'pla_1' },
        { name: '원통형', id: 'pla_2' },
      ])
      setPic('pla_1')
      setTumShape('기본형')
    } else if (material === 'stain') {
      setTumType([
        { name: '기본형', id: 'stain_1' },
        { name: '원통형', id: 'stain_2' },
        { name: '컵형', id: 'stain_3' },
      ])
      setPic('stain_1')
      setTumShape('기본형')
    } else {
      setTumType([])
      setPic('1')
      setTumShape('')
    }
  }, [material])

  const [fontColorEdit, setFontColorEdit] = useState('#000')
  const fontColorChange = (e) => {
    console.log(e.target.value)
    setFontColorEdit(e.target.value)
  }

  // 텍스트 추가 임시
  const [texts, setTexts] = useState([])

  const [textinput, setTextInput] = useState('')
  const textChange = (e) => {
    setTextInput(e.target.value)
  }

  const textClick = () => {
    if (textinput.length !== 0) {
      const textsClone = [...texts]
      textsClone.push({
        text: textinput,
        font: `nanumBold`,
        size: 18,
        color: fontColorEdit,
        id: texts.length,
        x: -1000,
        y: -1000,
      })
      setTexts(textsClone)
    }
    setTextInput('')
  }

  const [selectOnText, setSelectOnText] = useState(null)
  console.log(selectOnText)

  return (
    <div className="cre_all">
      {/**제작화면 */}
      <div className="cre_result">
        {/**에딧 아이콘 */}
        <div
          className={classNames(
            'cre_edit',
            selectOnText!==null ? 'cre_edit_active' : null,
          )}
        >
          <div className="cre_editdiv">
            <FontAwesomeIcon icon={faPaintBrush} />
            새로만들기
          </div>
          <div className="cre_editdiv">
            <FontAwesomeIcon icon={faArrowsAltH} />
            좌우반전
          </div>
          <div className="cre_editdiv">
            <FontAwesomeIcon icon={faArrowsAltV} />
            상하반전
          </div>
          <div className="cre_editdiv">
            <FontAwesomeIcon icon={faArrowRotateBack} />왼 회전
          </div>
          <div className="cre_editdiv">
            <FontAwesomeIcon icon={faArrowRotateForward} />
            오른 회전
          </div>
          <div className="cre_editdiv">
            <FontAwesomeIcon icon={faTrash} />
            삭제
          </div>
        </div>

        {/**메인이미지 */}
        <div className="cre_mainImg">
          <CanvasComp
            colorData={colorData}
            pic={pic}
            texts={texts}
            setTexts={setTexts}
            selectOnText={selectOnText}
            setSelectOnText={setSelectOnText}
          />
        </div>

        {/* 사이드 에딧 */}
        <div
          className={classNames(
            'side_edit',
            sideEditOpen ? 'side_edit_active' : null,
          )}
        >
          <div className="side_edit_toggle">
            <ButtonComp
              color="white"
              onClick={() => {
                sideEditToggle()
                active && openClick()
              }}
            >
              {sideEditOpen ? (
                <FontAwesomeIcon icon={solid('caret-right')} />
              ) : (
                <FontAwesomeIcon icon={solid('caret-left')} />
              )}
            </ButtonComp>
          </div>
          <ul>
            <li>
              <div className="cre_acc_click">
                <FontAwesomeIcon
                  icon={faWhiskeyGlass}
                  className="cre_icon2"
                  onClick={openClick}
                />
                텀블러변경
              </div>
              <ul
                className={classNames(
                  'tumtype_select',
                  active ? 'active' : null,
                  display ? 'displaynone' : null,
                )}
              >
                {tumType.map((a, i) => (
                  <li key={i}>
                    <div id={a.id} onClick={changeTum}>
                      {i === 0 ? <FontAwesomeIcon icon={solid('1')} /> : null}
                      {i === 1 ? <FontAwesomeIcon icon={solid('2')} /> : null}
                      {i === 2 ? <FontAwesomeIcon icon={solid('3')} /> : null}
                      {a.name}
                    </div>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div className="cre_editdiv2">
                <FontAwesomeIcon icon={faFileArrowUp} className="cre_icon2" />
                이미지 업로드
              </div>
            </li>
            <li>
              <div className="cre_editdiv2">
                <FontAwesomeIcon
                  icon={faFont}
                  className="cre_icon2"
                  // onClick={textClick}
                  onClick={editClick}
                />
                텍스트 추가
              </div>
            </li>
            <li>
              <div className="cre_editdiv2">
                <FontAwesomeIcon icon={faStar} className="cre_icon2" />
                무료 디자인
              </div>
            </li>
          </ul>
          {/* 텍스트 추가 */}
          <div
            className={classNames(
              'cre_edit_clicked ',
              editActive ? 'editActive' : null,
              editDisplay ? 'EditDisplaynone' : null,
            )}
          >
            <div>
              <div>
                <p>추가할 텍스트</p>
                <input
                  className="cre_font_input"
                  type="text"
                  value={textinput}
                  onChange={textChange}
                />
              </div>
              <div className="cre_font_editor">
                <p>폰트 색상</p>
                <select
                  className="cre_font_selectbox"
                  defaultValue="#000"
                  onChange={fontColorChange}
                >
                  <option value="#000000">검정</option>
                  <option value="#ff0000">빨강</option>
                  <option value="#0000ff">파랑</option>
                  <option value="#00ff00">초록</option>
                </select>
              </div>
            </div>
            <div className="cre_font_edit_btn">
              <ButtonComp onClick={textClick}>추가</ButtonComp>
              <ButtonComp onClick={editClick}>취소</ButtonComp>
            </div>
          </div>
        </div>
      </div>

      <div className="cre_opt">
        <h2 dangerouslySetInnerHTML={{ __html: productName }}></h2>
        <p>{colorName}</p>

        <ColorComp
          getColorName={getColorName}
          getColorData={getColorData}
          colorData={colorData}
        />

        <SelectComp
          colorName={colorName}
          tumShape={tumShape}
          getProductName={getProductName}
          material={material}
          getTypeData={getTypeData}
        />
      </div>
    </div>
  )
}

export default CreatePage
