

import { useEffect, useState } from 'react'
import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkce'

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
const SCOPES = 'playlist-read-private playlist-read-collaborative streaming'

export function useSpotifyAuth() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const storedVerifier = localStorage.getItem('pkce_verifier')

    if (code && storedVerifier) {
      exchangeToken(code, storedVerifier)
      window.history.replaceState({}, '', '/')
    }
  }, [])

  async function exchangeToken(code, verifier) {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: verifier,
      }),
    })
    const data = await res.json()
    if (data.access_token) {
      setToken(data.access_token)
      localStorage.removeItem('pkce_verifier')
    }
  }

  async function login() {
    const verifier = generateCodeVerifier()
    const challenge = await generateCodeChallenge(verifier)
    localStorage.setItem('pkce_verifier', verifier)

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
      code_challenge_method: 'S256',
      code_challenge: challenge,
    })

    window.location = `https://accounts.spotify.com/authorize?${params}`
  }

  return { token, login }
}