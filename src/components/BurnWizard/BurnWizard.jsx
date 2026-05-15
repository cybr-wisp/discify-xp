
import { useState } from 'react'
import { searchTracks } from '../../services/lastfm'
import XPWindow from '../XPWindow/XPWindow'
import styles from './BurnWizard.module.css'

function BurnWizard({ username }) {
  const [step, setStep] = useState(1)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [tracks, setTracks] = useState([])
  const [progress, setProgress] = useState(0)
  const [currentBurn, setCurrentBurn] = useState(0)
  const [searching, setSearching] = useState(false)

  async function handleSearch() {
    if (!query.trim()) return
    setSearching(true)
    const res = await searchTracks(query)
    setResults(res)
    setSearching(false)
  }

  function addTrack(track) {
    if (tracks.find(t => t.name === track.name && t.artist === track.artist)) return
    setTracks(prev => [...prev, track])
  }

  function removeTrack(index) {
    setTracks(prev => prev.filter((_, i) => i !== index))
  }

  function startBurn() {
    if (tracks.length === 0) return
    setStep(2)
    setProgress(0)
    setCurrentBurn(0)
    burnNext(0)
  }

  function burnNext(idx) {
    if (idx >= tracks.length) {
      setProgress(100)
      setTimeout(() => setStep(3), 600)
      return
    }
    setCurrentBurn(idx)
    let pct = (idx / tracks.length) * 100
    const interval = setInterval(() => {
      pct += 2
      setProgress(Math.min(pct, ((idx + 1) / tracks.length) * 100))
      if (pct >= ((idx + 1) / tracks.length) * 100) {
        clearInterval(interval)
        setTimeout(() => burnNext(idx + 1), 300)
      }
    }, 60)
  }

  function formatDuration(s) {
    if (!s) return '?:??'
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <XPWindow title="CD Burn Wizard" icon="💿">
      <div className={styles.wizard}>
        <div className={styles.sidebar}>
          <div className={styles.sideDisc}>💿</div>
          <div className={`${styles.step} ${step === 1 ? styles.active : ''}`}>1. Select Music</div>
          <div className={`${styles.step} ${step === 2 ? styles.active : ''}`}>2. Burn</div>
          <div className={`${styles.step} ${step === 3 ? styles.active : ''}`}>3. Complete</div>
        </div>

        <div className={styles.content}>
          {step === 1 && (
            <>
              <h2 className={styles.title}>Select Music</h2>
              <p className={styles.desc}>Search for songs to add to your CD.</p>
              <div className={styles.searchRow}>
                <input
                  className={styles.searchInput}
                  placeholder="Search for music..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
                <button className={styles.searchBtn} onClick={handleSearch}>
                  {searching ? '...' : 'Search'}
                </button>
              </div>

              <div className={styles.resultsBox}>
                {results.length === 0 && <p className={styles.empty}>Search for music above.</p>}
                {results.map((t, i) => (
                  <div key={i} className={styles.resultRow} onClick={() => addTrack(t)}>
                    <span className={styles.resultName}>{t.name}</span>
                    <span className={styles.resultArtist}>{t.artist}</span>
                    <span className={styles.addBtn}>+ Add</span>
                  </div>
                ))}
              </div>

              <h3 className={styles.subtitle}>Selected Tracks ({tracks.length})</h3>
              <div className={styles.selectedBox}>
                {tracks.length === 0 && <p className={styles.empty}>No tracks selected yet.</p>}
                {tracks.map((t, i) => (
                  <div key={i} className={styles.selectedRow}>
                    <span className={styles.trackNum}>{i + 1}.</span>
                    <span className={styles.trackName}>{t.name}</span>
                    <span className={styles.trackArtist}>{t.artist}</span>
                    <span className={styles.removeBtn} onClick={() => removeTrack(i)}>✕</span>
                  </div>
                ))}
              </div>

              <div className={styles.footer}>
                <button className={styles.btn} onClick={() => {}}>Cancel</button>
                <button
                  className={`${styles.btn} ${styles.primary}`}
                  onClick={startBurn}
                  disabled={tracks.length === 0}
                >
                  Next ›
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className={styles.title}>Burning CD...</h2>
              <p className={styles.desc}>Please wait while your CD is being burned.</p>
              <p className={styles.burnTrack}>
                Writing track {currentBurn + 1} of {tracks.length} — {tracks[currentBurn]?.name}
              </p>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
              <p className={styles.pct}>{Math.round(progress)}%</p>
              <div className={styles.burnList}>
                {tracks.map((t, i) => (
                  <div key={i} className={styles.burnRow}>
                    <span>{i + 1}. {t.name} — {t.artist}</span>
                    <span className={styles.burnStatus}>
                      {i < currentBurn ? '✓ Done' : i === currentBurn ? 'Writing...' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className={styles.successWrap}>
                <div className={styles.bigDisc}>💿</div>
                <h2 className={styles.successTitle}>CD Burned Successfully!</h2>
                <p className={styles.desc}>{tracks.length} track{tracks.length !== 1 ? 's' : ''} burned to disc.</p>
                <p className={styles.desc}>Click Finish to eject your CD.</p>
                <div className={styles.footer}>
                  <button className={`${styles.btn} ${styles.primary}`}>Finish</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </XPWindow>
  )
}

export default BurnWizard