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

  //

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

      <div className="ml-12 mr-12">
        {/* I am rendering todos here... */}
        {todoCtx.todos.length != 0 ? (
          <div className="max-w-full flex flex-col gap-0">
            {todoCtx.displayTodos.map((todo) => {
              return <Todo key={todo._id} {...todo}></Todo>;
            })}
          </div>
        ) : (
          "Loading Todos"
        )}
        <form onSubmit={todoCreateHandler}>
          <div className="max-w-full flex flex-col gap-0 mt-6">
            <input
              onChange={todoChangeHandler}
              type="text"
              className="rounded py-2 px-4 border-b-2"
              placeholder="Add a task"
              value={todo}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default HomePage;
