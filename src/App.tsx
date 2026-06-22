import { Dashboard } from './components/Dashboard'
import { WebSocketProvider } from './context/SocketContext'
import { Toaster } from 'sonner'
import { Notifications } from './components/Notifications'
import './App.css'

const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://raspberrypi:8000/api/dashboard';

function App() {

  return (
    <WebSocketProvider url={WS_URL}>
      <Notifications/>
      <Dashboard></Dashboard>
      <Toaster theme="dark"/>    
    </WebSocketProvider>
  )
}

export default App
