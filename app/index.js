const express = require("express");
const app = express();

// const router = express.Router();
app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.send("TEST NEW MESSAGE!");
// });

app.listen(3000, () => console.log("Server running on port 3000"));

const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "971587",
    key: "8a8448593705331f8283",
    secret: "f362ffdac8b6be9b6c29",
    cluster: "us3",
    encrypted: true
});

pusher.trigger("my-channel", "my-event", {
    message: "hello world"
});

// router.get("/get_stuff", (req, res) => {
//     console.log("/get_stuff endpoint called");
//     res.send({
//         message: "endpoint called"
//     });
// });
