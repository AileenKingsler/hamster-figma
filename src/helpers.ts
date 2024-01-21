import { Figure } from './Figure';

export const clearCanvas = (
  cx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => {
  cx.clearRect(0, 0, canvas.width, canvas.height);
};

export const drawAllFigures = (
  cx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  figures: Figure[]
) => {
  clearCanvas(cx, canvas);

  figures.forEach((figure) => figure.draw(cx));
};

export const drawCircle = (
  cx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  fillStyle?: string
) => {
  cx.beginPath();
  cx.arc(x, y, radius, 0, 2 * Math.PI);
  cx.stroke();

  if (fillStyle) {
    cx.fillStyle = fillStyle;
    cx.fill();
  }
};
