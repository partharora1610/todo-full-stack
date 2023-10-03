/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useSyncExternalStore } from "react";

export const TodoContext = React.createContext({
  todos: [],
  displayTodos: [],
  activeDay: "",
  onUpdateString: () => {},
  onCreate: () => {},
  onUpdate: () => {},
});

const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    // { _id: 1, title: "TODO 1", done: true, date: new Date() },
    // { _id: 2, title: "TODO 2", done: false, date: new Date() },
    // { _id: 3, title: "TODO 3", done: false, date: new Date() },
    // {
    //   _id: 4,
    //   title: "Todo 4",
    //   done: true,
    //   date: new Date("Wed Sep 14 2023 23:17:08 GMT+0530 (India Standard Time)"),
    // },
    // {
    //   _id: 5,
    //   title: "Todo 4",
    //   done: false,
    //   date: new Date("Wed Sep 14 2023 23:17:08 GMT+0530 (India Standard Time)"),
    // },
    // {
    //   _id: 6,
    //   title: "Todo 5",
    //   done: false,
    //   date: new Date("Wed Sep 15 2023 23:17:08 GMT+0530 (India Standard Time)"),
    // },
  ]);

  const [todoString, setTodoString] = useState(new Date().toDateString());

  const displayTodos = todos.filter(
    (todo) => todo.date.toDateString() === todoString
  );

  const createTodoHandler = (newTodo) => {
    setTodos((prev) => {
      return [...prev, newTodo];
    });
  };

  const updateTodoHandler = () => {};

  const updateTodoStringHandler = (string) => {
    setTodoString(string);
  };

  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        activeDay: todoString,
        displayTodos: displayTodos,
        onUpdateString: updateTodoStringHandler,
        onCreate: createTodoHandler,
        onUpdate: updateTodoHandler,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
