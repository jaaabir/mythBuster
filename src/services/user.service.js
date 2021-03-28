import axios from "axios";

const API_URL = "http://localhost:4000/api/";

const setNewScore = (username, score) => {
  console.log(username, score);
  return axios.post(API_URL + "leaderboard", {
    username: username,
    score: score,
  });
};

const getLeaderBoard = () => {
  return axios.get(API_URL + "leaderboard");
};

export default {
  setNewScore,
  getLeaderBoard,
};
