import { library } from '@fortawesome/fontawesome-svg-core';

import { icons } from 'assets/icons';
import { Board } from 'components/Board';

library.add(icons);

function App() {
  return <Board />;
}

export { App };
