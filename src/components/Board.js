import Sketch from 'react-p5';

import { sketch } from 'controllers/sketch';

const { draw, setup } = sketch();

function Board() {
  return <Sketch setup={setup} draw={draw} />;
}

export { Board };
