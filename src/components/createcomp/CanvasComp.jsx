import { useState } from 'react'
import { useEffect, useRef } from 'react'

const CanvasComp = ({
  pic,
  canvasObjects,
  colorData,
  setCanvasObjects,
  selectOnObject,
  setSelectOnObject,
}) => {
  const canvasRef = useRef(null)
  const src = require(`../../components/createcomp/img/${pic}.png`)
  const img = new Image()
  img.src = src

  class App {
    constructor() {
      console.log(canvasObjects)
      this.canvas = canvasRef.current
      this.ctx = this.canvas.getContext('2d')
      this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1

      this.mousePos = { x: 0, y: 0 }
      this.mouseDown = false

      this.Obj = []
      this.circle = []
      this.Image = []
      this.onDownText = null
      this.selectOnObject = selectOnObject

      this.resizeHandler = this.resize.bind(this)
      window.addEventListener('resize', this.resizeHandler, false)
      this.resize()

      this.animateHandler = window.requestAnimationFrame(
        this.animate.bind(this),
      )

      this.onDownHandler = this.onDown.bind(this)
      this.canvas.addEventListener('pointerdown', this.onDownHandler, false)
      this.onMoveHandler = this.onMove.bind(this)
      this.canvas.addEventListener('pointermove', this.onMoveHandler, false)
      this.onUpHandler = this.onUp.bind(this)
      this.canvas.addEventListener('pointerup', this.onUpHandler, false)
      this.mouseOverHandler = this.mouseOver.bind(this)
      this.canvas.addEventListener('mousemove', this.mouseOverHandler, false)
    }

    resize() {
      this.stageWidth = canvasRef.current.clientWidth * this.pixelRatio
      this.stageHeight = canvasRef.current.clientHeight * this.pixelRatio

      this.canvas.width = this.stageWidth
      this.canvas.height = this.stageHeight

      for (let i = 0; i < 4; i++) {
        this.circle.push(new Circle())
      }
      canvasObjects.map((obj, i) => {
        this.Obj[i] = new Obj(
          obj.text,
          obj.font,
          obj.size,
          obj.color,
          i,
          obj.x,
          obj.y,
          this.stageWidth,
          this.stageHeight,
          this.circle,
          obj.type,
          obj.img,
          obj.width,
          obj.height,
          obj.show,
        )
      })
    }

    animate() {
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

      this.ctx.drawImage(img, (this.stageWidth - img.width) / 2, (this.stageHeight - img.height) / 2)

      this.Obj.map((obj) => {
        this.ctx.save()
        obj.show && obj.draw(this.ctx, this.selectOnObject)
      })

      this.animateHandler2 = window.requestAnimationFrame(
        this.animate.bind(this),
      )
    }

    // 마우스 커서 변경 및 작동 모드 변경
    mouseOver(e) {
      this.mousePos.x = parseInt(
        e.clientX - e.currentTarget.getBoundingClientRect().left,
      )
      this.mousePos.y = parseInt(
        e.clientY - e.currentTarget.getBoundingClientRect().top,
      )
      const boxArray = this.Obj.map((obj) => obj.mouseOver(this.mousePos))
      const circleArray = this.circle.map((c) => c.mouseOver(this.mousePos))
      if (!this.mouseDown) {
        if (circleArray.filter((a) => a === true).length !== 0) {
          this.circleHoverIndex = circleArray.indexOf(true)
          switch (this.circleHoverIndex) {
            case 0:
            case 2:
              this.canvas.style.cursor = 'nw-resize'
              break
            default:
              this.canvas.style.cursor = 'ne-resize'
              break
          }
          this.mouseVersion = 'resize'
        } else if (boxArray.filter((a) => a === true).length !== 0) {
          this.canvas.style.cursor = 'Move'
          this.mouseVersion = 'move'
        } else {
          this.canvas.style.cursor = 'Default'
          this.mouseVersion = 'none'
        }
      }
    }

    onDown(e) {
      this.mousePos.x = parseInt(
        e.clientX - e.currentTarget.getBoundingClientRect().left,
      )
      this.mousePos.y = parseInt(
        e.clientY - e.currentTarget.getBoundingClientRect().top,
      )
      this.mouseDown = true
      switch (this.mouseVersion) {
        case 'move':
          this.Obj.map((obj) => {
            const selectid = obj.onDown(this.mousePos, this.mouseVersion)
            if (selectid !== undefined) {
              this.onDownText = selectid
              this.selectOnObject = selectid
            }
          })
          break
        case 'resize':
          let circleId
          this.circle.map((c) => (circleId = c.onDown()))
          this.onDownText = circleId
          this.Obj.map((obj) => {
            obj.onDown(
              this.mousePos,
              this.mouseVersion,
              circleId,
              this.circleHoverIndex,
            )
          })
          break
        case 'none':
          setSelectOnObject(null)
          break
      }
    }

    onMove(e) {
      this.mousePos.x = parseInt(
        e.clientX - e.currentTarget.getBoundingClientRect().left,
      )
      this.mousePos.y = parseInt(
        e.clientY - e.currentTarget.getBoundingClientRect().top,
      )
      if (this.mouseDown) {
        switch (this.mouseVersion) {
          case 'move':
            this.Obj.forEach((obj) => {
              obj.onMove(this.mousePos, this.onDownText, this.mouseVersion)
            })
            break
          case 'resize':
            this.Obj.forEach((obj) => {
              obj.onMove(this.mousePos, this.onDownText, this.mouseVersion)
            })
            break
        }
      }
    }

    onUp(e) {
      this.mouseDown = false
      this.Obj.forEach((text) => {
        text.onUp(this.onDownText)
      })
    }

    remove() {
      window.removeEventListener('resize', this.resizeHandler)
      cancelAnimationFrame(this.animateHandler)
      cancelAnimationFrame(this.animateHandler2)
      this.canvas.removeEventListener('pointerdown', this.onDownHandler)
      this.canvas.removeEventListener('pointermove', this.onMoveHandler)
      this.canvas.removeEventListener('pointerup', this.onUpHandler)
      this.canvas.removeEventListener('mousemove', this.mouseOverHandler)
    }
  }

  // text
  class Obj {
    constructor(
      text,
      font,
      size,
      color,
      id,
      x,
      y,
      stageWidth,
      stageHeight,
      circle,
      type,
      img,
      width,
      height,
      show,
    ) {
      this.text = text
      this.font = font
      this.size = size
      this.color = color
      this.x = x === -1000 ? stageWidth / 2 : x
      this.y = y === -1000 ? stageHeight / 2 : y
      this.id = id
      this.circle = circle
      this.type = type
      this.img = img
      this.show = show
      this.descent = 0
      // 이미지 일경우
      if (!type) {
        // 이미지가 화면보다 큰 경우
        if (width < height) {
          if (height > stageHeight) {
            this.height = stageHeight * 0.8
            this.width = width * (this.height / height)
          } else {
            this.width = width
            this.height = height
          }
        } else if (height < width) {
          if (width > stageWidth) {
            this.width = stageWidth * 0.8
            this.height = height * (this.width / width)
          } else {
            this.width = width
            this.height = height
          }
        }
        // 높이 가운데 정렬
        this.y = y === -1000 ? stageHeight / 2 + this.height / 2 : y
      }
    }

    mouseOver(pos) {
      this.select = // 왼 오 위 아래
        pos.x >= this.x - this.width / 2 &&
        pos.x <= this.x + this.width / 2 + 1 &&
        pos.y >= this.y - this.height + this.descent - 2 + 10 &&
        pos.y <= this.y + this.descent - 1 + 10
      return this.select
    }

    onDown(pos, version, cirlceId, circleIndex) {
      switch (version) {
        case 'move':
          this.select = // 왼 오 위 아래
            pos.x >= this.x - this.width / 2 &&
            pos.x <= this.x + this.width / 2 + 1 &&
            pos.y >= this.y - this.height + this.descent - 2 + 10 &&
            pos.y <= this.y + this.descent - 1 + 10
          if (this.select) {
            this.clickposX = pos.x
            this.clickposY = pos.y
            return this.id
          } else {
            break
          }
        case 'resize':
          if (cirlceId === this.id) {
            this.circleIndex = circleIndex
            this.cirlceId = cirlceId
            this.clickposX = pos.x
            this.clickposY = pos.y
          }
          break
      }
    }

    onMove(pos, id, version) {
      switch (version) {
        case 'move':
          if (this.select && this.id === id) {
            const dx = pos.x - this.clickposX
            const dy = pos.y - this.clickposY

            this.clickposX = pos.x
            this.clickposY = pos.y

            this.x += Number(dx.toFixed(0))
            this.y += Number(dy.toFixed(0))
          }
          break
        case 'resize':
          if (this.id === id) {
            const dx =
              Math.abs(this.x - pos.x) - Math.abs(this.x - this.clickposX)
            this.clickposX = pos.x
            this.clickposY = pos.y
            if (this.type) {
              // 최소값
              if (this.size >= 12) {
                this.size = Number(this.size) + Number(dx)
              } else {
                this.size = 12
              }
            } else {
              const dwidth = Number(this.width) + Number(dx)
              this.height = Number(this.height) * (dwidth / this.width)
              this.width = Number(this.width) + Number(dx)
            }
          }
          break
      }
    }

    onUp(id) {
      if (this.id === id) {
        const Objsclone = [...canvasObjects]
        Objsclone[this.id] = {
          ...Objsclone[this.id],
          x: this.x,
          y: this.y,
          id: this.id,
          size: this.size,
        }
        if (this.type) {
          Objsclone[this.id] = {
            ...Objsclone[this.id],
            size: this.size,
          }
        } else {
          Objsclone[this.id] = {
            ...Objsclone[this.id],
            width: this.width,
            height: this.height,
          }
        }
        setCanvasObjects(Objsclone)
        setSelectOnObject(this.id)
      }
    }

    draw(ctx, id) {
      ctx.globalCompositeOperation = 'source-in'
      if (this.type === 'text') {
        ctx.font = this.size + 'px ' + this.font
        ctx.textAlign = 'center'
        ctx.fillStyle = this.color
        const text = ctx.measureText(this.text)
        this.width = Number(text.width.toFixed(0)) + 20
        this.descent =
          text.actualBoundingBoxDescent < 0 ? 0 : text.actualBoundingBoxDescent
        this.height = text.actualBoundingBoxAscent + this.descent + 20
        ctx.fillText(this.text, this.x, this.y)
      } else {
        ctx.drawImage(
          this.img,
          this.x - this.width / 2,
          this.y - this.height + 10,
          this.width,
          this.height,
        )
      }
      ctx.globalCompositeOperation = 'source-over'

      // 선택 박스
      if (id === this.id) {
        // 박스 선
        ctx.beginPath()
        ctx.strokeStyle = '#4debbb'
        ctx.lineWidth = 1
        ctx.strokeRect(
          this.x - this.width / 2,
          this.y - this.height + this.descent + 10,
          this.width,
          this.height,
        )
        // 모서리 원
        this.circle[0].draw(
          ctx,
          this.x - this.width / 2,
          this.y - this.height + this.descent + 10,
          id,
        )
        this.circle[1].draw(
          ctx,
          this.x + this.width / 2,
          this.y - this.height + this.descent + 10,
          id,
        )
        this.circle[2].draw(
          ctx,
          this.x + this.width / 2,
          this.y + this.descent + 10,
          id,
        )
        this.circle[3].draw(
          ctx,
          this.x - this.width / 2,
          this.y + this.descent + 10,
          id,
        )
      }
    }
  }

  class Circle {
    constructor() {
      this.PI = Math.PI * 2
      this.radius = 4
    }

    mouseOver(pos) {
      const dx = pos.x - this.x
      const dy = pos.y - this.y
      this.mouseon = dx * dx + dy * dy <= this.radius * this.radius
      return this.mouseon
    }

    onDown() {
      return this.id
    }

    draw(ctx, x, y, id) {
      this.x = x
      this.y = y
      this.id = id

      ctx.beginPath()
      ctx.fillStyle = '#3da982'
      ctx.arc(x, y, this.radius, 0, this.PI, false)
      ctx.closePath()
      ctx.fill()
    }
  }

  useEffect(() => {
    let appclass = new App()
    return () => {
      appclass.remove()
    }
  }, [pic, canvasObjects, colorData, canvasRef, selectOnObject])

  return (
    <canvas
      ref={canvasRef}
      className="cre_canvas"
      style={{
        background: `url(${src}) no-repeat center`,
      }}
    />
  )
}

export default CanvasComp
