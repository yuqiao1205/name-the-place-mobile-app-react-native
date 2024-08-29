// const express = require("express");
// const bodyParser = require("body-parser");
// const simple = require("./routes/vision.js");

// const app = express();
// const PORT = 8000;
// const cors = require("cors");

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;
const cors = require("cors");

const router = require("./routes/router.js");

// mount the routes
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Mount the router
app.use("/api", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
