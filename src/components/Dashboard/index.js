import React, { useState, useEffect } from "react";

import Form from "../Form";
import TodoList from "../TodoList";
import axios from "axios";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchingTodos = async () => {
      const allTodos = await axios.get(
        "https://todoapp-3on8.onrender.com/api/todos"
      );
      setTodos(allTodos.data.sort((a, b) => a.position - b.position));
    };
    fetchingTodos();
  }, []);

  const handleAddTodo = async (newTodo) => {
    const newTodos = await axios.post(
      "https://todoapp-3on8.onrender.com/api/todos",
      {
        ...newTodo,
        position: todos.length,
      }
    );

    setTodos((e) =>
      [...e, newTodos.data].sort((a, b) => a.position - b.position)
    );
  };

  const handleToggleTodo = async ({ id, completed, index }) => {
    const updatedTodos = await axios.put(
      `https://todoapp-3on8.onrender.com/api/todos/${id}/update-status`,
      {
        completed,
      }
    );
    const n = [...todos];
    n.splice(index, 1, updatedTodos.data);
    setTodos(n);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Todo Dashboard</h1>

      <Form onAddTodo={handleAddTodo} />

      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        setTodos={setTodos}
      />
    </div>
  );
};

export default Dashboard;
