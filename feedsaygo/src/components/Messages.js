import React, { useState, useEffect, Fragment } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from "axios"
import { APP_ID } from "../App";
import { ENDPOINT } from "../config"



const SendSection = () => {
    const [storyText, setStoryText] = useState()
    const sendStory = async (e) => {
        e.preventDefault();
        const userData = JSON.parse(localStorage.getItem(`${APP_ID}_userdata`))
        const response = await axios.post(`${ENDPOINT}/feeds/api/feed`, {
            username: userData.attributes.name,
            text: storyText,
            date: (new Date()).toDateString()
        },{
            headers: {
                accessToken: userData.signInUserSession.accessToken.jwtToken
            }
        })

        
    }

    return (
        <Fragment >
           

                <div style={{ marginTop: "20px"}}>How are you feeling today?</div>
                <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        defaultValue=""
                        variant="outlined"
                        onChange={(e) => setStoryText(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={sendStory}>
                        Send
                    </Button>
                </div>

                
        </Fragment>
    )
}


export default SendSection
