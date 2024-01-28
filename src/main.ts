import { drawAllFigures } from './helpers';
import { Point } from './Point';
import { Figure } from './Figure';
import { Line } from './Line';
import { Square } from './Square';
import { Circle } from './Circle';
import './style.css';

type Tool = 'line' | 'square' | 'circle';

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

  let lineWidth = Number(lineWidthSelect?.value) || 1;
  let strokeStyle = lineColorSelect?.value || 'black';
  let selectedTool: Tool = 'line';
  const rulerRadius = 4;
  const figures: Figure[] = [];
  let selectedRuler: Point | null;
  let selectedFigure: Figure | null;

  const toolBtnClickHandler = (e: Event) => {
    const activeToolBtn = document.querySelector('.toolbar__button.active');
    const currentTarget = <HTMLButtonElement>e.currentTarget;

    activeToolBtn?.classList.remove('active');
    currentTarget?.classList.add('active');

    selectedTool = currentTarget.getAttribute('data-shape') as Tool;
  };

  const lineWidthSelectChangeHandler = (e: Event) => {
    const currentTarget = <HTMLSelectElement>e.currentTarget;

    lineWidth = +currentTarget.value;

    if (selectedFigure) {
      selectedFigure.lineWidth = lineWidth;
      drawAllFigures(cx, canvas, figures);
      selectedFigure.drawRulers(cx, rulerRadius);
    }
  };

  const lineColorSelectChangeHandler = (e: Event) => {
    const currentTarget = <HTMLInputElement>e.currentTarget;

    strokeStyle = currentTarget.value;

    if (selectedFigure) {
      selectedFigure.strokeStyle = strokeStyle;
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

    const start = new Point(e.offsetX, e.offsetY);
    const end = new Point(e.offsetX, e.offsetY);

    selectedRuler = end;

    if (selectedTool === 'line') {
      figures.push(new Line(start, end, lineWidth, strokeStyle));
    }

    if (selectedTool === 'square') {
      figures.push(new Square(start, end, lineWidth, strokeStyle));
    }

    if (selectedTool === 'circle') {
      figures.push(new Circle(start, end, lineWidth, strokeStyle));
    }

    selectedFigure = figures[figures.length - 1];
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

        lineWidth = selectedFigure.lineWidth;
        strokeStyle = selectedFigure.strokeStyle;

        if (lineWidthSelect) {
          lineWidthSelect.value = lineWidth.toString();
        }

        if (lineColorSelect) {
          lineColorSelect.value = strokeStyle;
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
