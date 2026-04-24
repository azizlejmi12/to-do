import { useEffect, useState } from "react";
import { addTodo, fetchTodos, removeTodo, toggleTodo } from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    try {
      const newTodo = await addTodo(title.trim());
      setTodos((prev) => [newTodo, ...prev]);
      setTitle("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      const updated = await toggleTodo(id);
      setTodos((prev) => prev.map((todo) => (todo._id === id ? updated : todo)));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="app">
      <div className="card">
        <h1>Todo List MERN</h1>

        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ajouter une tache"
          />
          <button type="submit">Ajouter</button>
        </form>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p>Chargement...</p>
        ) : todos.length === 0 ? (
          <p>Aucune tache pour le moment.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo._id}>
                <button
                  className={todo.completed ? "todo-text completed" : "todo-text"}
                  onClick={() => handleToggle(todo._id)}
                  type="button"
                >
                  {todo.title}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(todo._id)}
                  type="button"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default App;
