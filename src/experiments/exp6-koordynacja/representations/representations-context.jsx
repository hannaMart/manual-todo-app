import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { fakeFetchPb6Todos } from "../../../fakeServer/fakeAPI";

// Общий контекст
const TodosContext = createContext(null);

// Provider загружает и хранит серверные данные
function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fakeFetchPb6Todos()
      .then((response) => {
        setTodos(response.todos);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <TodosContext.Provider value={{ todos, loading, error }}>
      {children}
    </TodosContext.Provider>
  );
}

// Component A — полный список задач
function TodoList() {
  const { todos } = useContext(TodosContext);

  return (
    <div>
      <h3>Component A — Todo List</h3>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} — {todo.completed ? "Done" : "Active"}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component B — общее количество задач
function TodoTotal() {
  const { todos } = useContext(TodosContext);

  return (
    <div>
      <h3>Component B — Total</h3>

      <p>Total todos: {todos.length}</p>
    </div>
  );
}

// Component C — статистика задач
function TodoStats() {
  const { todos } = useContext(TodosContext);

  const completed = todos.filter((todo) => todo.completed).length;
  const active = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <h3>Component C — Statistics</h3>

      <p>Completed: {completed}</p>
      <p>Active: {active}</p>
    </div>
  );
}

// Содержимое страницы — находится внутри Provider
function RepresentationsContent() {
  const { loading, error } = useContext(TodosContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>PB6b — Representations (Manual / Context API)</h2>

      <TodoList />
      <TodoTotal />
      <TodoStats />
    </div>
  );
}

// Главный компонент эксперимента
export default function RepresentationsContext() {
  return (
    <TodosProvider>
      <RepresentationsContent />
    </TodosProvider>
  );
}