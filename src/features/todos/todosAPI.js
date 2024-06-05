import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export const fetchTodosFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const todos = [];
    querySnapshot.forEach((doc) => {
      todos.push({ id: doc.id, ...doc.data() });
    });
    return todos;
  } catch (error) {
    console.log(error);
  }
};

export const addTodoToFirestore = async (todo) => {
  const docRef = await addDoc(collection(db, "todos"), {
    title: todo.title,
    description: todo.description,
    completed: false,
  });
  return { id: docRef.id, ...todo, completed: false };
};

export const updateTodoInFirestore = async (id, updatedTodo) => {
  const todoRef = doc(db, "todos", id);
  await updateDoc(todoRef, updatedTodo);
  return { id, ...updatedTodo };
};

export const deleteTodoFromFirestore = async (id) => {
  await deleteDoc(doc(db, "todos", id));
};
