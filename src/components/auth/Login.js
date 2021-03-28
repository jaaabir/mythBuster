/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/quiz");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  const imgStyle = {
    borderRadius: "50%",
    width: "150px",
    height: "150px",
  };

  const buttonStyle = css`
    width: 100%;
    background-color: #30409e;
    color: white;
    border: 0;
    padding: 8px 15px;
    border-radius: 3px;
    margin-top: 10px;
  `;

  // width: '100%', backgroundColor: '#30409E

  const center = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <Card className="col-md-12" style={{ height: "90vh" }}>
      <CardContent>
        <div className="card card-container" style={center}>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
            style={imgStyle}
          />

          <Form onSubmit={handleLogin} ref={form}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
                style={{ width: "95%" }}
              />

              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
                style={{ width: "95%" }}
              />

              <button css={buttonStyle} disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>LOGIN</span>
              </button>

              <div style={{ width: "100%", marginTop: "10px" }}>
                <Link to="/register">
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    style={{ width: "100%" }}
                  >
                    SIGN UP
                  </Button>
                </Link>
              </div>

              {/* <div style={{width: '100%', marginTop: '10px'}}>
                <Button variant="contained" color="primary" disabled={loading} style={{ width :'100%'}}>
                  Login
                </Button>
              </div>
               */}

              <div style={{ width: "100%", marginTop: "10px" }}>
                <Link to="/quiz">
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    style={{ width: "100%" }}
                  >
                    Join as guest
                  </Button>
                </Link>
              </div>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
