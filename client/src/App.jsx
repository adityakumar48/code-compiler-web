import { useState } from "react";
import axios from "axios";
const App = () => {
  const [formData, setFormData] = useState({
    // Initialize the form fields with empty values
    jobId: "",
    code: "",
    input: "",
  });

  const [output, setOutput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const api = await axios.post("http://localhost:8000/api/compile", formData);
    if (api.data.status) {
      setOutput(api.data.result);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">jobId:</label>
          <input
            type="text"
            id="jobId"
            name="jobId"
            value={formData.jobId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="code">code:</label>
          <textarea
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            cols={30}
            rows={10}
          ></textarea>
        </div>
        <div>
          <label htmlFor="input">input:</label>
          <textarea
            id="input"
            name="input"
            value={formData.input}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      output:
      <pre>{output}</pre>
    </div>
  );
};

export default App;
