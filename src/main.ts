import { drawAllFigures } from './helpers';
import { Point } from './Point';
import { Figure } from './Figure';
import { CircleTool, LineTool, SquareTool, Tool } from './Tool';

import './style.css';

const draw = () => {
  const canvas = document.querySelector('canvas');
  const cx = canvas?.getContext('2d');
  const toolBtns = document.querySelectorAll('.toolbar__button[data-shape]');
  const lineWidthSelect = document.querySelector<HTMLSelectElement>(
    '.toolbar__select[data-property="line-width"]'
  );
  const lineColorSelect = document.querySelector<HTMLInputElement>(
    '.toolbar__select[data-property="line-color"]'
  );

  if (!canvas || !cx) return;

  const style = {
    lineWidth: Number(lineWidthSelect?.value) || 1,
    strokeStyle: lineColorSelect?.value || 'black',
  };
  const rulerRadius = 4;
  const figures: Figure[] = [];
  const lineTool = new LineTool(style, figures);
  const squareTool = new SquareTool(style, figures);
  const circleTool = new CircleTool(style, figures);
  let selectedTool: Tool = lineTool;
  let selectedRuler: Point | null;
  let selectedFigure: Figure | null;

  const toolBtnClickHandler = (e: Event) => {
    const activeToolBtn = document.querySelector('.toolbar__button.active');
    const currentTarget = <HTMLButtonElement>e.currentTarget;

    activeToolBtn?.classList.remove('active');
    currentTarget?.classList.add('active');

    switch (currentTarget.getAttribute('data-shape')) {
      case 'line':
        selectedTool = lineTool;
        break;
      case 'square':
        selectedTool = squareTool;
        break;
      case 'circle':
        selectedTool = circleTool;
        break;
    }
  };

  const lineWidthSelectChangeHandler = (e: Event) => {
    const currentTarget = <HTMLSelectElement>e.currentTarget;

    style.lineWidth = +currentTarget.value;

    if (selectedFigure) {
      selectedFigure.lineWidth = style.lineWidth;
      drawAllFigures(cx, canvas, figures);
      selectedFigure.drawRulers(cx, rulerRadius);
    }
  };

  const lineColorSelectChangeHandler = (e: Event) => {
    const currentTarget = <HTMLInputElement>e.currentTarget;

    style.strokeStyle = currentTarget.value;

    if (selectedFigure) {
      selectedFigure.strokeStyle = style.strokeStyle;
      drawAllFigures(cx, canvas, figures);
      selectedFigure.drawRulers(cx, rulerRadius);
    }
  };

  const canvasMousedownHandler = (e: MouseEvent) => {
    if (selectedFigure) {
      const point = new Point(e.offsetX, e.offsetY);
      selectedRuler = selectedFigure.getSelectedRuler(point, rulerRadius);

      if (selectedRuler) return;
    }

    selectedTool.onMouseDown(e);

    selectedFigure = figures[figures.length - 1];
    selectedRuler = selectedFigure.end;
  };

  const canvasMousemoveHandler = (e: MouseEvent) => {
    if (selectedRuler) {
      selectedRuler.x = e.offsetX;
      selectedRuler.y = e.offsetY;

      if (selectedFigure) {
        selectedFigure.update(selectedRuler);
      }

      drawAllFigures(cx, canvas, figures);
    }
  };

  const canvasMouseupHandler = (e: MouseEvent) => {
    if (selectedFigure) {
      if (
        selectedFigure.start.x === selectedFigure.end.x &&
        selectedFigure.start.y === selectedFigure.end.y
      ) {
        figures.pop();

        const point = new Point(e.offsetX, e.offsetY);
        selectedFigure =
          figures.findLast((figure) => figure.isPointerInside(point)) || null;

        if (!selectedFigure) return;

        style.lineWidth = selectedFigure.lineWidth;
        style.strokeStyle = selectedFigure.strokeStyle;

        if (lineWidthSelect) {
          lineWidthSelect.value = style.lineWidth.toString();
        }

        if (lineColorSelect) {
          lineColorSelect.value = style.strokeStyle;
        }

        drawAllFigures(cx, canvas, figures);
        selectedFigure.drawRulers(cx, rulerRadius);
      } else {
        selectedFigure.drawRulers(cx, rulerRadius);
      }
    }

    selectedRuler = null;
  };

  const deleteKeydownHandler = (event: KeyboardEvent) => {
    if (event.code === 'Delete') {
      const index = figures.findIndex((figure) => figure === selectedFigure);

      if (index === -1) return;

      selectedFigure = null;
      figures.splice(index, 1);
      drawAllFigures(cx, canvas, figures);
    }
  };

  window.addEventListener('keydown', deleteKeydownHandler);

  canvas?.addEventListener('mousedown', canvasMousedownHandler);
  canvas?.addEventListener('mousemove', canvasMousemoveHandler);
  canvas?.addEventListener('mouseup', canvasMouseupHandler);

  toolBtns.forEach((toolBtn) => {
    toolBtn?.addEventListener('click', toolBtnClickHandler);
  });

  lineWidthSelect?.addEventListener('change', lineWidthSelectChangeHandler);
  lineColorSelect?.addEventListener('input', lineColorSelectChangeHandler);
};

document.addEventListener('DOMContentLoaded', draw);
