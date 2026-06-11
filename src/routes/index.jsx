import Todo from "../todo";
import { Routes, Route } from "react-router-dom";
import Project from "../projects/index";
export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/todo" element={<Todo />} />
      <Route path="/projects" element={<Project />} />
    </Routes>
  );
}