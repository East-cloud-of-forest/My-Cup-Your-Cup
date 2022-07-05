import { useState } from 'react'

const CanvasSelectComp = ({ selectOnText, setTexts, texts }) => {
  console.log(selectOnText)

  const textChange = (e, type) => {
    const textsclone = [...texts]
    switch (type) {
      case 'input':
        textsclone[selectOnText] = {
          ...textsclone[selectOnText],
          text: e.target.value,
        }
        setTexts(textsclone)
        break
      case 'font':
        textsclone[selectOnText] = {
          ...textsclone[selectOnText],
          font: e.target.value,
        }
        setTexts(textsclone)
        setFontFamily(e.target.value)
        break
      case 'color':
        textsclone[selectOnText] = {
          ...textsclone[selectOnText],
          color: e.target.value,
        }
        setTexts(textsclone)
        setFontFamily(e.target.value)
        break
    }
  }

  const [fontFamily, setFontFamily] = useState('nanumBold')

  return (
    <div className="canvas_select">
      {selectOnText === null ? null : (
        <>
          <input
            type="text"
            value={texts[selectOnText].text}
            onChange={(e) => textChange(e, 'input')}
          />

          <select
            style={{ fontFamily: fontFamily }}
            onChange={(e) => textChange(e, 'font')}
          >
            <option value="nanumBold" style={{ fontFamily: 'nanumBold' }}>
              나눔
            </option>
            <option value="OKDDUNG" style={{ fontFamily: 'OKDDUNG' }}>
              읒뚱체
            </option>
            <option value="OKGUNG" style={{ fontFamily: 'OKGUNG' }}>
              읒궁체
            </option>
          </select>

          <select
            className="cre_font_selectbox"
            defaultValue="#000"
            onChange={(e) => textChange(e, 'color')}
          >
            <option value="#000000">검정</option>
            <option value="#ff0000">빨강</option>
            <option value="#0000ff">파랑</option>
            <option value="#00ff00">초록</option>
          </select>
        </>
      )}
    </div>
  )
}

export default CanvasSelectComp
