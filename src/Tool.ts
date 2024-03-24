import { Line } from './Line';
import { Square } from './Square';
import { Circle } from './Circle';
import { Point } from './Point';
import { Figure } from './Figure';

export interface Tool {
  onMouseDown: (e: MouseEvent) => void;
}

class DrawTool implements Tool {
  constructor(
    public style: { lineWidth: number; strokeStyle: string },
    public figures: Figure[]
  ) {}

  onMouseDown(_e: MouseEvent) {}
}

export class LineTool extends DrawTool {
  onMouseDown(e: MouseEvent) {
    this.figures.push(
      new Line(
        new Point(e.offsetX, e.offsetY),
        new Point(e.offsetX, e.offsetY),
        this.style.lineWidth,
        this.style.strokeStyle
      )
    );
  }
}

export class SquareTool extends DrawTool {
  onMouseDown(e: MouseEvent) {
    this.figures.push(
      new Square(
        new Point(e.offsetX, e.offsetY),
        new Point(e.offsetX, e.offsetY),
        this.style.lineWidth,
        this.style.strokeStyle
      )
    );
  }
}

export class CircleTool extends DrawTool {
  onMouseDown(e: MouseEvent) {
    this.figures.push(
      new Circle(
        new Point(e.offsetX, e.offsetY),
        new Point(e.offsetX, e.offsetY),
        this.style.lineWidth,
        this.style.strokeStyle
      )
    );
  }
}
