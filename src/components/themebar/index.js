/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import {
  green,
  blue,
  orange,
  pink,
  grey,
  lightPink,
  lightBlue,
  red,
} from "../../contants";

const ThemeBar = ({ selectedColor }) => {
  const themes = [lightPink, lightBlue, pink, blue, green, orange, red, grey];

  const container = {
    padding: "10px",
    position: "absolute",
    backdropFilter: "blur(2em)",
    backgroundColor: "rgba(255, 255, 255, .5)",
    borderRadius: "10px",
    right: "1rem",
    top: "10rem",
  };
  return (
    <div>
      <div style={container}>
        {themes.map((color) => {
          return (
            <div
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${color})`,
                animation: "gradient 5s ease infinite",
                height: "45px",
                borderRadius: "50%",
                border: "1px solid white",
                margin: "10px 0px",
                width: "45px",
                transition: "all 0.3s ease",
              }}
              onClick={() => selectedColor(color)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeBar;

// style={{ backgroundImage: `linear-gradient(to right, ${color})`}}
