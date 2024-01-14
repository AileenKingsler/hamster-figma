import { Line } from './types';
import { addRulers } from './helpers';

export const drawLine = (cx: CanvasRenderingContext2D, line: Line) => {
  cx.beginPath();
  cx.moveTo(line.start.x, line.start.y);
  cx.lineTo(line.end.x, line.end.y);
  cx.lineWidth = 1;
  cx.stroke();
};

export const addLineRulers = (
  cx: CanvasRenderingContext2D,
  line: Line,
  radius: number
) => {
  addRulers(cx, [line.start, line.end], radius);
};
