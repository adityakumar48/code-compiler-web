// Example usage:
const cppCode = `
#include <iostream>
using namespace std;

int main() {
  int num;
  cin >> num;
  cout << "Square of " << num << " is " << num * num << endl;
  return 0;
}
`;

const userInput = "5";

compileAndRunCpp(cppCode, userInput, (error, output) => {
  if (error) {
    console.error("Compilation or Execution Error:", error);
  } else {
    console.log("Output:");
    console.log(output);
  }
});
