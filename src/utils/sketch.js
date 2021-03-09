import { Spot } from './Spot';
import { P5Factory } from './P5Factory';
import { removeFromArray, calculatePath, getToCommonItem } from './arrayUtils';
import { drawDot } from './drawUtils';
import { heuristic } from './mathUtils';
import { Grid } from './Grid';

function sketch({ columns = 50, rows = 50, delay = false } = {}) {
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
  let delayTime = 5;

  function resetCost() {
    grid.items.forEach((item) => {
      item.previous = null;
      item.g = 0;
      item.h = 0;
      item.f = 0;
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
    let temporalG = 0;

    neighbors.forEach((neighbor) => {
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        temporalG = current.g + 1;
        let newPath = false;

        if (openSet.includes(neighbor)) {
          if (temporalG < neighbor.g) {
            neighbor.g = temporalG;
            newPath = true;
          }
        } else {
          neighbor.g = temporalG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
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
        if (currentValue.f < previousValue.f) return currentValue;

        if (currentValue.g > previousValue.g) return currentValue;

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
    P5Factory.p5 = passedP5;

    createCanvas(canvasParentRef);

    populateGrid();
  }

  function drawDots() {
    P5Factory.p5.background(255);

    grid.items.forEach((item) => {
      item.show();
    });
  }

  function createCanvas(canvasParentRef) {
    console.log('A* started');
    P5Factory.p5.createCanvas(1000, 1000).parent(canvasParentRef);

    width = P5Factory.p5.width / columns;
    height = P5Factory.p5.height / rows;
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
