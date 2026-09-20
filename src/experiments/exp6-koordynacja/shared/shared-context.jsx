import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { fakeFetchPb6Todos } from "../../../fakeServer/fakeAPI";

// Создаём общий контекст
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

// Дочерний компонент получает данные из Context
function TodoList({ title }) {
  const { todos, loading, error } = useContext(TodosContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>{title}</h3>

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

// Главный компонент эксперимента
export default function SharedContext() {
  return (
    <div>
      <h2>PB6a — Shared (Manual / Context API)</h2>

      <TodosProvider>
        <TodoList title="Component A" />
        <TodoList title="Component B" />
      </TodosProvider>
    </div>
  );
}