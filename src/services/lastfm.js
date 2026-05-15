
const API_KEY = import.meta.env.VITE_LASTFM_API_KEY
const BASE = 'https://ws.audioscrobbler.com/2.0/'

async function call(params) {
  const url = new URL(BASE)
  url.search = new URLSearchParams({
    ...params,
    api_key: API_KEY,
    format: 'json',
  })
  const res = await fetch(url)
  return res.json()
}

export async function searchTracks(query) {
  const data = await call({ method: 'track.search', track: query, limit: 10 })
  return data.results?.trackmatches?.track || []
}

export async function getTrackInfo(artist, track) {
  const data = await call({ method: 'track.getInfo', artist, track })
  return data.track || null
}