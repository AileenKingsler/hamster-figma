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

  if (!canvas || !cx) return;

  cx.strokeStyle = 'blue';
  let selectedTool: Tool = 'line';
  cx.lineWidth = 1;
  const rulerRadius = 4;
  const figures: Figure[] = [];
  let selectedRuler: Point | null;

  const toolBtnClickHandler = (e: Event) => {
    const activeToolBtn = document.querySelector('.toolbar__button.active');
    const currentTarget = <HTMLButtonElement>e.currentTarget;

    activeToolBtn?.classList.remove('active');
    currentTarget?.classList.add('active');

    selectedTool = currentTarget.getAttribute('data-shape') as Tool;
  };

  const mousedownHandler = (e: MouseEvent) => {
    if (figures.length) {
      const lastFigure = figures[figures.length - 1];

      const point = new Point(e.offsetX, e.offsetY);
      selectedRuler = lastFigure.getSelectedRuler(point, rulerRadius);

      if (selectedRuler) return;
    }

    const start = new Point(e.offsetX, e.offsetY);
    const end = new Point(e.offsetX, e.offsetY);

    selectedRuler = end;

    if (selectedTool === 'line') {
      figures.push(new Line(start, end));
    }

    if (selectedTool === 'square') {
      figures.push(new Square(start, end));
    }

    if (selectedTool === 'circle') {
      figures.push(new Circle(start, end));
    }
  };

  const mousemoveHandler = (e: MouseEvent) => {
    if (selectedRuler) {
      const lastFigure = figures[figures.length - 1];

      selectedRuler.x = e.offsetX;
      selectedRuler.y = e.offsetY;

      lastFigure.update(selectedRuler);
      drawAllFigures(cx, canvas, figures);
    }
  };

  const mouseupHandler = () => {
    const lastFigure = figures[figures.length - 1];

    lastFigure.drawRulers(cx, rulerRadius);

    selectedRuler = null;
  };

  toolBtns.forEach((toolBtn) => {
    toolBtn?.addEventListener('click', toolBtnClickHandler);
  });

  canvas?.addEventListener('mousedown', mousedownHandler);
  canvas?.addEventListener('mousemove', mousemoveHandler);
  canvas?.addEventListener('mouseup', mouseupHandler);
};

document.addEventListener('DOMContentLoaded', () => {
  draw();
});
