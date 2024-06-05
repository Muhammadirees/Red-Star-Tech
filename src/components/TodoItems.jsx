import React from "react";
import { useDispatch } from "react-redux";
import { editTodo, removeTodo } from "../features/todos/todosSlice";

const TodoItems = ({ id, itemId, title, description, completed }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(
      editTodo({
        id,
        title,
        description,
        completed: !completed,
      })
    );
  };

  const handleDelete = () => {
    dispatch(removeTodo(id));
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition-all duration-1000">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {itemId + 1}
      </th>
      <td scope="col" className={`px-6 py-3 ${completed ? "line-through" : ""}`}>
        {title}
      </td>
      <td scope="col" className={`px-6 py-3 ${completed ? "line-through" : ""}`}>
        {description}
      </td>
      <td className="px-6 py-4 transition-all duration-1000 delay-300">{completed ? "completed" : "pending"}</td>
      <td className="px-6 py-4 flex gap-2">
        <button className="py-2 px-4 bg-red-500 text-white" onClick={handleDelete}>
          Delete
        </button>
        {completed ? (
          " "
        ) : (
          <button className="py-2 px-4 bg-green-500 text-white" onClick={handleToggle}>
            Done
          </button>
        )}
      </td>
    </tr>
  );
};

export default TodoItems;
