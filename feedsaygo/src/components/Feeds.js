import React, { useState, useEffect } from "react";
import Stories from "./Stories"
import SendSection from "./Messages"
import socketClient from "./SocketClient"
import axios from "axios";
import { ENDPOINT } from "../config";


const Feeds = () => {
    
    const [feeds, setFeeds] = useState([])

    useEffect(() => {
        socketClient.on("FEED_EMMIT", data => {
            setFeeds(feedsList => [ data, ...feedsList ])
        })
    }, [])

    useEffect(async () => {
        const response = await axios.get(`${ENDPOINT}/feeds/api/feed`)
        const { data } = response
        if(data && data.length > 0) {
            setFeeds(data)
        }
        
    }, [])

    return (
    <div style={{ display: "flex", 
        alignItems: "center",
        flexDirection: "column", width: "100%"}}> 
        <SendSection />
        <Stories feeds={feeds}/>
        </div>
    )
}

export default Feeds