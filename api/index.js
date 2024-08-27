const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
