import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sketch from 'react-p5';

import { sketch } from 'controllers/sketch';

import styles from './Board.module.css';

const { draw, setup } = sketch();

function Board() {
  return (
    <div className={styles.container}>
      <Sketch className={styles.canvasContainer} draw={draw} setup={setup} />
      <div className={styles.links}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/luca-leiva-gonzalez/"
        >
          <FontAwesomeIcon
            className={styles.icon}
            icon={['fab', 'linkedin']}
            aria-hidden="true"
          />
          <span className={styles.hidden}>LinkedIn Profile</span>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/eleleiva"
        >
          <FontAwesomeIcon
            className={styles.icon}
            icon={['fab', 'github']}
            aria-hidden="true"
          />
          <span className={styles.hidden}>GitHub Profile</span>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/eleleiva/path-finder"
        >
          <FontAwesomeIcon
            className={styles.icon}
            icon="code"
            aria-hidden="true"
          />
          <span className={styles.hidden}>GitHub Repository</span>
        </a>
      </div>
    </div>
  );
}

export { Board };
