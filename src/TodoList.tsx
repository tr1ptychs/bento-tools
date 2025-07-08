import { useState, useEffect } from "react";
import TodoItem from "./TodoItem.tsx";

type Todo = {
  id: string;
  text: string;
  checked: boolean;
};

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: newTodo.trim(), checked: false },
    ]);
    setNewTodo("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      addTodo();
    }
  }

  function handleToggle(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }

  function handleDelete(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={newTodo}
          className="p-2"
          placeholder="Add a new Task"
          onChange={(event) => setNewTodo(event.target.value)}
          onKeyDown={(event) => handleKeyDown(event)}
        ></input>
        <button
          className="text-center p-3 m-1 inline border-2 border-sky-200"
          onClick={addTodo}
        >
          Add
        </button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="mt-3">
              <TodoItem
                todo={todo.text}
                checked={todo.checked}
                onToggle={() => handleToggle(todo.id)}
                onDelete={() => handleDelete(todo.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default TodoList;
