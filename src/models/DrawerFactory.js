class DrawerFactory {
  static storedP5;

  static get p5() {
    return DrawerFactory.storedP5;
  }

  static set p5(p5) {
    if (DrawerFactory.storedP5) return;

    DrawerFactory.storedP5 = p5;
  }

  static dot({ x, y, width, height, color }) {
    if (color) DrawerFactory.p5.fill(...color);

    DrawerFactory.p5.noStroke();

    DrawerFactory.p5.ellipse(x, y, width, height);
  }

  static line({ startX, startY, endX, endY, color, strokeWeight }) {
    if (color) DrawerFactory.p5.stroke(...color);

    DrawerFactory.p5.strokeWeight(strokeWeight);

    DrawerFactory.p5.line(startX, startY, endX, endY);
  }

  static distance({ startX, startY, endX, endY }) {
    return DrawerFactory.p5.dist(startX, startY, endX, endY);
  }
}

export { DrawerFactory };
