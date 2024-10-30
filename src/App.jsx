import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Student from "./pages/Student"
import Class from "./pages/Class"
import Fee from "./pages/Fee"

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Student />} />
        <Route path="/classes" element={<Class />} />
        <Route path="/fees" element={<Fee />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
