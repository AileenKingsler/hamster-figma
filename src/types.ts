export type Tool = 'line' | 'square';

export type Point = {
  x: number;
  y: number;
};

export type Line = {
  start: Point;
  end: Point;
};

export type Square = {
  start: Point;
  end: Point;
};
