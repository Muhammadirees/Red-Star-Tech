import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../features/todos/todosSlice";

export const TodoForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target?.name;
    const value = e.target?.value;

    setFormData((form) => ({ ...form, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createTodo({
        title: formData.title,
        description: formData.description,
      })
    );
    setFormData({
      title: "",
      description: "",
    });
  };
  return (
    <form
      className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto"
      onSubmit={onSubmitHandler}
    >
      <input
        type="text"
        onChange={onChangeHandler}
        value={formData.title}
        name="title"
        placeholder="Enter Title"
        className="px-3 py-2 w-full border-2"
      />
      <textarea
        name="description"
        onChange={onChangeHandler}
        value={formData.description}
        placeholder="Enter Description"
        className="px-3 py-2 w-full border-2"
      ></textarea>
      <button type="submit" className="bg-orange-700 px-11 py-3 text-white hover:bg-orange-800">
        Add Todo
      </button>
    </form>
  );
};
