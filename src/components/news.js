import React, { useState, useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

export const News = ({ isAuthenticated }) => {
  const accessKey = "AIzaSyBqbXZZHYtsnKpalrbMCV4dCjCYtU07Y0I";
  const size = "100";
  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&pageSize=${size}&query=covid&key=${accessKey}`;

  const [claims, setClaims] = useState([]);
  const random = () => Math.floor(Math.random() * (parseInt(size) - 0 + 1) + 0);
  const [num, setNum] = useState(random());
  const [prevNum, setPrevNum] = useState(10);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  const getAns = (textualRating) => {
    const ans = textualRating.toLowerCase();
    const isTrue = ans.includes("true");

    return isTrue ? "True" : "False";
  };

  const checkAnswer = (e) => {
    if (result === null) {
      e.target.name === answer ? setResult("correct") : setResult("wrong");
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
    setQuestion(claims[num].text);
  };

  useEffect(async () => {
    await axios
      .get(url)
      .then((res) => {
        const claims = res.data.claims;
        setClaims(claims);
        setQuestion(claims[num].text);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (claims[num]) {
      const ans = getAns(claims[num]?.claimReview[0].textualRating);
      setAnswer(ans);
    }
  }, [question]);

  return (
    <>
      {claims.length ? (
        <>
          <div className="news">
            <pre>{question}</pre>
          </div>

          <div className="action">
            <button id="True" name="True" onClick={checkAnswer}>
              true
            </button>
            <button id="False" name="False" onClick={checkAnswer}>
              false
            </button>
            <Button name="next" onClick={nextQuestion}>
              {" "}
              next{" "}
            </Button>
          </div>

          <div className="result">
            {result === "correct" ? (
              <div className="text">yes you are right</div>
            ) : null}

            {result === "wrong" ? (
              <div className="text">nope you are wrong</div>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
};
