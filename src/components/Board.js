import Sketch from 'react-p5';
import { sketch } from '../utils/sketch';

const columns = 50;
const rows = 50;
const { draw, setup } = sketch({ columns, rows });

function Board() {
  return <Sketch setup={setup} draw={draw} />;
}

export { Board };
