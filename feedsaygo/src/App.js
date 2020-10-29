import React, { useEffect } from "react";
import Amplify from "aws-amplify";
import Router from "./components/Router"

import 'fontsource-roboto';
import SocketClient from "./components/SocketClient";

export const APP_ID = "feedsaygo";

const App = () => {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    });

    return () => {
      SocketClient.disconnect()
    }
  }, []);  
  return (

    <div className="App">
      <Router />
    </div>
  );
};export default App;