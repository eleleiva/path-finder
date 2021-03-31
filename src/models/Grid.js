class Grid {
  constructor({ columns, rows }) {
    this.columns = columns;
    this.rows = rows;
    this.grid = Array.from(Array(columns), () => new Array(rows));
  }

  get items() {
    return this.grid.map((row) => row?.map((item) => item)).flat(2);
  }

  randomGridSpot() {
    let gridSpot = null;

    while (!gridSpot || gridSpot.wall) {
      const x = Math.floor(Math.random(0) * this.columns);
      const y = Math.floor(Math.random(0) * this.rows);

      gridSpot = this.grid[x][y];
    }

    return gridSpot;
  }

  getStart() {
    const start = this.randomGridSpot();
    start.start = true;
    start.wall = false;

    return start;
  }

  getEnd() {
    const end = this.randomGridSpot();
    end.end = true;
    end.wall = false;

    return end;
  }

  populate({ spot, width, height }) {
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        this.grid[x][y] = new spot({ x, y, height, width });
      }
    }
  }

  callItemsWithGrid(functionName) {
    this.items.forEach((item) => item[functionName](this.grid));
  }
}

export { Grid };
