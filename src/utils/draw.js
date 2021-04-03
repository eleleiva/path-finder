import { DrawerFactory } from 'models/DrawerFactory';

function drawDot({ dot }) {
  DrawerFactory.dot({
    x: dot.x * dot.width + dot.width * 0.5,
    y: dot.y * dot.width + dot.width * 0.5,
    width: dot.width - 1,
    height: dot.height - 1,
    color: DrawerFactory.color.blue,
  });
}

export { drawDot };
