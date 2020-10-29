const socketio = require("socket.io")
const cors = require("cors")
const express = require('express')
const CognitoExpress = require("cognito-express");
const DB = require("./database")
const bodyParser = require("body-parser");

const app = express()
const authRouter = express.Router();
const port = 9000
const cognitoExpress = new CognitoExpress({
    region: "us-west-2",
    cognitoUserPoolId: "us-west-2_7CAjk0hnW",
    tokenUse: "access",
    tokenExpiration: 3600000
});

/** Middlewares */
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/feeds/api", authRouter)
app.use((req, res, next) => {
    res.setHeader("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Controll-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");

    const accessTokenFromClient = req.headers["accesstoken"]
    if(!accessTokenFromClient) return res.status(401).send("Access token missing from header");
    if (req.method !== 'OPTIONS') {
        cognitoExpress.validate(accessTokenFromClient, function (err, response){
            if (err) {
                return res.status(401).send(err);
            }
            else {
                next()
            }
        })
    }
    
});

authRouter.get("/", (req, res) => {
  res.send('Hello World!')
  
})


const server = app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

//sockets connection
const io = socketio(server)

io.on("connection", (socket) => {
    io.emit("USER_EMMIT", DB.users + 1);
    DB.users += 1

    socket.on("disconnect", socket => {
        console.log("disconnected")
        io.emit("USER_EMMIT", DB.users - 1);
        DB.users -= 1
    })
});


authRouter.post("/feed", (req, res) => {
    const body = req.body;
    
    DB.feeds = [ body, ...DB.feeds]

    io.emit("FEED_EMMIT", {
        text: body.text,
        username: body.username,
        date: body.date
    })
    res.status(200).send()
})


authRouter.get("/feed", (req, res) => {
    res.status(200).send(DB.feeds);
})





