import React, { useState } from "react";
import { Auth } from "aws-amplify";
import FormElement from "./FormElement";
import Button from '@material-ui/core/Button';


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [code, setCode] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    
    Auth.signUp({ username: email, password, attributes: { email, name: email } })
      .then((data) => {
        setWaitingForCode(true);
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmSignUp = (e) => {
    e.preventDefault();

    Auth.confirmSignUp(email, code)
      .then((data) => {
        setWaitingForCode(false);
        setEmail("");
        setCode("");
      })
      .catch((err) => console.log(err));
  };

  const resendCode = () => {
    Auth.resendSignUp(email)
      .then(() => {
        console.log("code resent successfully");
      })
      .catch((e) => {
        console.log(e);
      });//
  };

  return (
    <div className="form">
      <h3>Sign Up</h3>
      {!waitingForCode && (
        <form>
          <FormElement label="Email" forId="sign-up-email">
            <input
              id="sign-up-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </FormElement>
          <FormElement label="Password" forId="sign-up-email">
            <input
              id="sign-up-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </FormElement>
          <div style={{ marginTop: "20px"}}>
          <Button variant="contained" color="secondary" type="submit" onClick={signUp}>
            Sign up
          </Button>
        </div>
        </form>
      )}
      {waitingForCode && (
        <form>
          <FormElement label="Confirmation Code" forId="sign-up-code">
            <input
              id="sign-up-code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="code"
            />
          </FormElement>
          <Button variant="contained" color="secondary" type="submit" onClick={confirmSignUp}>
            Confirm Sign up
          </Button>
          <Button variant="contained" type="button" onClick={resendCode}>
            Resend code
          </Button>
        </form>
      )}
    </div>
  );
};

export default SignUp;