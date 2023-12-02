import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  function loginFunc(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, mail, password)
      .then((data) => {
        if (data.user) {
          history.push("/");
        }
      })
      .catch((error) => {
        const err =
          error.message +
          " Oops ,Something went wrong ,Try again with correct Email and Password";
        setError(err.slice(38));
        setPassword("");
        setMail("");
      });
  }

  return (
    <LoginContainer>
      <div>
        <img src="./Logo.svg" alt="logo" />
      </div>

      <LoginBox>
        <Title>
          <h2>Log-In</h2>
        </Title>

        <form onSubmit={loginFunc}>
          <Email>
            <h4>Email or phone number</h4>
            <input
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </Email>
          <Password>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Password>
          <button onClick={loginFunc}>Continue</button>
          <h5>{error}</h5>
        </form>
      </LoginBox>

      <Linebreak>
        <h5>New to amazon?</h5>
      </Linebreak>

      <CreateAccountbtn>
        <Link to="/Signup">
          <button>Create new account</button>
        </Link>
      </CreateAccountbtn>
    </LoginContainer>
  );
}

export default Login;

//styles

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  height: 100vh;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    object-fit: contain;
    height: 100px;
    width: 80px;
  }
`;
const LoginBox = styled.div`
  border-radius: 5px;
  border: 1px solid lightgrey;
  width: 350px;
  height: 300px;
  background-color: white;
  padding: 5px;
  button {
    font-family: Arial, Helvetica, sans-serif;

    border-radius: 5px;
    margin-top: 20px;
    height: 35px;
    width: 308px;
    border: 1px solid grey;
    background-color: #f1c659;
  }
  h5 {
    color: red;
    max-width: 300px;
  }
`;
const Title = styled.div`
  margin-right: 240px;
  h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 100;
  }
`;
const Email = styled.div`
  margin-top: -30px;
  h4 {
    transform: translateY(10px);
    margin-right: 163px;
    font-size: 13px;
  }
  input {
    outline: none;
    border-radius: 5px;
    width: 300px;
    height: 30px;
    border: 1px solid grey;
    &:focus {
      box-shadow: rgba(233, 191, 7, 0.911) 0 0 2px 3px;
    }
  }
`;
const CreateAccountbtn = styled.div`
  margin-top: -35px;
  button {
    border-radius: 5px;
    width: 350px;
    padding-top: 10px;
    padding-bottom: 10px;
    border: 1px solid grey;

    &:hover {
      background-color: #dfe2e8;
    }
  }
`;
const Linebreak = styled.div`
  margin-top: 30px;

  h5 {
    font-size: 13px;
    transform: translateY(-31px);
    position: relative;
    z-index: 1;
    background-color: white;
    color: #a3a1a1;

    padding-left: 10px;
    padding-right: 10px;
  }
  &::after {
    content: "";
    height: 1px;
    background-color: lightgrey;
    width: 350px;
    position: absolute;
  }
`;
const Password = styled.div`
  margin-top: 20px;
  input {
    outline: none;
    border-radius: 5px;
    width: 300px;
    height: 30px;
    border: 1px solid grey;
    &:focus {
      box-shadow: rgba(233, 191, 7, 0.911) 0 0 2px 3px;
    }
  }
`;
