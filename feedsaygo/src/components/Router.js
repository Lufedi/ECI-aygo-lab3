import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Feeds from "./Feeds";
import Menu from "./Menu";
import { APP_ID } from "../App";


const SecuredRoute = ({ children }) => {
  const accessToken = localStorage.getItem(`${APP_ID}_userdata`);
  const history = useHistory()

  if(!accessToken || accessToken == "") {
    history.push("/")
  } 
  
  return <Route>
    {children}
  </Route>

}

export default function App() {
    
  return (
    <Router>
      <div>
        <Menu  />
      <div style={{ margin: "0% 10%", display: "flex", flexDirection: "column", alignItems: "center"}}>

          <Switch>
            <SecuredRoute path="/feeds">
              <Feeds />
            </SecuredRoute>
            <Route path="/users">
              <SignUp/>
            </Route>
            <Route path="/">
              <SignIn />
            </Route>
          </Switch>
            </div>
      </div>
    </Router>
  )
}