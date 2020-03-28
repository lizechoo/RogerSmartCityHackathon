const express = require("express");
const app = express();

const router = express.Router();

app.get("/", (req, res) => {
    res.send("TEST NEW MESSAGE!");
});
app.listen(3000, () => console.log("Server running on port 3000"));

router.get("/get_stuff", (req, res) => {
    console.log("/get_stuff endpoint called");
    res.send({
        message: "endpoint called"
    });
});
