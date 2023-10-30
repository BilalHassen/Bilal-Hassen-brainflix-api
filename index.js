const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const videoRoutes = require("./routes/videos");

app.use(cors());
app.use(express.json());

app.use("/videos", videoRoutes);

app.get("/", (req, res) => {
  res.send("<h1>server homepage</h1>");
});

app.listen(8080, () => {
  console.log("App is running on http://localhost:8080");
});
