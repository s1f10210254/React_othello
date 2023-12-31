import styles from './Cell.module.css';
export const Cell = (props: { color: number; onClick: () => void }) => {
  return (
    <div className={styles.cell} onClick={props.onClick}>
      {props.color !== 0 && (
        <div className={styles.stone} style={{ background: props.color === 1 ? '#000' : '#fff' }} />
      )}
      {props.color === 3 && <div className={styles.inditate} />}
    </div>
  );
};
