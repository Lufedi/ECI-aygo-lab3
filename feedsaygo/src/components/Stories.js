import React, { Fragment } from "react"
import FeedCard from "./FeedCard"

const Stories = ({
    feeds
}) => {

    return (
        <Fragment>
            {
                feeds.map((feed, i) => <FeedCard 
                    key={`${i}${feed.username}${feed.text}${feed.date}`}
                    username={feed.username}
                    text={feed.text}
                    date={feed.date}
                />)
            }
        </Fragment>

    )
}

export default Stories