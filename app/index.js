const express = require("express");
const app = express();
const config = require("./config/index");

// const router = express.Router();
app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.send("TEST NEW MESSAGE!");
// });

app.listen(3000, () => console.log("Server running on port 3000"));

const Pusher = require("pusher");

const pusher = new Pusher({
    appId: config.pusher.appId,
    key: config.pusher.key,
    secret: config.pusher.secret,
    cluster: config.pusher.cluster,
    useTLS: config.pusher.useTLS,
});

pusher.trigger("my-channel", "my-event", {
    location: "Intersection at Granville St &  W Broadway",
    img: undefined,
    incidentType: "Vehicle Collision",
    victims: "Vehicle - Vehicle",
    severity: 5,
    isResponderDispatched: "Yes",
    time: new Date().toString(),
});

// router.get("/get_stuff", (req, res) => {
//     console.log("/get_stuff endpoint called");
//     res.send({
//         message: "endpoint called"
//     });
// });
