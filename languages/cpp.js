const { exec } = require("child_process");
const readline = require("readline");

function compileAndRunCpp(code, input, callback) {
  // Save the C++ code to a file
  const codeFilePath = "./temp.cpp";
  require("fs").writeFileSync(codeFilePath, code);

  // Compile the C++ code
  const compileCommand = `g++ ${codeFilePath} -o temp.exe`;

  exec(compileCommand, (compileError, compileStdout, compileStderr) => {
    if (compileError) {
      callback(compileStderr);
    } else {
      // Create a readline interface to get user input
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      // Execute the compiled C++ code and provide user input
      const runCommand = "temp.exe";
      const childProcess = exec(
        runCommand,
        (runError, runStdout, runStderr) => {
          // Cleanup: remove temporary files\

          //   clean file after 2 minutes
          setTimeout(() => {
            // require("fs").unlinkSync(codeFilePath);

            require("fs").unlinkSync(codeFilePath);
            require("fs").unlinkSync("temp.exe");
          }, 120000);

          if (runError) {
            callback(runStderr);
          } else {
            callback(null, runStdout);
          }
        }
      );

      // Provide the user input to the C++ code
      if (input) {
        childProcess.stdin.write(input + "\n");
      }

      // Close the stdin stream to indicate the end of input
      childProcess.stdin.end();

      // Handle user input for interactive programs
      rl.on("line", (inputLine) => {
        childProcess.stdin.write(inputLine + "\n");
      });

      // Handle the 'close' event to end the readline interface
      childProcess.on("close", () => {
        rl.close();
      });
    }
  });
}

module.exports = { compileAndRunCpp };
