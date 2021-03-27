import React, { useState, useEffect } from "react";
import axios from "axios";

export const News = ({ isAuthenticated }) => {
  const [news, setNews] = useState([]);
  const [num, setNum] = useState(0);
  const [limited, setLimited] = useState(false);

  const accessKey = "ac889c73ab4e4d32b0b6b637f57e293c";
  const date = "2021-02-27";
  const search = "covid";
  const url = `https://newsapi.org/v2/everything?q=${search}&from=${date}&sortBy=popularity&apiKey=${accessKey}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const articles = res.data.articles;
        setNews(articles);
        console.log(articles);
      })
      .catch((error) => {
        console.log(error);
        setLimited(true);
      });
  }, []);

  return (
    <>
      {news && num < news.length ? (
        <>
          <div className="news">
            <pre>title : {JSON.stringify(news[num].title)}</pre>
            <pre>description : {JSON.stringify(news[num].description)}</pre>
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
