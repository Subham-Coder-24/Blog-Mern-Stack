import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from './pages/Home'
import Create from './pages/Create'
import Navbar from './component/Navbar'

export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create" element={<Create/>} />
      </Routes>
    </BrowserRouter>
  )
}