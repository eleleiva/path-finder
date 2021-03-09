import { P5Factory } from './P5Factory';

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
    this.f = 0;
    this.g = 0;
    this.h = 0;
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
    if (this.wall) return 0;

    if (this.end) return P5Factory.p5.color(255, 0, 0);

    if (this.start) return P5Factory.p5.color(0, 0, 255);

    return 255;
  }

  get neighborWalls() {
    return this.neighbors.filter((neighbor) => neighbor.wall);
  }

  show() {
    if (this.wall) {
      P5Factory.p5.fill(0);
      P5Factory.p5.noStroke();

      P5Factory.p5.ellipse(
        this.x * this.width + this.width * 0.5,
        this.y * this.width + this.width * 0.5,
        this.width - 1,
        this.height - 1
      );

      P5Factory.p5.stroke(0);
      P5Factory.p5.strokeWeight(this.width / 2);

      this.neighborWalls.forEach(this.drawLineToNeighbor);
    } else if (this.start || this.end) {
      P5Factory.p5.fill(this.color);
      P5Factory.p5.noStroke();
      P5Factory.p5.ellipse(
        this.x * this.width + this.width / 2,
        this.y * this.height + this.height / 2,
        this.width - 1,
        this.height - 1
      );
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
      P5Factory.p5.line(
        x * width + width / 2,
        y * height + height / 4,
        neighborX * neighborWidth + neighborWidth / 2,
        neighborY * neighborHeight + neighborHeight / 4
      );

      // Bottom Line
      P5Factory.p5.line(
        x * width + width / 2,
        y * height + height * 0.75,
        neighborX * neighborWidth + neighborWidth / 2,
        neighborY * neighborHeight + neighborHeight * 0.75
      );
      // Connect to top Dot
    } else if (neighborX === x && neighborY > y) {
      // Right Line
      P5Factory.p5.line(
        x * width + height / 4,
        y * height + height / 2,
        neighborX * neighborWidth + neighborWidth / 4,
        neighborY * neighborHeight + neighborHeight / 2
      );
      // Left Line
      P5Factory.p5.line(
        x * width + width * 0.75,
        y * height + height / 2,
        neighborX * neighborWidth + width * 0.75,
        neighborY * neighborHeight + height / 2
      );
    }
  };

  addNeighbors(grid) {
    const { x, y } = this;

    if (x < grid.length - 1) {
      this.neighbors.push(grid[x + 1][y]);
    }
    if (x < grid.length - 1 && y < grid[0].length - 1) {
      this.neighbors.push(grid[x + 1][y + 1]);
    }
    if (x < grid.length - 1 && y > 0) {
      this.neighbors.push(grid[x + 1][y - 1]);
    }
    if (x > 0) {
      this.neighbors.push(grid[x - 1][y]);
    }
    if (y < grid[0].length - 1) {
      this.neighbors.push(grid[x][y + 1]);
    }
    if (y > 0) {
      this.neighbors.push(grid[x][y - 1]);
    }
    if (x > 0 && y < grid[0].length - 1) {
      this.neighbors.push(grid[x - 1][y + 1]);
    }
    if (x > 0 && y > 0) {
      this.neighbors.push(grid[x - 1][y - 1]);
    }
  }
}

export { Spot };
