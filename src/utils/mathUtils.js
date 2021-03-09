import { P5Factory } from './P5Factory';

function heuristic(a, b) {
  return P5Factory.p5.dist(a.x, a.y, b.x, b.y);
}

export { heuristic };
