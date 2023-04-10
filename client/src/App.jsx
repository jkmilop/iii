import TaskForm from "./components/TaskForm";
import TasksList from "./components/TasksList";
import RegistroCliente from "./components/RegistroCliente";

import Menu from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Menu /><br />
      <Container>
        <Routes>
          <Route index path="/" element={<RegistroCliente />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id/edit" element={<TaskForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
