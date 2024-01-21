import { Figure } from './Figure';
import { Point } from './Point';
import { drawCircle } from './helpers';

export class Circle extends Figure {
  radius: number;

  constructor(start: Point, end: Point) {
    super(start, end);

    this.radius = Math.sqrt(
      Math.pow(this.end.x - this.start.x, 2) +
        Math.pow(this.end.y - this.start.y, 2)
    );
  }

  draw(cx: CanvasRenderingContext2D) {
    drawCircle(cx, this.start.x, this.start.y, this.radius);
  }

  updateRulers() {
    this.rulers = [this.start, this.end];
  }

  update(point: Point) {
    if (point === this.start) {
      this.end.x = this.start.x + this.radius;
      this.end.y = this.start.y;
    }

    if (point === this.end) {
      this.radius = Math.sqrt(
        Math.pow(this.end.x - this.start.x, 2) +
          Math.pow(this.end.y - this.start.y, 2)
      );
    }
  }
}
