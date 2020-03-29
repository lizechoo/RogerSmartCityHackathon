const express = require("express");
const app = express();
const config = require("./config/index");

// const router = express.Router();

const api = require("./routes/api");

app.use("/api", api);
app.use(express.static("public"));

app.listen(3000, () => console.log("Server running on port 3000"));

// app.get("/get_stuff", (req, res) => {
//     res.send("TEST NEW MESSAGE!");
// });
