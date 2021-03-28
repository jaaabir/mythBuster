/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect } from "react";
import React from 'react';
import style from "./style";
import stylesheet from "react-jss";
import ThemeBar from "../themebar";
import { blue } from '../../contants'
import { Button } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';


const Quiz = ({ isAuthenticated, classes }) => {
    const accessKey = "AIzaSyBqbXZZHYtsnKpalrbMCV4dCjCYtU07Y0I";
    const size = "100";
    const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&pageSize=${size}&query=covid&key=${accessKey}`;

    const axios = require("axios");
    const [claims, setClaims] = useState([]);
    const random = () => Math.floor(Math.random() * (parseInt(size) - 0 + 1) + 0);
    const [bgColor, setBgColor] = useState('')
    const { container, wrapper, qsnContainer, btnStyle} = classes
    const [num, setNum] = useState(random());
    const [prevNum, setPrevNum] = useState(10);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState(null);
    const { gradient, btnContainer } = style
  
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

        setQuestion(claims[num]?.text);

    };

    useEffect(async() => {
        await  axios
            .get(url)
            .then((res) => {
                const claims = res.data.claims;
                setClaims(claims);
                setQuestion(claims[num]?.text);
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


    const bgStyle =  css`
            animation: ${gradient} 10s ease infinite;
            background-size: 400% 400%;
            background-image: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
            // background-image: linear-gradient(-45deg, ${bgColor})
   
    `

    return (
        <div css={[bgStyle, base]}>
          
            <div style={{ position: "relative" }}>
                <ThemeBar selectedColor={setBgColor} />
            </div>
            {claims.length ? (
                <div className={wrapper} >
                    <div className={container}>
                        <p className={qsnContainer}>
                            {question}
                        </p>
                    
                        <div css={btnContainer}>
                         
                            <button id="True" name="True" onClick={checkAnswer} className={btnStyle}>
                                true
                            </button>
                            <button id="False" name="False" onClick={checkAnswer} className={btnStyle}>
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
                            <div className="text">yes you are right</div>
                        ) : null}

                        {result === "wrong" ? (
                            <div className="text">nope you are wrong</div>
                        ) : null}
                    </div>
                </div>
            ) :
                <div className={wrapper} style={{ justifyContent:'center'}}>
                <CircularProgress size="3rem" variant="indeterminate" color="inherit" />
            </div>}
        </div>
    );
};

export default stylesheet(style)(Quiz);