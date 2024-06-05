import React from "react";
import { TodoForm } from "../components/TodoForm";
import TodoList from "../components/TodoList";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <main className="mt-10">
      <ToastContainer theme="dark" pauseOnFocusLoss={false} />

      <TodoForm />
      <TodoList />
    </main>
  );
};

export default Home;
