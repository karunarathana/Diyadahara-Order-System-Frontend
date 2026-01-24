import { BrowserRouter, Route, Routes } from "react-router-dom"
import Broker from "./Pages/broker/Broker"

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Broker/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
