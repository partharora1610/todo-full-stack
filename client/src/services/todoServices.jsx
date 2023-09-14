// // How to get access of the auth context here
// import { tokenLoader } from "../util/checkAuth";

// export const getAllTodos = async () => {
//   const token = tokenLoader();
//   const response = await fetch("http://localhost:3000/todos", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + token,
//     },
//   });

//   const data = await response.json();
//   console.log(data);
// };

// export const deleteTodo = async () => {
//   const token = tokenLoader();
//   const response = await fetch("http://localhost:3000/todos", {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + token,
//     },
//   });

//   const data = await response.json();
//   console.log(data);
// };

// export const updateTodo = async () => {
//   const token = tokenLoader();
//   const response = await fetch("http://localhost:3000/todos", {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + token,
//     },
//   });

//   const data = await response.json();
//   console.log(data);
// };
