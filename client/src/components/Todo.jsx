/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

const Todo = ({ done, title }) => {
  const todoCtx = useContext(TodoContext);
  const [completed, setCompleted] = useState(done);

  const handleCheckboxChange = () => {
    setCompleted(!completed);
    // also send an api call here to update the same in the backend
    todoCtx.onUpdate();
    // Here the backend will toggle the done status in the Todo
  };

  return (
    <div
      className={`todo-item ${
        completed ? "completed" : ""
      } bg-slate-300 rounded px-6 py-2`}
    >
      <div className="flex gap-4 align-center w-1/2 m-auto">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        <div className={`todo-details flex ${completed ? "line-through" : ""}`}>
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Todo;
