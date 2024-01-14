import { Line, Square, Tool } from './types';
import { drawAllFigures, isMouseOnRuler } from './helpers';
import { activateBtn } from './tools';
import { addLineRulers } from './line';
import { addSquareRulers } from './square';
import './style.css';

const draw = () => {
  const canvas = document.querySelector('canvas');
  const cx = canvas?.getContext('2d');
  const lineBtn = document.querySelector('.toolbar__button[data-shape="line"]');
  const squareBtn = document.querySelector(
    '.toolbar__button[data-shape="square"]'
  );

  if (!canvas || !cx) return;

  cx.strokeStyle = 'blue';
  let selectedTool: Tool = 'line';
  let isDrawStart = false;
  let isDrawing = false;
  let isStartPointMove = false;
  let isEndPointMove = false;
  let isSecondPointMove = false;
  let isFourthPointMove = false;
  const rulerRadius = 4;
  const lines: Line[] = [];
  const squares: Square[] = [];

  const lineBtnClickHandler = (e: Event) => {
    activateBtn(e);
    selectedTool = 'line';
  };

  const squareBtnClickHandler = (e: Event) => {
    activateBtn(e);
    selectedTool = 'square';
  };

  const mousedownHandler = (e: MouseEvent) => {
    if (selectedTool === 'line') {
      if (lines.length) {
        const isMouseInStartPoint = isMouseOnRuler(
          e,
          lines[lines.length - 1].start,
          rulerRadius
        );
        const isMouseInEndPoint = isMouseOnRuler(
          e,
          lines[lines.length - 1].end,
          rulerRadius
        );

        if (isMouseInStartPoint) {
          isStartPointMove = true;
          return;
        }

        if (isMouseInEndPoint) {
          isEndPointMove = true;
          return;
        }
      }

      isDrawStart = true;

      lines.push({
        start: { x: e.offsetX, y: e.offsetY },
        end: { x: e.offsetX, y: e.offsetY },
      });
    }

    if (selectedTool === 'square') {
      if (squares.length) {
        const lastSquare = squares[squares.length - 1];
        const isMouseInStartPoint = isMouseOnRuler(
          e,
          lastSquare.start,
          rulerRadius
        );
        const isMouseInEndPoint = isMouseOnRuler(
          e,
          lastSquare.end,
          rulerRadius
        );
        const isMouseInSecondPoint = isMouseOnRuler(
          e,
          { x: lastSquare.end.x, y: lastSquare.start.y },
          rulerRadius
        );
        const isMouseInFourthPoint = isMouseOnRuler(
          e,
          { x: lastSquare.start.x, y: lastSquare.end.y },
          rulerRadius
        );

        if (isMouseInStartPoint) {
          isStartPointMove = true;
          return;
        }

        if (isMouseInEndPoint) {
          isEndPointMove = true;
          return;
        }

        if (isMouseInSecondPoint) {
          isSecondPointMove = true;
          return;
        }

        if (isMouseInFourthPoint) {
          isFourthPointMove = true;
          return;
        }
      }

      isDrawStart = true;

      squares.push({
        start: { x: e.offsetX, y: e.offsetY },
        end: { x: e.offsetX, y: e.offsetY },
      });
    }
  };

  const mousemoveHandler = (e: MouseEvent) => {
    if (selectedTool === 'line') {
      const lastLine = lines[lines.length - 1];

      if (isDrawStart || isEndPointMove) {
        isDrawing = true;

        lastLine.end.x = e.offsetX;
        lastLine.end.y = e.offsetY;

        drawAllFigures(cx, canvas, lines, squares);
      }

      if (isStartPointMove) {
        isDrawing = true;

        lastLine.start.x = e.offsetX;
        lastLine.start.y = e.offsetY;

        drawAllFigures(cx, canvas, lines, squares);
      }
    }

    if (selectedTool === 'square') {
      const lastSquare = squares[squares.length - 1];

      if (isDrawStart || isEndPointMove) {
        isDrawing = true;

        lastSquare.end.x = e.offsetX;
        lastSquare.end.y = e.offsetY;

        drawAllFigures(cx, canvas, lines, squares);
      }

      if (isStartPointMove) {
        isDrawing = true;

        lastSquare.start.x = e.offsetX;
        lastSquare.start.y = e.offsetY;

        drawAllFigures(cx, canvas, lines, squares);
      }

      if (isSecondPointMove) {
        isDrawing = true;

        lastSquare.end.x = e.offsetX;
        lastSquare.start.y = e.offsetY;

        drawAllFigures(cx, canvas, lines, squares);
      }

      if (isFourthPointMove) {
        isDrawing = true;

        lastSquare.start.x = e.offsetX;
        lastSquare.end.y = e.offsetY;

        drawAllFigures(cx, canvas, lines, squares);
      }
    }
  };

  const mouseupHandler = () => {
    if (selectedTool === 'line') {
      isDrawStart = false;
      isStartPointMove = false;
      isEndPointMove = false;

      isDrawing && addLineRulers(cx, lines[lines.length - 1], rulerRadius);

      isDrawing = false;
    }

    if (selectedTool === 'square') {
      isDrawStart = false;
      isStartPointMove = false;
      isEndPointMove = false;
      isSecondPointMove = false;
      isFourthPointMove = false;

      isDrawing &&
        addSquareRulers(cx, squares[squares.length - 1], rulerRadius);

      isDrawing = false;
    }
  };

  lineBtn?.addEventListener('click', lineBtnClickHandler);
  squareBtn?.addEventListener('click', squareBtnClickHandler);

  canvas?.addEventListener('mousedown', mousedownHandler);
  canvas?.addEventListener('mousemove', mousemoveHandler);
  canvas?.addEventListener('mouseup', mouseupHandler);
};

draw();
