
import XPWindow from '../XPWindow/XPWindow'
import styles from './Login.module.css'

function Login() {
  function handleLogin() {
    alert('Spotify login coming Day 4!')
  }

  return (
    <XPWindow title="Discify — Welcome">
      <div className={styles.container}>
        <div className={styles.disc}>💿</div>
        <h1 className={styles.heading}>Discify</h1>
        <p className={styles.sub}>Turn your Spotify playlists into mix CDs</p>
        <button
          className={styles.loginBtn}
          onClick={handleLogin}
        >
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
            alt="Spotify"
            className={styles.spotifyLogo}
          />
          Login with Spotify
        </button>
      </div>
    </XPWindow>
  )
}

export default Login