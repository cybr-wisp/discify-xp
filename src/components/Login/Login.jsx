import { useState } from 'react'
import XPWindow from '../XPWindow/XPWindow'
import styles from './Login.module.css'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')

  function handleSubmit() {
    if (username.trim()) onLogin(username.trim())
  }

  return (
    <XPWindow title="Discify — Welcome">
      <div className={styles.container}>
        <div className={styles.disc}>💿</div>
        <h1 className={styles.heading}>Discify</h1>
        <p className={styles.sub}>Turn your favourite songs into a mix CD</p>
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            placeholder="Enter your Last.fm username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        <button className={styles.loginBtn} onClick={handleSubmit}>
          Let's Go →
        </button>
        <p className={styles.hint}>Don't have one? <a href="https://last.fm/join" target="_blank" rel="noreferrer">Sign up free</a></p>
      </div>
    </XPWindow>
  )
}

export default Login