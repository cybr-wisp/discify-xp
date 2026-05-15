import styles from './XPWindow.module.css'

function XPWindow({ title, children, icon = '💿' }) {
  return (
    <div className={styles.window}>
      <div className={styles.titlebar}>
        <div className={styles.titleLeft}>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.controls}>
          <button className={styles.btn}>_</button>
          <button className={styles.btn}>□</button>
          <button className={`${styles.btn} ${styles.close}`}>✕</button>
        </div>
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  )
}

export default XPWindow