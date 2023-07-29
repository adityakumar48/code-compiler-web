const path = require("path");
const fs = require("fs");
const cppFunction = require("../languages/cpp");

const codeCompile = (req, res) => {
  const { jobId, code, input } = req.body;
  console.log(jobId, code, input);

  try {
    const filePath = `${path.join(__dirname, "codes")}/main.cpp`;

    console.log(filePath);

    cppFunction.compileAndRunCpp(jobId, code, input, (error, output) => {
      if (error) {
        // console.error("Compilation or Execution Error:", error);
        res.json(error);
      } else {
        console.log("Output:");
        res.json({ status: true, result: output });
        console.log(output);
      }
    });

    // Write the code to the file
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { codeCompile };
