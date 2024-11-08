import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home"
import Student from "./pages/Student"
import Class from "./pages/Class"
import Fee from "./pages/Fee"
import Teacher from "./pages/Teacher"
import Subject from "./pages/Subject"
import StudentForm from "./pages/StudentForm";
import ClassForm from "./pages/ClassForm";
import FeeForm from "./pages/FeeForm";
import EditStudent from "./pages/EditStudent";
import Dashboard from "./pages/Dashboard";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Student />} />
        <Route path="/classes" element={<Class />} />
        <Route path="/fees" element={<Fee />} />
        <Route path="/teachers" element={<Teacher />} />
        <Route path="/subjects" element={<Subject />} />
        <Route path="/add-student" element={<StudentForm />} />
        <Route path="/add-class" element={<ClassForm />} />
        <Route path="/add-fee" element={<FeeForm />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
