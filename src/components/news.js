import React, { useState, useEffect } from "react";

export const News = ({ isAuthenticated }) => {

  const axios = require('axios');
  const [claims, setClaims] = useState([]);
  const [num, setNum] = useState(0);

  const accessKey = "AIzaSyBqbXZZHYtsnKpalrbMCV4dCjCYtU07Y0I";
  const size ='100'

  // const url = `https://newsapi.org/v2/everything?q=${search}&from=${date}&apiKey=${accessKey}`;
  const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=en&pageSize=${size}&query=covid&key=${accessKey}`


  useEffect( async() => {
  await  axios
      .get(url)
      .then((res) => {
        const claims = res.data.claims;
        setClaims(claims);
        console.log("resp.data--", res.data.claims)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>
      {claims.length ? (
        <>
          <div className="news">
            <pre>title : {JSON.stringify(claims[num].text)}</pre>
            <pre>RESULT: {JSON.stringify(claims[num]?.claimReview[0].textualRating)}</pre>
            <pre>Description : {JSON.stringify(claims[num]?.claimReview[0].title)}</pre>
          </div>

          <div className="action">
            <button onClick={() => setNum((prevNum) => prevNum + 1)}>
              {" "}
              next{" "}
            </button>
          </div>
        </>
      ) : null}  
    </>
  );
};
