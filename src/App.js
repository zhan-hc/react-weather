import './App.scss'
import City from './pages/city/index'
import Home from './pages/home/index'
import { HashRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={Home} />
        <Route path="/city" element={City} />
      </Routes>
    </HashRouter>
  )
}

export default App
