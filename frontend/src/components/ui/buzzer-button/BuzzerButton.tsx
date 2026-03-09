import styles from './BuzzerButton.module.css';

{
  /* Simply 3d hover & active animations */
}
{
  /*
   <button className={styles.sphere}>
        <span>
          {' '}
          PRESS THE BIG
          <br />
          ORANGE BUTTON
        </span>
      </button>
      {/* Plain ring animation on active */
}
{
  /* <button className={`${styles.fxSphere} ${styles.sphere}`}>
        <span>
          {' '}
          PRESS THE BIG
          <br />
          ORANGE BUTTON
        </span>
      </button> */
}

{
  /* WINNER! Fiery ring animation on active */
}
const BuzzerButton = () => {
  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.buttonShell}>
          <div className={styles.rim}>
            <span className={styles.rimShadow}></span>
          </div>

          <button className={`${styles.sphere} ${styles['fxSphere--fire']}`}>
            <span>
              {' '}
              PRESS THE BIG
              <br />
              ORANGE BUTTON
            </span>
          </button>
        </div>
      </section>
    </>
  );
};

export default BuzzerButton;
