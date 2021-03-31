import { DrawerFactory } from 'models/DrawerFactory';
import { Grid } from 'models/Grid';
import { Spot } from 'models/Spot';
import { calculatePath, getToCommonItem, removeFromArray } from 'utils/array';
import { drawDot } from 'utils/draw';
import { heuristic } from 'utils/math';

function sketch({
  columns = 50,
  rows = 50,
  delay = false,
  delayTime = 5,
} = {}) {
  const grid = new Grid({ columns, rows });
  let openSet = [];
  let closedSet = [];
  let start;
  let end;
  let fullPath = [];
  let oldPath = [];
  let backTrack = [];
  let newFoundPath = [];
  let width = 0;
  let height = 0;
  let delayCounter = 0;

  function resetCost() {
    grid.items.forEach((item) => {
      item.previous = null;
      item.currentPathCost = 0;
      item.costToFinish = 0;
      item.totalCost = 0;
    });
  }

  function resetPath() {
    resetCost();
    fullPath = [];
    end.end = false;
    end.start = true;
    start.start = false;
    start = end;
    openSet = [start];
    closedSet = [];
    end = grid.randomGridSpot();
    end.end = true;
  }

  function updateCost(current) {
    closedSet.push(current);

    const { neighbors } = current;
    let temporalCurrentPathCost = 0;

    neighbors.forEach((neighbor) => {
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        temporalCurrentPathCost = current.currentPathCost + 1;
        let newPath = false;

        if (openSet.includes(neighbor)) {
          if (temporalCurrentPathCost < neighbor.currentPathCost) {
            neighbor.currentPathCost = temporalCurrentPathCost;
            newPath = true;
          }
        } else {
          neighbor.currentPathCost = temporalCurrentPathCost;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.costToFinish = heuristic(neighbor, end);
          neighbor.totalCost = neighbor.currentPathCost + neighbor.costToFinish;
          neighbor.previous = current;
        }
      }
    });
  }

  function delayDraw() {
    if (!delay) return false;

    delayCounter++;

    return delayCounter % delayTime !== 0;
  }

  function draw() {
    if (delayDraw()) return;

    if (backTrack.length > 0) {
      drawDots();

      drawDot({ dot: backTrack.shift() });

      return;
    }

    if (newFoundPath.length > 0) {
      drawDots();

      drawDot({ dot: newFoundPath.pop() });

      return;
    }

    if (openSet.length > 0) {
      analyzeOpenSet();

      return;
    }

    console.log('no solution');
    resetPath();
    return;
  }

  function analyzeOpenSet() {
    const currentItemToAnalyze = [...openSet]
      .sort()
      .reduce((previousValue, currentValue) => {
        if (currentValue.totalCost < previousValue.totalCost) {
          return currentValue;
        }

        if (currentValue.currentPathCost > previousValue.currentPathCost) {
          return currentValue;
        }

        return previousValue;
      }, openSet[0]);

    if (currentItemToAnalyze === end) {
      console.log('done');
      resetPath();
      return;
    }

    openSet = removeFromArray(openSet, currentItemToAnalyze);
    updateCost(currentItemToAnalyze);
    oldPath = fullPath;
    fullPath = calculatePath(currentItemToAnalyze);
    backTrack = getToCommonItem(fullPath, oldPath);
    newFoundPath = getToCommonItem(oldPath, fullPath);
  }

  function setup(passedP5, canvasParentRef) {
    DrawerFactory.p5 = passedP5;

    createCanvas(canvasParentRef);

    populateGrid();
  }

  function drawDots() {
    DrawerFactory.p5.background(255);

    grid.items.forEach((item) => {
      item.show();
    });
  }

  function createCanvas(canvasParentRef) {
    console.log('A* started');
    DrawerFactory.p5.createCanvas(1000, 1000).parent(canvasParentRef);

    width = DrawerFactory.p5.width / columns;
    height = DrawerFactory.p5.height / rows;
  }

  function addNeighbors() {
    grid.callItemsWithGrid('addNeighbors');
  }

  function populateGrid() {
    grid.populate({ spot: Spot, height, width });
    addNeighbors();
    start = grid.getStart();
    openSet.push(start);
    end = grid.getEnd();
  }

  return { draw, setup };
}

export { sketch };
