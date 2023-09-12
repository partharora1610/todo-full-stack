import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import Todo from "../components/Todo";

const HomePage = () => {
  const [todo, setTodo] = useState("");
  const [todoValid, setTodoValid] = useState(false);
  const todoCtx = useContext(TodoContext);

  const todoChangeHandler = (e) => {
    setTodo(e.target.value);

    if (e.target.value.length >= 4) {
      setTodoValid(true);
    }
  };

  const todoCreateHandler = (e) => {
    e.preventDefault();

    const newTodo = { title: todo, date: new Date() };

    if (todoValid) {
      todoCtx.onCreate(newTodo);
    }

    setTodo("");
  };

  return (
    <>
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

      <div className="max-w-4xl	m-auto border-slate-600 border-2 flex flex-col gap-4">
        {todoCtx.todos.map((todo) => {
          return <Todo key={todo._id} {...todo}></Todo>;
        })}
      </div>
    </>
  );
};

export default HomePage;
