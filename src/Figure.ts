import { Point } from './Point';
import { drawCircle } from './helpers';

export abstract class Figure {
  start: Point;
  end: Point;
  rulers: Point[];

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
    this.rulers = [];
  }

  abstract draw(cx: CanvasRenderingContext2D): void;

  abstract updateRulers(): void;

  update(_point: Point): void {}

  drawRulers(cx: CanvasRenderingContext2D, radius: number): void {
    this.updateRulers();

    this.rulers.forEach((ruler) => {
      drawCircle(cx, ruler.x, ruler.y, radius, 'white');
    });
  }

  getSelectedRuler(point: Point, rulerRadius: number): Point | null {
    this.updateRulers();

    return (
      this.rulers.find(
        (ruler) =>
          point.x > ruler.x - rulerRadius * 2 &&
          point.x < ruler.x + rulerRadius * 2 &&
          point.y > ruler.y - rulerRadius * 2 &&
          point.y < ruler.y + rulerRadius * 2
      ) ?? null
    );
  }
}
