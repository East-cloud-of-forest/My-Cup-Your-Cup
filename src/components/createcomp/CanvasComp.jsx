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
    }

    resize() {
      this.stageWidth = canvasRef.current.clientWidth * this.pixelRatio;
      this.stageHeight = canvasRef.current.clientHeight * this.pixelRatio;

      this.canvas.width = this.stageWidth;
      this.canvas.height = this.stageHeight;

      texts.map((text, i) => {
        this.Text[i] = new Text(
          text.text,
          text.font,
          text.color,
          text.height,
          i,
          text.x,
          text.y,
          this.stageWidth,
          this.stageHeight
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
        const selectid = text.mouseDown(this.mousePos);
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
        text.move(this.mousePos, this.onMouseText);
      });
    }

    onUp(e) {
      this.mouseDown = false;
      this.Text.forEach((text) => {
        text.mouseUp();
      });
    }

    remove() {
      window.removeEventListener("resize", this.resizeHandler);
      cancelAnimationFrame(this.animateHandler);
      cancelAnimationFrame(this.animateHandler2);
      this.canvas.removeEventListener("pointerdown", this.onDownHandler);
      this.canvas.removeEventListener("pointermove", this.onMoveHandler);
      this.canvas.removeEventListener("pointerup", this.onUpHandler);
    }
  }

  class Text {
    constructor(text, font, color, height, id, x, y, stageWidth, stageHeight) {
      this.text = text;
      this.font = font;
      this.color = color;
      this.x = x === -1000 ? stageWidth / 2 : x;
      this.y = y === -1000 ? stageHeight / 2 : y;
      this.id = id;
    }

    mouseDown(pos) {
      this.select = // 왼 오 위 아래
        pos.x >= this.x - this.width / 2 &&
        pos.x <= this.x + this.width / 2 + 2 &&
        pos.y >= this.y + this.height * 0.1 - this.height &&
        pos.y <= this.y + this.height * 0.1;
      if (this.select) {
        this.clickposX = pos.x;
        this.clickposY = pos.y;
        return this.id;
      }
    }

    move(pos, id) {
      if (this.select && this.id === id) {
        const dx = pos.x - this.clickposX;
        const dy = pos.y - this.clickposY;

        this.clickposX = pos.x;
        this.clickposY = pos.y;

        this.x += Number(dx.toFixed(0));
        this.y += Number(dy.toFixed(0));
      }
    }

    mouseUp() {
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
      this.width = Number(text.width.toFixed(0)) * 1.1;
      this.height =
        (text.actualBoundingBoxAscent + text.actualBoundingBoxDescent) * 1.2;
      ctx.fillText(this.text, this.x, this.y);

      // 선택 박스
      if (id === this.id) {
        ctx.strokeStyle = "green";
        ctx.strokeRect(
          this.x - this.width / 2,
          this.y - this.height + this.height * 0.1,
          this.width,
          this.height
        );
      }
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
