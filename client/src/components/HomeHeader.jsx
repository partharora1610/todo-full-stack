import { useEffect, useState } from "react";
import { getNext7Dates, getPrev7Dates } from "../util/date";

const HomeHeader = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [activeDay, setActiveDay] = useState(new Date().toDateString());

  useEffect(() => {
    const next7Days = getNext7Dates(new Date());
    setSelectedDays(next7Days);
  }, []);

  const dayClickHandler = (e) => {
    setActiveDay(e.target.value);
  };

  const prevClickHandler = () => {
    const firstDate = selectedDays[0];
    const prev7Days = getPrev7Dates(firstDate);
    setSelectedDays(prev7Days.reverse());
  };

  const nextClickHandler = () => {
    const lastDate = selectedDays[selectedDays.length - 1];
    console.log(lastDate);
    const next7Days = getNext7Dates(lastDate);
    console.log(next7Days);
    setSelectedDays(next7Days);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-slate-50 px-12 py-4">
        <button onClick={prevClickHandler}>PREV</button>
        {selectedDays.map((d) => {
          return (
            <button
              onClick={dayClickHandler}
              key={d}
              value={d}
              className={`bg-white text-slate-500 cursor-pointer px-4 py-2 rounded-md border-2 ${
                activeDay == d
                  ? "bg-indigo-100 border-indigo-700 text-indigo-700"
                  : ""
              }`}
            >
              {d.toDateString()}
            </button>
          );
        })}
        <button onClick={nextClickHandler}>NEXT</button>
      </div>
    </>
  );
};

export default HomeHeader;

// const dateComponent = (day) => {
//   return (
//     <>
//       <div className="bg-slate-500">{day}</div>
//     </>
//   );
// };

/**
 * What we need to do
 * We will get todos then we need to filter them and create a data structure based
 */
