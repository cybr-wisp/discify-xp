
import XPWindow from '../XPWindow/XPWindow'
import styles from './BurnDialog.module.css'

function BurnDialog({ onYes }) {
  return (
    <XPWindow title="Burn CD" icon="🔥">
      <div className={styles.container}>
        <div className={styles.row}>
          <span className={styles.cdIcon}>💿</span>
          <p className={styles.question}>Do you want to burn the CD?</p>
        </div>
        <div className={styles.divider} />
        <div className={styles.buttons}>
          <button className={`${styles.btn} ${styles.yes}`} onClick={onYes}>
            Yes
          </button>
          <button className={styles.btn}>No</button>
        </div>
      </div>
    </XPWindow>
  )
}

export default BurnDialog