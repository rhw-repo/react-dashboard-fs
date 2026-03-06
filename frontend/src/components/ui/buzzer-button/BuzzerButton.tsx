import styles from './BuzzerButton.module.css';

const BuzzerButton = () => {
  return (
    <section className={styles.wrapper}>
      <button className={styles.sphere}>
        PRESS THE BIG
        <br />
        ORANGE BUTTON
      </button>
    </section>
  );
};

export default BuzzerButton;
