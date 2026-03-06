import styles from './BuzzerButton.module.css';

const BuzzerButton = () => {
  return (
    <section className={styles.wrapper}>
      <button className={styles.sphere}>
        <span>
          {' '}
          PRESS THE BIG
          <br />
          ORANGE BUTTON
        </span>
      </button>

      <button className={`${styles.fxSphere} ${styles.sphere}`}>
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
