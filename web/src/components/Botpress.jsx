import { Fab, Webchat } from '@botpress/webchat'
import { useState } from 'react'

function App() {
  const [isWebchatOpen, setIsWebchatOpen] = useState(false)
  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState)
  }
  return (
    <>
      <Webchat
        clientId="4d14de22-f55b-4066-a69e-a9973e1b282c" // Your client ID here
        style={{
          width: '400px',
          height: '600px',
          display: isWebchatOpen ? 'flex' : 'none',
          position: 'fixed',
          bottom: '90px',
          right: '20px',
        }}
      />
      <Fab onClick={() => toggleWebchat()} style={{ position: 'fixed', bottom: '20px', right: '20px' }} />
    </>
  )
}

export default App