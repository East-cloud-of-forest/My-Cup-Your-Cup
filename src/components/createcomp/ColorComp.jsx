import classNames from 'classnames'

const ColorComp = ({ getColorData, getColorName, colorData }) => {
  const colors = [
    { code: '#FFFFFF', name: '흰색' },
    { code: '#ff8e8e', name: '빨간색' },
    { code: '#33b4ff', name: '파란색' },
    { code: '#333333', name: '검정색' },
    { code: '#ffff80', name: '노란색' },
    { code: '#8aff8a', name: '초록색' },
    { code: '#aaaaaa', name: '회색' },
  ]

  const colorSelect = (e) => {
    getColorData(e.target.id)

    for (let i = 0; i < colors.length; i++) {
      if (e.target.id === colors[i].code) {
        getColorName(colors[i].name)
      }
    }
  }

  return (
    <div className="cre_colorDiv">
      {colors.map((color) => (
        <div
          className={classNames("cre_color",
          colorData === color.code ?
          'active' : null
          )}
          id={color.code}
          key={color.name}
          style={{ backgroundColor: color.code }}
          onClick={colorSelect}
        ></div>
      ))}
    </div>
  )
}

export default ColorComp
