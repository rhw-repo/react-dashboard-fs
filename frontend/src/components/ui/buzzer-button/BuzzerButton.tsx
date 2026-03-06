import styles from './BuzzerButton.module.css';

const BuzzerButton = () => {
  return (
    <section className={styles.wrapper}>
      {/* Simply 3d hover & active animations */}
      <button className={styles.sphere}>
        <span>
          {' '}
          PRESS THE BIG
          <br />
          ORANGE BUTTON
        </span>
      </button>
      {/* Plain ring animation on active */}
      <button className={`${styles.fxSphere} ${styles.sphere}`}>
        <span>
          {' '}
          PRESS THE BIG
          <br />
          ORANGE BUTTON
        </span>
      </button>
      {/* WINNER! Fiery ring animation on active */}
      <button className={`${styles.sphere} ${styles['fxSphere--fire']}`}>
        <span>
          {' '}
          PRESS THE BIG
          <br />
          ORANGE BUTTON
        </span>
      </button>
    </section>
  );
};

export default BuzzerButton;
