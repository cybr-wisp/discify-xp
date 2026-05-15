
const BASE = 'https://api.spotify.com/v1'

async function get(url, token) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

export async function getPlaylists(token) {
  const data = await get(`${BASE}/me/playlists?limit=20`, token)
  return data.items
}

export async function getPlaylistTracks(token, playlistId) {
  const data = await get(`${BASE}/playlists/${playlistId}/tracks?limit=50`, token)
  return data.items.map(item => item.track).filter(Boolean)
}