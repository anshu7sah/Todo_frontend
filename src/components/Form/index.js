import React, { useState } from "react";

const Form = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic can be added here

    // Call the parent component's function to add the todo
    onAddTodo({ title, link });

    // Reset form fields
    setTitle("");
    setLink("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter title"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="link"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Link:
        </label>
        <input
          type="text"
          id="link"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter link"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Add Todo
      </button>
    </form>
  );
};

export default Form;
