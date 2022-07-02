import { useState } from "react";
import { useEffect, useRef } from "react";

const CanvasComp = ({ pic, texts, colorData, setTexts }) => {
  const canvasRef = useRef(null);
  const image = new window.Image();

  class App {
    constructor() {
      console.log(texts);
      this.canvas = canvasRef.current;
      this.ctx = this.canvas.getContext("2d");
      this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

      this.mousePos = { x: 0, y: 0 };
      this.mouseDown = false;

      this.Text = [];
      this.selectedText = null;

      this.resizeHandler = this.resize.bind(this);
      window.addEventListener("resize", this.resizeHandler, false);
      this.resize();

      this.animateHandler = this.animate.bind(this);
      window.requestAnimationFrame(this.animateHandler);

      this.onDownHandler = this.onDown.bind(this);
      this.canvas.addEventListener("pointerdown", this.onDownHandler, false);
      this.onMoveHandler = this.onMove.bind(this);
      this.canvas.addEventListener("pointermove", this.onMoveHandler, false);
      this.onUpHandler = this.onUp.bind(this);
      this.canvas.addEventListener("pointerup", this.onUpHandler, false);
    }

    remove() {
      window.removeEventListener("resize", this.resizeHandler);
      window.cancelAnimationFrame(this.animateHandler);
      this.canvas.removeEventListener("pointerdown", this.onDownHandler);
      this.canvas.removeEventListener("pointermove", this.onUpHandler);
      this.canvas.removeEventListener("pointerup", this.onUpHandler);
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

      this.background();
      this.Text.map((text) => {
        text.draw(this.ctx);
      });

      window.requestAnimationFrame(this.animate.bind(this));
    }

    background() {
      this.ctx.drawImage(image, 0, 0);
      this.ctx.filter = `opacity(0.5) drop-shadow(0 0 0 ${colorData}) brightness(65%) contrast(400%)`;
      image.src = require(`../../components/createcomp/img/${pic}.png`);
    }

    onDown(e) {
      this.mousePos.x = parseInt(
        e.clientX - e.currentTarget.getBoundingClientRect().left
      );
      this.mousePos.y = parseInt(
        e.clientY - e.currentTarget.getBoundingClientRect().top
      );
      this.mouseDown = true;
      this.Text.forEach((text) => {
        if (text.selectionOn(this.mousePos) !== undefined) {
          this.selectedText = text.selectionOn(this.mousePos);
        }
      });
    }

    onMove(e) {
      this.mousePos.x = parseInt(
        e.clientX - e.currentTarget.getBoundingClientRect().left
      );
      this.mousePos.y = parseInt(
        e.clientY - e.currentTarget.getBoundingClientRect().top
      );
      this.Text.forEach((text) => {
        text.move(this.mousePos, this.selectedText);
      });
    }

    onUp(e) {
      this.mouseDown = false;
      console.log(this.Text);
      this.Text.forEach((text) => {
        if (text.selectionOn(this.mousePos) !== undefined) {
          text.selectionOff();
        }
      });
    }
  }

  class Text {
    constructor(text, font, color, height, id, x, y, stageWidth, stageHeight) {
      this.text = text;
      this.font = font;
      this.color = color;
      this.x = x === -1000 ? stageWidth / 2 : x;
      this.y = y === -1000 ? stageHeight / 2 : y;
      this.height = height;
      this.id = id;
    }

    selectionOn(pos) {
      this.select =
        pos.x >= this.x - this.width / 2 &&
        pos.x <= this.x + this.width / 2 &&
        pos.y >= this.y - this.height &&
        pos.y <= this.y;
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

    selectionOff() {
      if (this.select) {
        const textsclone = [...texts];
        textsclone[this.id] = {
          ...textsclone[this.id],
          x: this.x,
          y: this.y,
          id: this.id,
        };
        setTexts(textsclone)
      }
    }

    draw(ctx) {
      ctx.font = this.font;
      ctx.textAlign = "center";
      ctx.fillStyle = this.color;
      this.width = Number(ctx.measureText(this.text).width.toFixed(0));
      ctx.fillText(this.text, this.x, this.y);
    }
  }

  useEffect(() => {
    let appclass = new App();
    return () => {
      appclass.remove();
    };
  }, [pic, texts, colorData, canvasRef]);

  return <canvas ref={canvasRef} className="cre_canvas" />;
};

export default CanvasComp;
