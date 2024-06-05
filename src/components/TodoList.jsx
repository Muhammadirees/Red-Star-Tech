import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, selectTodos, selectStatus } from "../features/todos/todosSlice";
import TodoItems from "./TodoItems";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (status === "loading") {
    return <div className="text-center font-bold text-2xl mt-5">Loading...</div>;
  }

  return (
    <section className="relative overflow-x-auto mt-24 w-[60%] mx-auto mb-12">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className={`px-6 py-3`}>
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="transition-all duration-1000">
          {todos.map((todo, index) => (
            <TodoItems key={todo.id} {...todo} itemId={index} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TodoList;
