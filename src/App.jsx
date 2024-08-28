import { useContext } from 'react'
import Main from './components/Layout'
import { Login } from './pages'
import { AuthContext } from './context/AuthContext'

function App() {
  const { isAuth } = useContext(AuthContext)
  return isAuth ? <Main /> : <Login />
}

export default App
