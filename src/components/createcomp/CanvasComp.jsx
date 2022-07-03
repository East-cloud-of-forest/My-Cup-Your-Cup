import { useState } from "react";
import { useEffect, useRef } from "react";

const CanvasComp = ({ pic, texts, colorData, setTexts }) => {
  const canvasRef = useRef(null);
  const src = require(`../../components/createcomp/img/${pic}.png`);
  const [selectOnText, setSelectOnText] = useState(null);

  class App {
    constructor() {
      console.log(texts);
      this.canvas = canvasRef.current;
      this.ctx = this.canvas.getContext("2d");
      this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

      this.mousePos = { x: 0, y: 0 };
      this.mouseDown = false;

      this.Text = [];
      this.circle = [];
      this.onMouseText = null;
      this.selectOnText = selectOnText;

      this.resizeHandler = this.resize.bind(this);
      window.addEventListener("resize", this.resizeHandler, false);
      this.resize();

      this.animateHandler = window.requestAnimationFrame(
        this.animate.bind(this)
      );

      this.onDownHandler = this.onDown.bind(this);
      this.canvas.addEventListener("pointerdown", this.onDownHandler, false);
      this.onMoveHandler = this.onMove.bind(this);
      this.canvas.addEventListener("pointermove", this.onMoveHandler, false);
      this.onUpHandler = this.onUp.bind(this);
      this.canvas.addEventListener("pointerup", this.onUpHandler, false);
      this.mouseOverHandler = this.mouseOver.bind(this);
      this.canvas.addEventListener("mousemove", this.mouseOverHandler, false);
    }

    resize() {
      this.stageWidth = canvasRef.current.clientWidth * this.pixelRatio;
      this.stageHeight = canvasRef.current.clientHeight * this.pixelRatio;

      this.canvas.width = this.stageWidth;
      this.canvas.height = this.stageHeight;

      for (let i = 0; i < 4; i++) {
        this.circle.push(new Circle());
      }
      texts.map((text, i) => {
        this.Text[i] = new Text(
          text.text,
          text.font,
          text.color,
          i,
          text.x,
          text.y,
          this.stageWidth,
          this.stageHeight,
          this.circle
        );
      });
    }

    animate() {
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      this.Text.map((text) => {
        text.draw(this.ctx, this.selectOnText);
      });

      this.animateHandler2 = window.requestAnimationFrame(
        this.animate.bind(this)
      );
    }

    onDown(e) {
      this.mousePos.x = parseInt(
        e.clientX - e.currentTarget.getBoundingClientRect().left
      );
      this.mousePos.y = parseInt(
        e.clientY - e.currentTarget.getBoundingClientRect().top
      );
      this.mouseDown = true;
      const selectdArray = this.Text.map((text) => {
        const selectid = text.onDown(this.mousePos);
        if (selectid !== undefined) {
          this.onMouseText = selectid;
          this.selectOnText = selectid;
          return selectid;
        }
      });
      // 선택해제
      if (selectdArray.filter((a) => a !== undefined).length === 0) {
        setSelectOnText(null);
      }
    }

    onMove(e) {
      this.mousePos.x = parseInt(
        e.clientX - e.currentTarget.getBoundingClientRect().left
      );
      this.mousePos.y = parseInt(
        e.clientY - e.currentTarget.getBoundingClientRect().top
      );
      this.Text.forEach((text) => {
        text.onMove(this.mousePos, this.onMouseText);
      });
    }

    onUp(e) {
      this.mouseDown = false;
      this.Text.forEach((text) => {
        text.onUp();
      });
    }

    // 마우스 커서 변경
    mouseOver(e) {
      this.mousePos.x = parseInt(
        e.clientX - e.currentTarget.getBoundingClientRect().left
      );
      this.mousePos.y = parseInt(
        e.clientY - e.currentTarget.getBoundingClientRect().top
      );
      const boxArray = this.Text.map((text) =>
        text.mouseOver(this.mousePos)
      );
      const circleArray = this.circle.map((c) => c.mouseOver(this.mousePos));
      if (circleArray.filter((a) => a === true).length !== 0) {
        switch (circleArray.indexOf(true)) {
          case 0:
          case 2:
            this.canvas.style.cursor = "nw-resize";
            break;
          default:
            this.canvas.style.cursor = "ne-resize";
            break;
        }
      } else if (boxArray.filter((a) => a === true).length !== 0) {
        this.canvas.style.cursor = "Move";
      } else {
        this.canvas.style.cursor = "Default";
      }
    }

    remove() {
      window.removeEventListener("resize", this.resizeHandler);
      cancelAnimationFrame(this.animateHandler);
      cancelAnimationFrame(this.animateHandler2);
      this.canvas.removeEventListener("pointerdown", this.onDownHandler);
      this.canvas.removeEventListener("pointermove", this.onMoveHandler);
      this.canvas.removeEventListener("pointerup", this.onUpHandler);
      this.canvas.removeEventListener("mousemove", this.mouseOverHandler);
    }
  }

  // text
  class Text {
    constructor(text, font, color, id, x, y, stageWidth, stageHeight, circle) {
      this.text = text;
      this.font = font;
      this.color = color;
      this.x = x === -1000 ? stageWidth / 2 : x;
      this.y = y === -1000 ? stageHeight / 2 : y;
      this.id = id;
      this.circle = circle;
    }

    mouseOver(pos) {
      this.select = // 왼 오 위 아래
        pos.x >= this.x - this.width / 2 &&
        pos.x <= this.x + this.width / 2 + 1 &&
        pos.y >= this.y - this.height + 10 &&
        pos.y <= this.y + 10;
      return this.select;
    }

    onDown(pos) {
      this.select = // 왼 오 위 아래
        pos.x >= this.x - this.width / 2 &&
        pos.x <= this.x + this.width / 2 + 1 &&
        pos.y >= this.y - this.height + 10 &&
        pos.y <= this.y + 10;
      if (this.select) {
        this.clickposX = pos.x;
        this.clickposY = pos.y;
        return this.id;
      }
    }

    onMove(pos, id) {
      if (this.select && this.id === id) {
        const dx = pos.x - this.clickposX;
        const dy = pos.y - this.clickposY;

        this.clickposX = pos.x;
        this.clickposY = pos.y;

        this.x += Number(dx.toFixed(0));
        this.y += Number(dy.toFixed(0));
      }
    }

    onUp() {
      if (this.select) {
        const textsclone = [...texts];
        textsclone[this.id] = {
          ...textsclone[this.id],
          x: this.x,
          y: this.y,
          id: this.id,
        };
        setTexts(textsclone);
        setSelectOnText(this.id);
      }
    }

    draw(ctx, id) {
      ctx.font = this.font;
      ctx.textAlign = "center";
      ctx.fillStyle = this.color;
      const text = ctx.measureText(this.text);
      this.width = Number(text.width.toFixed(0)) + 20;
      this.height =
        text.actualBoundingBoxAscent +
        (text.actualBoundingBoxDescent < 0
          ? 0
          : text.actualBoundingBoxDescent) +
        20;
      ctx.fillText(this.text, this.x, this.y);

      // 선택 박스
      if (id === this.id) {
        // 박스 선
        ctx.beginPath();
        ctx.strokeStyle = "#4debbb";
        ctx.lineWidth = 1;
        ctx.strokeRect(
          this.x - this.width / 2,
          this.y - this.height + 10,
          this.width,
          this.height
        );
        // 모서리 원
        this.circle[0].draw(
          ctx,
          this.x - this.width / 2,
          this.y - this.height + 10
        );
        this.circle[1].draw(
          ctx,
          this.x + this.width / 2,
          this.y - this.height + 10
        );
        this.circle[2].draw(ctx, this.x + this.width / 2, this.y + 10);
        this.circle[3].draw(ctx, this.x - this.width / 2, this.y + 10);
      }
    }
  }

  class Circle {
    constructor() {
      this.PI = Math.PI * 2;
      this.radius = 4;
    }

    mouseOver(pos) {
      const dx = pos.x - this.x;
      const dy = pos.y - this.y;
      this.mouseon = dx * dx + dy * dy <= this.radius * this.radius;
      return this.mouseon;
    }

    draw(ctx, x, y) {
      this.x = x;
      this.y = y;

      ctx.beginPath();
      ctx.fillStyle = "#3da982";
      ctx.arc(x, y, this.radius, 0, this.PI, false);
      ctx.closePath();
      ctx.fill();
    }
  }

  useEffect(() => {
    let appclass = new App();
    return () => {
      appclass.remove();
    };
  }, [pic, texts, colorData, canvasRef, selectOnText]);

  return (
    <canvas
      ref={canvasRef}
      className="cre_canvas"
      style={{
        background: `url(${src})`,
      }}
    />
  );
};

export default CanvasComp;
