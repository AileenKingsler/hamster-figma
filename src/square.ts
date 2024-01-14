import { Square } from './types';
import { addRulers } from './helpers';

export const drawSquare = (cx: CanvasRenderingContext2D, square: Square) => {
  cx.strokeRect(
    square.start.x,
    square.start.y,
    square.end.x - square.start.x,
    square.end.y - square.start.y
  );
};

export const addSquareRulers = (
  cx: CanvasRenderingContext2D,
  square: Square,
  radius: number
) => {
  const corners = [
    square.start,
    { x: square.end.x, y: square.start.y },
    square.end,
    { x: square.start.x, y: square.end.y },
  ];

  addRulers(cx, corners, radius);
};
