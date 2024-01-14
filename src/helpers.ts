import { drawLine } from './line';
import { drawSquare } from './square';
import { Line, Point, Square } from './types';

export const clearCanvas = (
  cx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => {
  cx.clearRect(0, 0, canvas.width, canvas.height);
};

export const drawAllFigures = (
  cx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  lines: Line[],
  squares: Square[]
) => {
  clearCanvas(cx, canvas);

  lines.forEach((line) => drawLine(cx, line));
  squares.forEach((square) => drawSquare(cx, square));
};

export const drawCircle = (
  cx: CanvasRenderingContext2D,
  center: Point,
  radius: number,
  stroke?: number,
  fill?: string
) => {
  cx.beginPath();
  cx.arc(center.x, center.y, radius, 0, 2 * Math.PI);

  if (stroke) {
    cx.lineWidth = stroke;
    cx.stroke();
  }

  if (fill) {
    cx.fillStyle = fill;
    cx.fill();
  }
};

export const addRulers = (
  cx: CanvasRenderingContext2D,
  corners: Point[],
  radius: number
) => {
  corners.forEach((corner) => {
    drawCircle(cx, corner, radius, 2, 'white');
  });
};

export const isMouseOnRuler = (
  e: MouseEvent,
  rulerCenter: Point,
  rulerRadius: number
) =>
  e.offsetX > rulerCenter.x - rulerRadius * 2 &&
  e.offsetX < rulerCenter.x + rulerRadius * 2 &&
  e.offsetY > rulerCenter.y - rulerRadius * 2 &&
  e.offsetY < rulerCenter.y + rulerRadius * 2;
