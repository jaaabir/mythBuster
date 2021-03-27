import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Home = ({ setAuthenticated }) => {
  const news = "/news";
  const signup = "/login";

  const flexCOl = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div>
      <div className="action" style={flexCOl}>
        <Link to={news}>play anonymous</Link>
        <Link to={signup}>sign in</Link>
      </div>
    </div>
  );
};
