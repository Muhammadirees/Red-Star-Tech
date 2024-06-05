import { toast } from "react-toastify";

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTodosFromFirestore,
  addTodoToFirestore,
  updateTodoInFirestore,
  deleteTodoFromFirestore,
} from "./todosAPI";

const initialState = {
  todos: [],
  status: "idle",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
      state.status = "idle";
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setTodos, addTodo, updateTodo, deleteTodo, setStatus } = todosSlice.actions;

export const fetchTodos = () => async (dispatch) => {
  dispatch(setStatus("loading"));
  const todos = await fetchTodosFromFirestore();
  dispatch(setTodos(todos));
};

export const createTodo = (todo) => async (dispatch) => {
  const newTodo = await addTodoToFirestore(todo);
  dispatch(addTodo(newTodo));
  toast.success("Added Todos");
};

export const editTodo =
  ({ id, title, description, completed }) =>
  async (dispatch) => {
    const updatedTodo = await updateTodoInFirestore(id, { title, description, completed });
    dispatch(updateTodo(updatedTodo));
    toast.success("Updated Todos");
  };

export const removeTodo = (id) => async (dispatch) => {
  await deleteTodoFromFirestore(id);
  dispatch(deleteTodo(id));
  toast.success("Deleted Todos");
};

export const selectTodos = (state) => state.todos.todos;
export const selectStatus = (state) => state.todos.status;

export default todosSlice.reducer;
