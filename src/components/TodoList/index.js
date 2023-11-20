import React, { useRef } from "react";
import axios from "axios";

const TodoList = ({ todos, onToggleTodo, setTodos }) => {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = async (id, index) => {
    const updated = await axios.put(
      `https://todoapp-3on8.onrender.com/api/todos/${id}/update-position`,
      {
        newPosition: dragOverItem.current,
      }
    );

    // const draggeditemContent = _todos.splice(dragItem.current, 1)[0];
    // _todos.splice(dragOverItem.current, 0, draggeditemContent);
    // _todos.splice(dragItem.current, 1, updated.data);
    // const _updated = _todos.sort((a, b) => a.position - b.position);
    // console.log(_updated);
    // dragItem.current = null;
    // dragOverItem.current = null;

    setTodos(updated.data.sort((a, b) => a.position - b.position));
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Todo List</h2>

      {todos.map((todo, index) => (
        <div
          key={index}
          className={`flex items-center mb-2 ${
            todo.completed ? "line-through text-gray-500" : ""
          } cursor-move`}
          draggable
          onDragStart={(e) => (dragItem.current = index)}
          onDragEnter={(e) => (dragOverItem.current = index)}
          onDragEnd={() => handleSort(todo._id)}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              onToggleTodo({
                id: todo._id,
                completed: todo.completed ? false : true,
                index,
              })
            }
            className="mr-2"
          />
          <div>
            <p className="font-medium">{todo.title}</p>
            <a
              href={todo.link}
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              {todo.link}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
