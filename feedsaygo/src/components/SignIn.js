
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import FormElement from "./FormElement";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { APP_ID } from "../App";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  
  const signIn = (e) => {
    e.preventDefault();

    Auth.signIn({
      username: email,
      password,
    })
      .then((user) => {
        setEmail("");
        setPassword("");
        //TODO use redux :p this is not good  and unsecure but works for mocking the store
        localStorage.setItem(`${APP_ID}_userdata`, JSON.stringify(user))
        history.push("/feeds")
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form">
      <h3>Sign In</h3>
      <form>
        <FormElement label="Email" forId="sign-in-email">
          <input
            id="sign-in-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </FormElement>
        <FormElement label="Password" forId="sign-in-password">
          <input
            id="sign-in-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </FormElement>
        <div style={{ marginTop: "20px"}}>
          <Button variant="contained" color="secondary" type="submit" onClick={signIn}>
            Log in
          </Button>
        </div>
        
      </form>
    </div>
  );
};

export default SignIn;