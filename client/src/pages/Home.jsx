/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import Todo from "../components/Todo";
import { AuthContext } from "../context/AuthContext";
import HomeHeader from "../components/HomeHeader";

const HomePage = () => {
  // FORM STATES
  const [todo, setTodo] = useState("");
  const [todoValid, setTodoValid] = useState(false);

  // CONTEXTS
  const todoCtx = useContext(TodoContext);
  const authCtx = useContext(AuthContext);

  // TODO CHANGE HANDLER
  const todoChangeHandler = (e) => {
    setTodo(e.target.value);

    if (e.target.value.length >= 4) {
      setTodoValid(true);
    }
  };

  // TODO CREATE HANDLER
  const todoCreateHandler = (e) => {
    e.preventDefault();
    const newTodo = { title: todo, date: new Date() };

    if (todoValid) {
      todoCtx.onCreate(newTodo);
    }

    setTodo("");
  };

  useEffect(() => {
    // GET ALL TODOS
    fetch("http://localhost:3000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <>
      <HomeHeader />

      <form onSubmit={todoCreateHandler}>
        <div className="flex items-center justify-center">
          <input
            onChange={todoChangeHandler}
            type="text"
            className="rounded py-2 px-4 w-1/3 mb-10"
            placeholder="Add a task"
            value={todo}
          />
        </div>
      </form>

      {todoCtx.todos.length != 0 ? (
        <div className="max-w-4xl	m-auto border-slate-600 border-2 flex flex-col gap-4">
          {todoCtx.todos.map((todo) => {
            return <Todo key={todo._id} {...todo}></Todo>;
          })}
        </div>
      ) : (
        "Loading Todos"
      )}
    </>
  );
};

export default HomePage;
