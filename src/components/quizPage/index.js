/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";
import style from "./style";
import stylesheet from "react-jss";
import ThemeBar from "../themebar";
import { red } from "../../contants";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import wrong from "../../assets/icons/wrong.png";
import { Navbar } from "../../components/navbar";
import { consumer } from "../../context/consumer";
import UserService from "../../services/user.service";

const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));
const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));

const Quiz = ({ isAuthenticated, classes, dataContext }) => {
  const { orderEntries, setReturnOrderEntries } = dataContext;
  const accessKey = "AIzaSyBqbXZZHYtsnKpalrbMCV4dCjCYtU07Y0I";
  const size = "100";
  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&pageSize=${size}&query=covid&key=${accessKey}`;
  const API_URL = "http://localhost:4000";

  const axios = require("axios");
  const [claims, setClaims] = useState([]);
  const random = () => Math.floor(Math.random() * (parseInt(size) - 0 + 1) + 0);
  const [bgColor, setBgColor] = useState(red);
  const { container, wrapper, qsnContainer, btnStyle } = classes;
  const [num, setNum] = useState(random());
  const [prevNum, setPrevNum] = useState(10);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const { gradient, btnContainer, themeBar, scoreStyle, icon } = style;
  const [reason, setReason] = useState("");

  const getAns = (textualRating) => {
    const ans = textualRating.toLowerCase();
    const isTrue = ans.includes("true");

    return isTrue ? "True" : "False";
  };

  const base = {
    height: "100vh",
    // backgroundImage: `linear-gradient(to right, ${bgColor})`,
  };

  const checkAnswer = (e) => {
    if (result === null) {
      if (e.target.name === answer) {
        setScore((prevScore) => prevScore + 10);
        setResult("correct");
      } else {
        setScore((prevScore) => prevScore - 5);
        setResult("wrong");
      }
    }
  };

  const nextQuestion = () => {
    setResult(null);
    setPrevNum(num);
    let rand = random();

    while (rand === prevNum) {
      rand = random();
    }

    setNum(rand);

    setQuestion(claims[num]?.text);
    // setReason(claims[num]?.claimReview[0].title)
  };

  const getItems = async () => {
    await axios
      .get(url)
      .then((res) => {
        const claims = res.data.claims;
        setClaims(claims);
        setQuestion(claims[num]?.text);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getLeaderBoard = async () => {
    await axios
      .get(`${API_URL}/api/leaderboard/`)
      .then((res) => {
        setReturnOrderEntries(res.data);
        console.log("resp--", orderEntries);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getScore = async (username) => {
    const leaderboard = await UserService.getLeaderBoard()
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // const username = getLocalStorage("username") || "";
    // setUsername(uname);

    if (username !== "") {
      let sc;
      leaderboard.map((users) => {
        if (users.username === username) {
          sc = users.score;
        }
      });

      if (sc === undefined || sc === NaN) setScore(0);
      else setScore(sc);
    }
  };

  useEffect(() => {
    getItems();
    getLeaderBoard();
  }, []);

  useEffect(() => {
    const username = getLocalStorage("username") || "";
    getScore(username);
  }, []);

  useEffect(() => {
    const username = getLocalStorage("username") || "";
    UserService.setNewScore(username, score);
  }, [score]);

  useEffect(() => {
    if (claims[num]) {
      const ans = getAns(claims[num]?.claimReview[0].textualRating);
      //  setReason(claims[num]?.claimReview[0].title)
      setAnswer(ans);
      // console.log("claims[num]--", claims[num])
    }
  }, [question]);

  const bgStyle = css`
    animation: ${gradient} 9s ease infinite;
    background-size: 400% 400%;
    // background-image: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-image: linear-gradient(-45deg, ${bgColor});
  `;

  const questionStyle = {
    fontSize: "1rem",
    letterSpacing: "1.5px",
    textAlign: "center",
  };

  return (
    <div css={[bgStyle, base]}>
      <div css={scoreStyle}>
        <h1>{score}</h1>
      </div>
      <div style={{ position: "relative" }} css={themeBar}>
        <ThemeBar selectedColor={setBgColor} />
      </div>
      {claims.length ? (
        <div className={wrapper}>
          <div className={container} data-aos="fade-up">
            <h3 className={qsnContainer} style={questionStyle}>
              {question}
            </h3>

            <div css={btnContainer}>
              <button
                id="True"
                name="True"
                onClick={checkAnswer}
                className={btnStyle}
              >
                true
              </button>
              <button
                id="False"
                name="False"
                onClick={checkAnswer}
                className={btnStyle}
              >
                false
              </button>
              <Button name="next" onClick={nextQuestion}>
                {" "}
                next{" "}
              </Button>
            </div>
          </div>
          <div className="result">
            {result === "correct" ? (
              <div css={icon}>
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
            ) : null}

            {result === "wrong" ? (
              <div>
                <div css={icon}>
                  <img src={wrong} style={{ width: "100%" }} />
                  {/* <h4>nope you are wrong</h4> */}
                </div>
                <h4>{reason}</h4>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className={wrapper} style={{ justifyContent: "center" }}>
          <CircularProgress
            size="3rem"
            variant="indeterminate"
            color="inherit"
          />
        </div>
      )}
    </div>
  );
};

export default stylesheet(style)(consumer(Quiz));
