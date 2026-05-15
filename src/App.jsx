import { useState } from 'react'
import Login from './components/Login/Login'
import BurnDialog from './components/BurnDialog/BurnDialog'
import BurnWizard from './components/BurnWizard/BurnWizard'
import './index.css'

function App() {
  const [screen, setScreen] = useState('login')
  const [username, setUsername] = useState('')

  return (
    <div>
      {screen === 'login' && (
        <Login onLogin={(u) => { setUsername(u); setScreen('burn-dialog') }} />
      )}
      {screen === 'burn-dialog' && (
        <BurnDialog onYes={() => setScreen('burn-wizard')} />
      )}
      {screen === 'burn-wizard' && (
        <BurnWizard username={username} />
      )}
    </div>
  )
}

export default App