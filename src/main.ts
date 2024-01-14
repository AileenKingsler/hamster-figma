import { Point } from './types';
import { clearCanvas, drawCircle, drawLine, isMouseOnRuler } from './helpers';
import './style.css';

const addLineRulers = (
  cx: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  radius: number
) => {
  drawCircle(cx, start, radius, 2, 'white');
  drawCircle(cx, end, radius, 2, 'white');
};

const draw = () => {
  const canvas = document.querySelector('canvas');
  const cx = canvas?.getContext('2d');

  if (!canvas || !cx) return;

  cx.strokeStyle = 'blue';
  let isDrawStart = false;
  let isDrawing = false;
  let isLineStartMove = false;
  let isLineEndMove = false;
  let lineStart: Point = { x: 0, y: 0 };
  let lineEnd: Point = { x: 0, y: 0 };
  const rulerRadius = 4;

  const mousedownHandler = (e: MouseEvent) => {
    const isMouseInLineStart = isMouseOnRuler(e, lineStart, rulerRadius);
    const isMouseInLineEnd = isMouseOnRuler(e, lineEnd, rulerRadius);

    if (isMouseInLineStart) {
      isLineStartMove = true;
      return;
    }

    if (isMouseInLineEnd) {
      isLineEndMove = true;
      return;
    }

    isDrawStart = true;

    lineStart = { x: e.offsetX, y: e.offsetY };
  };

  const mousemoveHandler = (e: MouseEvent) => {
    if (isDrawStart || isLineEndMove) {
      isDrawing = true;

      lineEnd = { x: e.offsetX, y: e.offsetY };
      clearCanvas(canvas, cx);
      drawLine(cx, lineStart, lineEnd);
    }

    if (isLineStartMove) {
      isDrawing = true;

      lineStart = { x: e.offsetX, y: e.offsetY };
      clearCanvas(canvas, cx);
      drawLine(cx, lineStart, lineEnd);
    }
  };

  const mouseupHandler = () => {
    isDrawStart = false;
    isLineStartMove = false;
    isLineEndMove = false;

    isDrawing && addLineRulers(cx, lineStart, lineEnd, rulerRadius);

    isDrawing = false;
  };

  canvas?.addEventListener('mousedown', mousedownHandler);
  canvas?.addEventListener('mousemove', mousemoveHandler);
  canvas?.addEventListener('mouseup', mouseupHandler);
};

draw();
