// require("./src/config/db");
require("dotenv").config();
require("./src/config/cloudinary");
const { connectDB } = require("./src/config/db");
const { setError } = require("./src/config/error");
const { indexRouter } = require("./src/api/routes/indexRouter");
const express = require("express");
const app = express();

app.use(express.json());
connectDB();

app.use("/api/v1", indexRouter);

app.use("*", (req, res, next) => {
  // res.status(404).json({ data: "404 not found" });
  return res.next(setError(404, "Not Found!"));
});

app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Internal Server Error!");
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});
