import { useState, useEffect } from "react";
import style from "./style";
import stylesheet from "react-jss";
import ThemeBar from "../themebar";
import { blue} from '../../contants'

const Quiz = ({ isAuthenticated, classes }) => {
  const axios = require("axios");
  const [claims, setClaims] = useState([]);
  const [num, setNum] = useState(0);
   const [bgColor, setBgColor] = useState(blue)
   const {  container, noMargin} = classes

  const accessKey = "AIzaSyBqbXZZHYtsnKpalrbMCV4dCjCYtU07Y0I";
  const size = "100";

  // const url = `https://newsapi.org/v2/everything?q=${search}&from=${date}&apiKey=${accessKey}`;
  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&pageSize=${size}&query=covid&key=${accessKey}`;

  const base = {
    height: "100vh",
    backgroundImage: `linear-gradient(to right, ${bgColor})`,
  };

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const claims = res.data.claims;
        setClaims(claims);
        console.log("resp.data--", res.data.claims);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={base} className="quiz">
      <div style={{ position: "relative" }}>
        <ThemeBar selectedColor={setBgColor} />
      </div>
      {claims.length ? (
        <div>
          <div className={container}>
            <p className={noMargin}>
              title : {JSON.stringify(claims[num].text)}
            </p>
            <p className={noMargin}>
              RESULT:{" "}
              {JSON.stringify(claims[num]?.claimReview[0].textualRating)}
            </p>
            <p className={noMargin}>
              Description : {JSON.stringify(claims[num]?.claimReview[0].title)}
            </p>
          </div>

          <div className="action">
            <button onClick={() => setNum((prevNum) => prevNum + 1)}>
              {" "}
              next{" "}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default stylesheet(style)(Quiz);
