import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import SelectRole from "./pages/SelectRole";
import Student from "./pages/Student";
import Faculty from "./pages/Faculty";
import Admin from "./pages/Admin";
import Visitor from "./pages/Visitor";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Welcome />} />

        <Route path="/select" element={<SelectRole />} />

        <Route path="/student" element={<Student />} />

        <Route path="/faculty" element={<Faculty />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/visitor" element={<Visitor />} />

       <Route path="/select" element={<SelectRole/>}/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;