import { Figure } from './Figure';
import { Point } from './Point';

export class Square extends Figure {
  secondPoint: Point;
  fourthPoint: Point;

  constructor(
    start: Point,
    end: Point,
    lineWidth: number,
    strokeStyle: string
  ) {
    super(start, end, lineWidth, strokeStyle);

    this.secondPoint = new Point(this.end.x, this.start.y);
    this.fourthPoint = new Point(this.start.x, this.end.y);
  }

  draw(cx: CanvasRenderingContext2D) {
    cx.lineWidth = this.lineWidth;
    cx.strokeStyle = this.strokeStyle;
    cx.strokeRect(
      this.start.x,
      this.start.y,
      this.end.x - this.start.x,
      this.end.y - this.start.y
    );
  }

  updateRulers() {
    this.rulers = [this.start, this.secondPoint, this.end, this.fourthPoint];
  }

  update(point: Point) {
    if (point === this.start || point === this.end) {
      this.fourthPoint.x = this.start.x;
      this.secondPoint.y = this.start.y;
      this.secondPoint.x = this.end.x;
      this.fourthPoint.y = this.end.y;
    } else {
      this.start.x = this.fourthPoint.x;
      this.start.y = this.secondPoint.y;
      this.end.x = this.secondPoint.x;
      this.end.y = this.fourthPoint.y;
    }
  }

  isPointerInside(point: Point): boolean {
    return (
      ((point.x > this.start.x && point.x < this.end.x) ||
        (point.x < this.start.x && point.x > this.end.x)) &&
      ((point.y > this.start.y && point.y < this.end.y) ||
        (point.y < this.start.y && point.y > this.end.y))
    );
  }
}
