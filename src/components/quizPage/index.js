import { useState, useEffect } from "react";
import style from "./style";
import stylesheet from "react-jss";
import ThemeBar from "../themebar";
import { blue } from '../../contants'
import { Button } from "@material-ui/core";


const Quiz = ({ isAuthenticated, classes }) => {
    const accessKey = "AIzaSyBqbXZZHYtsnKpalrbMCV4dCjCYtU07Y0I";
    const size = "100";
    const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&pageSize=${size}&query=covid&key=${accessKey}`;

    const axios = require("axios");
    const [claims, setClaims] = useState([]);
    const random = () => Math.floor(Math.random() * (parseInt(size) - 0 + 1) + 0);
    const [bgColor, setBgColor] = useState(blue)
    const { container, noMargin } = classes
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


    const base = {
        height: "100vh",
        backgroundImage: `linear-gradient(to right, ${bgColor})`,
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

    useEffect(async() => {
        await  axios
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
        <div style={base} className="quiz">
            <div style={{ position: "relative" }}>
                <ThemeBar selectedColor={setBgColor} />
            </div>
            {claims.length ? (
                <div>
                    <div className={container}>
                        <p className={noMargin}>
                            {question}
                        </p>

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
                </div>
            ) : null}
        </div>
    );
};

export default stylesheet(style)(Quiz);