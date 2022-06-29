import { useState } from 'react'
import { useEffect, useRef } from 'react'

const CanvasComp = ({ pic }) => {
  const canvasRef = useRef(null)
  const requestAnimationRef = useRef(null)
  const image = new window.Image()
  const [texts, setTexts] = useState([
    {
      text: '임의의값',
      font: '26px nanumBold',
      color: '#ff0000',
      x: 424,
      y: 232,
      height: 26,
    },
  ])

  class App {
    constructor() {
      this.canvas = canvasRef.current
      this.ctx = this.canvas.getContext('2d')
      this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1

      this.mousePos = { x: 0, y: 0 }
      this.mouseDown = false

      this.Text = new Text()

      window.addEventListener('resize', this.resize.bind(this), false)
      this.resize()

      window.requestAnimationFrame(this.animate.bind(this))

      this.canvas.addEventListener('pointerdown', this.onDown.bind(this), false)
      this.canvas.addEventListener('pointermove', this.onMove.bind(this), false)
      this.canvas.addEventListener('pointerup', this.onUp.bind(this), false)
    }

    resize() {
      this.stageWidth = canvasRef.current.clientWidth
      this.stageHeight = canvasRef.current.clientHeight

      this.canvas.width = this.stageWidth * this.pixelRatio
      this.canvas.height = this.stageHeight * this.pixelRatio
    }

    animate() {
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

      this.background()

      this.Text.draw(this.ctx)

      window.requestAnimationFrame(this.animate.bind(this))
    }

    background() {
      this.ctx.drawImage(image, 0, 0)
      image.src = require(`../../components/createcomp/img/${pic}.png`)
    }

    onDown(e) {
      this.mousePos.x = parseInt(
        e.clientX - e.currentTarget.getBoundingClientRect().left,
      )
      this.mousePos.y = parseInt(
        e.clientY - e.currentTarget.getBoundingClientRect().top,
      )
      this.mouseDown = true
      this.Text.selectionOn(this.mousePos)
    }

    onMove(e) {
      this.mousePos.x = parseInt(
        e.clientX - e.currentTarget.getBoundingClientRect().left,
      )
      this.mousePos.y = parseInt(
        e.clientY - e.currentTarget.getBoundingClientRect().top,
      )
      if (this.mouseDown && this.Text.select) {
        this.Text.move(this.mousePos)
      }
    }

    onUp(e) {
      this.mouseDown = false
      this.Text.selectionOff()
    }
  }

  class Text {
    constructor() {
      this.text = texts[0].text
      this.font = texts[0].font
      this.color = texts[0].color
      this.x = texts[0].x
      this.y = texts[0].y
      this.height = texts[0].height
    }

    selectionOn(pos) {
      this.select =
        pos.x >= this.x - this.width / 2 &&
        pos.x <= this.x + this.width / 2 &&
        pos.y >= this.y - this.height &&
        pos.y <= this.y
      this.clickposX = pos.x
      this.clickposY = pos.y
    }

    selectionOff() {
      this.select = false
      setTexts([{
        ...texts[0],
        x: this.x,
        y: this.y
      }])
    }

    move(pos) {
      const dx = pos.x - this.clickposX
      const dy = pos.y - this.clickposY

      this.clickposX = pos.x
      this.clickposY = pos.y

      this.x += Number(dx.toFixed(0))
      this.y += Number(dy.toFixed(0))
    }

    draw(ctx) {
      ctx.font = this.font
      ctx.textAlign = 'center'
      ctx.fillStyle = this.color
      this.width = Number(ctx.measureText(this.text).width.toFixed(0))
      ctx.fillText(this.text, this.x, this.y)
    }
  }

  useEffect(() => {
    new App()
  }, [pic])

  return <canvas ref={canvasRef} className="cre_canvas" />
}

export default CanvasComp
