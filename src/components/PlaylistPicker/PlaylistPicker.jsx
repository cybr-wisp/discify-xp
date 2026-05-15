
import { useEffect, useState } from 'react'
import { getPlaylists, getPlaylistTracks } from '../../services/spotify'
import XPWindow from '../XPWindow/XPWindow'
import styles from './PlaylistPicker.module.css'

function PlaylistPicker({ token }) {
  const [playlists, setPlaylists] = useState([])
  const [tracks, setTracks] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPlaylists(token).then(data => {
      setPlaylists(data)
      setLoading(false)
    })
  }, [token])

  async function handlePickPlaylist(playlist) {
    setSelected(playlist)
    setTracks([])
    const t = await getPlaylistTracks(token, playlist.id)
    setTracks(t)
  }

  function formatDuration(ms) {
    const m = Math.floor(ms / 60000)
    const s = Math.floor((ms % 60000) / 1000)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className={styles.desktop}>
      <XPWindow title="Select Playlist" icon="📁">
        <div className={styles.listBox}>
          {loading && <p className={styles.hint}>Loading playlists...</p>}
          {playlists.map(p => (
            <div
              key={p.id}
              className={`${styles.item} ${selected?.id === p.id ? styles.active : ''}`}
              onClick={() => handlePickPlaylist(p)}
            >
              <span className={styles.itemIcon}>💿</span>
              <span className={styles.itemName}>{p.name}</span>
              <span className={styles.itemCount}>{p.tracks.total} tracks</span>
            </div>
          ))}
        </div>
      </XPWindow>

      {selected && (
        <XPWindow title={`${selected.name} — Tracklist`} icon="🎵">
          <div className={styles.tracklist}>
            {tracks.length === 0 && <p className={styles.hint}>Loading tracks...</p>}
            {tracks.map((track, i) => (
              <div key={track.id} className={styles.trackRow}>
                <span className={styles.trackNum}>{i + 1}</span>
                <div className={styles.trackInfo}>
                  <span className={styles.trackName}>{track.name}</span>
                  <span className={styles.trackArtist}>{track.artists[0].name}</span>
                </div>
                <span className={styles.trackDur}>{formatDuration(track.duration_ms)}</span>
              </div>
            ))}
          </div>
        </XPWindow>
      )}
    </div>
  )
}

export default PlaylistPicker