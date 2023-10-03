/* eslint-disable react/prop-types */
import { useState } from "react";

const Todo = ({ done, title }) => {
  const [completed, setCompleted] = useState(done);

  const handleCheckboxChange = () => {
    // now we have to make an api call here to save the changes in the datasbase
    setCompleted(!completed);
  };

  return (
    <div
      className={` px-2 py-2 border-b-2 ${
        completed ? "bg-gray-100 text-slate-500 cursor-pointer " : "bg-white"
      }`}
    >
      <div className="flex gap-4 w-1/2  justify-start py-1">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
          className="w-6 h-6 rounded-full"
        />
        <div className={`todo-details flex ${completed ? "line-through" : ""}`}>
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Todo;
