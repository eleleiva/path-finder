import { DrawerFactory } from 'models/DrawerFactory';

function heuristic(a, b) {
  return DrawerFactory.distance({
    startX: a.x,
    startY: a.y,
    endX: b.x,
    endY: b.y,
  });
}

export { heuristic };
