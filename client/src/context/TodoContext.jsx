/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

export const TodoContext = React.createContext({
  todos: [],
  onCreate: () => {},
  onUpdate: () => {},
});

const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    { _id: 1, title: "TODO 1", done: false },
    { _id: 2, title: "TODO 2", done: false },
    { _id: 3, title: "TODO 3", done: false },
  ]);

  useEffect(() => {
    getTodoHandler();
  }, []);

  const getTodoHandler = () => {
    fetch("/getroute")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodos();
      });
  };

  const createTodoHandler = (newTodo) => {
    setTodos((prev) => {
      return [newTodo, ...prev];
    });
  };

  const updateTodoHandler = () => {};

  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        onCreate: createTodoHandler,
        onUpdate: updateTodoHandler,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
