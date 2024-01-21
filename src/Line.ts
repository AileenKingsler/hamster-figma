import { Figure } from './Figure';

export class Line extends Figure {
  draw(cx: CanvasRenderingContext2D) {
    cx.beginPath();
    cx.moveTo(this.start.x, this.start.y);
    cx.lineTo(this.end.x, this.end.y);
    cx.stroke();
  }

  updateRulers() {
    this.rulers = [this.start, this.end];
  }
}
