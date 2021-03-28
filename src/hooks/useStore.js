import create from "zustand";
import { useState } from "react";
const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));

export const useStore = () => {
  const [username, setUsername] = useState("");
  const [score, setscore] = useState(getLocalStorage("score") || 0);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  return [
    username,
    (uname) => setUsername(uname),
    isAuthenticated,
    (auth) => setisAuthenticated(auth),
  ];
};

// export const useStore = create((set) => ({
//   username: "",
//   score: getLocalStorage("score") || 0,
//   isAuthenticated: false,

//   setUsername: (uname) => {
//     set((state) => ({
//       username: uname,
//     }));
//   },

//   setScore: (score) => {
//     set((state) => ({
//       score: score,
//     }));
//   },

//   setIsAuthenticated: (auth) => {
//     set((state) => ({
//       isAuthenticated: auth,
//     }));
//   },

//   saveScore: () =>
//     set((state) => {
//       setLocalStorage("score", state.score);
//     }),
// }));
