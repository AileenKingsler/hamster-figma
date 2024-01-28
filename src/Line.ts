import { Figure } from './Figure';
import { Point } from './Point';
import { distancePointFromLine } from './helpers';

export class Line extends Figure {
  draw(cx: CanvasRenderingContext2D) {
    cx.lineWidth = this.lineWidth;
    cx.strokeStyle = this.strokeStyle;
    cx.beginPath();
    cx.moveTo(this.start.x, this.start.y);
    cx.lineTo(this.end.x, this.end.y);
    cx.stroke();
  }

  updateRulers() {
    this.rulers = [this.start, this.end];
  }

  isPointerInside(point: Point): boolean {
    return (
      distancePointFromLine(
        point.x,
        point.y,
        this.start.x,
        this.start.y,
        this.end.x,
        this.end.y
      ) <= 4
    );
  }
}
