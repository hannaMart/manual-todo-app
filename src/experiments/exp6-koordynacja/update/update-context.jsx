import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  fakeFetchPb6UpdateTodos,
  fakeAddPb6Todo,
  resetPb6Todos,
} from "../../../fakeServer/fakeAPI";

// Общий контекст
const TodosContext = createContext(null);

// Provider — загрузка, хранение и обновление server-state
function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    resetPb6Todos();

    fakeFetchPb6UpdateTodos()
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

  // Серверная операция и последующая синхронизация
  async function handleAdd(title) {
    setUpdating(true);
    setError(null);

    try {
      await fakeAddPb6Todo(title);

      const response = await fakeFetchPb6UpdateTodos();

      setTodos(response.todos);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        loading,
        updating,
        error,
        handleAdd,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

// Component A — добавление задачи
function TodoAdd() {
  const { handleAdd, updating } = useContext(TodosContext);

  const [title, setTitle] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle || updating) return;

    await handleAdd(trimmedTitle);

    setTitle("");
  }

  return (
    <div>
      <h3>Component A — Add Todo</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="New todo"
          disabled={updating}
        />

        <button
          type="submit"
          disabled={updating || !title.trim()}
        >
          {updating ? "Updating..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
}

// Component B — полный список задач
function TodoList() {
  const { todos } = useContext(TodosContext);

  return (
    <div>
      <h3>Component B — Todo List</h3>

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

// Component C — количество и статистика
function TodoStats() {
  const { todos } = useContext(TodosContext);

  const completed = todos.filter(
    (todo) => todo.completed
  ).length;

  const active = todos.filter(
    (todo) => !todo.completed
  ).length;

  return (
    <div>
      <h3>Component C — Statistics</h3>

      <p>Total todos: {todos.length}</p>
      <p>Completed: {completed}</p>
      <p>Active: {active}</p>
    </div>
  );
}

// Содержимое страницы
function UpdateContent() {
  const { loading, error } = useContext(TodosContext);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>PB6c — Update (Manual / Context API)</h2>

      {error && <p>Error: {error}</p>}

      <TodoAdd />

      <TodoList />

      <TodoStats />
    </div>
  );
}

// Главный компонент эксперимента
export default function UpdateContext() {
  return (
    <TodosProvider>
      <UpdateContent />
    </TodosProvider>
  );
}