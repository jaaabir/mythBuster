/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";
import style from "./style";
import stylesheet from "react-jss";
import ThemeBar from "../themebar";
import { blue } from "../../contants";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const Quiz = ({ isAuthenticated, classes }) => {
  const accessKey = "AIzaSyBqbXZZHYtsnKpalrbMCV4dCjCYtU07Y0I";
  const size = "100";
  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&pageSize=${size}&query=covid&key=${accessKey}`;

  const axios = require("axios");
  const [claims, setClaims] = useState([]);
  const random = () => Math.floor(Math.random() * (parseInt(size) - 0 + 1) + 0);
  const [bgColor, setBgColor] = useState("");
  const { container, wrapper, qsnContainer, btnStyle } = classes;
  const [num, setNum] = useState(random());
  const [prevNum, setPrevNum] = useState(10);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const { gradient, btnContainer } = style;

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

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (claims[num]) {
      const ans = getAns(claims[num]?.claimReview[0].textualRating);
      setAnswer(ans);
    }
  }, [question]);

  const bgStyle = css`
    animation: ${gradient} 10s ease infinite;
    background-size: 400% 400%;
    background-image: linear-gradient(
      -45deg,
      #ee7752,
      #e73c7e,
      #23a6d5,
      #23d5ab
    );
    // background-image: linear-gradient(-45deg, ${bgColor})
  `;

  const questionStyle = {
    fontSize: "20px",
    letterSpacing: "1.5px",
  };

  const scoreStyle = {
    position: "absolute",
    right: "5px",
    top: "100px",
    border: "2px solid white",
    borderRadius: "20px",
    width: "90px",
    height: "90px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  };

  return (
    <div css={[bgStyle, base]}>
      <div className="score" style={scoreStyle}>
        <h1>{score}</h1>
      </div>
      <div style={{ position: "relative" }}>
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
              <div className={container}>
                <h4>yes you are right</h4>
              </div>
            ) : null}

            {result === "wrong" ? (
              <div className={container}>
                <h4>nope you are wrong</h4>
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

export default stylesheet(style)(Quiz);
