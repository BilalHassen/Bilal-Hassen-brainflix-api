const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

app.listen(8080, () => {
  console.log("App is running on http://localhost:8080");
});
