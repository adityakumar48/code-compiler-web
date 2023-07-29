const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compiler = require("./routes/compiler.route");
// Variables Initialization
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/api", compiler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
