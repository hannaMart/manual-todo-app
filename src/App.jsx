import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import TodosPage from "./pages/TodosPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

export default function App() {
  return (
    <div className="page">
      <h2>Experiment 1b — manual</h2>
      {/* NavLink выполняет навигацию и изменяет URL, тогда как маршрутизатор интерпретирует текущий путь и определяет, какой компонент должен быть отрисован. */}
      <nav className="nav">
        <NavLink to="/">/todos</NavLink>
        <NavLink to="/about">/about</NavLink>
      </nav>

      {/* Компонент (TodosPage) — это описание / функция компонента, а не отрисованный элемент.

JSX-элемент (<TodosPage />) — это конкретный экземпляр компонента, который React может смонтировать.при совпадении маршрута должен быть создан и отрисован конкретный экземпляр компонента */}
      <Routes>
        <Route path="/" element={<TodosPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}
