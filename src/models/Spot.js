import { DrawerFactory } from 'models/DrawerFactory';

class Spot {
  static wallChance = 0.5;

  static currentId = 1;

  static get nextId() {
    return this.currentId++;
  }

  static set nextId(nextId) {
    this.currentId = nextId;
  }

  constructor({ x, y, width, height }) {
    this.id = Spot.nextId;
    this.x = x;
    this.y = y;
    this.totalCost = 0;
    this.currentPathCost = 0;
    this.costToFinish = 0;
    this.width = width;
    this.height = height;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;

    if (Math.random() < Spot.wallChance) {
      this.wall = true;
    }
  }

  get color() {
    if (this.wall) return DrawerFactory.color.black;

    if (this.end) return DrawerFactory.color.red;

    if (this.start) return DrawerFactory.color.green;

    return DrawerFactory.color.white;
  }

  get neighborWalls() {
    return this.neighbors.filter((neighbor) => neighbor.wall);
  }

  show() {
    if (this.wall) {
      DrawerFactory.dot({
        x: this.x * this.width + this.width * 0.5,
        y: this.y * this.width + this.width * 0.5,
        width: this.width - 1,
        height: this.height - 1,
        color: DrawerFactory.color.black,
      });

      this.neighborWalls.forEach(this.drawLineToNeighbor);
    } else if (this.start || this.end) {
      DrawerFactory.dot({
        x: this.x * this.width + this.width * 0.5,
        y: this.y * this.width + this.width * 0.5,
        width: this.width - 1,
        height: this.height - 1,
        color: this.color,
      });
    }
  }

  drawLineToNeighbor = ({
    x: neighborX,
    y: neighborY,
    width: neighborWidth,
    height: neighborHeight,
  }) => {
    const { x, y, width, height } = this;
    // Connect to Right Dot
    if (neighborX > x && neighborY === y) {
      // Top Line
      DrawerFactory.line({
        startX: x * width + width / 2,
        startY: y * height + height / 4,
        endX: neighborX * neighborWidth + neighborWidth / 2,
        endY: neighborY * neighborHeight + neighborHeight / 4,
        color: DrawerFactory.color.black,
        strokeWeight: this.width / 2,
      });
      // Bottom Line
      DrawerFactory.line({
        startX: x * width + width / 2,
        startY: y * height + height * 0.75,
        endX: neighborX * neighborWidth + neighborWidth / 2,
        endY: neighborY * neighborHeight + neighborHeight * 0.75,
        color: DrawerFactory.color.black,
        strokeWeight: this.width / 2,
      });
      // Connect to top Dot
    } else if (neighborX === x && neighborY > y) {
      // Right Line
      DrawerFactory.line({
        startX: x * width + height / 4,
        startY: y * height + height / 2,
        endX: neighborX * neighborWidth + neighborWidth / 4,
        endY: neighborY * neighborHeight + neighborHeight / 2,
        color: DrawerFactory.color.black,
        strokeWeight: this.width / 2,
      });
      // Left Line
      DrawerFactory.line({
        startX: x * width + width * 0.75,
        startY: y * height + height / 2,
        endX: neighborX * neighborWidth + width * 0.75,
        endY: neighborY * neighborHeight + height / 2,
        color: DrawerFactory.color.black,
        strokeWeight: this.width / 2,
      });
    }
  };

  addNeighbors(grid) {
    const { x, y } = this;

    for (
      let i = Math.max(0, x - 1);
      i <= Math.min(x + 1, grid.length - 1);
      i++
    ) {
      for (
        let j = Math.max(0, y - 1);
        j <= Math.min(y + 1, grid[0].length - 1);
        j++
      ) {
        if (x !== i || y !== j) {
          this.neighbors.push(grid[i][j]);
        }
      }
    }
  }
}

export { Spot };
