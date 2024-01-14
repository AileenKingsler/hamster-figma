import { Point } from './types';

export const clearCanvas = (
  canvas: HTMLCanvasElement,
  cx: CanvasRenderingContext2D
) => {
  cx.clearRect(0, 0, canvas.width, canvas.height);
};

export const drawLine = (
  cx: CanvasRenderingContext2D,
  start: Point,
  end: Point
) => {
  cx.beginPath();
  cx.moveTo(start.x, start.y);
  cx.lineTo(end.x, end.y);
  cx.lineWidth = 1;
  cx.stroke();
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

export const isMouseOnRuler = (
  e: MouseEvent,
  rulerCenter: Point,
  rulerRadius: number
) =>
  e.offsetX > rulerCenter.x - rulerRadius &&
  e.offsetX < rulerCenter.x + rulerRadius &&
  e.offsetY > rulerCenter.y - rulerRadius &&
  e.offsetY < rulerCenter.y + rulerRadius;
