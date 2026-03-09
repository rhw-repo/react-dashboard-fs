import styles from './BuzzerButton.module.css';

const BuzzerButton = () => {
  return (
    <>
      <section className={styles.buttonWrapper}>
        <div className={styles.buttonShell}>
          <div className={styles.buttonRim}>
            <span className={styles.buttonRimShadow}></span>
          </div>

          <button className={`${styles.buttonTop} ${styles['buttonTop--fire']}`}>
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
