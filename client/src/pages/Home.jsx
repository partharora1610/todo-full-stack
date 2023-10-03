/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { AuthContext } from "../context/AuthContext";

import Todo from "../components/Todo";
import HomeHeader from "../components/HomeHeader";

const HomePage = () => {
  // FORM STATES
  const [todo, setTodo] = useState("");
  const [todoValid, setTodoValid] = useState(false);

  // CONTEXTS
  const todoCtx = useContext(TodoContext);
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  // TODO CHANGE HANDLER
  const todoChangeHandler = (e) => {
    setTodo(e.target.value);

    if (e.target.value.length >= 3) {
      setTodoValid(true);
    }
  };

  // TODO CREATE HANDLER
  const todoCreateHandler = (e) => {
    e.preventDefault();
    const newTodo = {
      title: todo,
      date: new Date(),
      done: false,
      userId: authCtx.loggedUser._id,
    };

    if (todoValid) {
      console.log("Todo valid ");
      // SEDNING THE API REQUEST HERE...
      fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.token,
        },

        body: JSON.stringify(...newTodo),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });

      // Adding the same in the state here...
      console.log(newTodo);
      todoCtx.onCreate(newTodo);
    }

    setTodo("");
  };

  useEffect(() => {
    console.log(authCtx.token);

    fetch("http://localhost:3000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("TODOS");
        console.log(data);
      });
  }, []);

  return (
    <>
      <HomeHeader />

      <div className="ml-12 mr-12">
        {todoCtx.todos.length != 0 ? (
          <div className="max-w-full flex flex-col gap-0">
            {todoCtx?.displayTodos.map((todo) => {
              return <Todo key={todo._id} {...todo}></Todo>;
            })}
          </div>
        ) : (
          ""
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

/**
 * When signup
 * Update all the states
 * Send an api request
 * save the token
 *
 * when Logout
 * update all thee states
 * unsave the token from the local storage
 *
 */
