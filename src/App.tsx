import axios from "axios";
import { useState } from "react";

import CodeEditor from "./components/editor/CodeEditor";
import Navbar from "./components/navbar/Navbar";
import SyntaxView from "./components/syntaxview/SyntaxView";
import Output from "./components/output/Output";

import "./App.css";

function App() {
  const [isViewingSyntax, setIsViewingSyntax] = useState(false);
  const [outputArray, setOutputArray] = useState<string[]>([]);
  const [code, setCode] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  function toggleViewingSyntax() {
    setIsViewingSyntax((prev) => !prev);
  }

  function runCode() {
    setOutputArray((prevArray) => [...prevArray, "Running code..."]);

    axios
      .post(
        `${apiUrl}/v1/runcode`,
        { source: code },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      )
      .then((response) => {
        setOutputArray((prevArray) => [
          ...prevArray,
          ...JSON.parse(response.data),
        ]);
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  return (
    <div>
      <Navbar toggleViewingSyntax={toggleViewingSyntax} />
      <div className="main">
        <CodeEditor setCode={setCode} />
        <Output runCode={runCode} outputArray={outputArray} />
      </div>

      {isViewingSyntax && (
        <SyntaxView toggleViewingSyntax={toggleViewingSyntax} />
      )}
    </div>
  );
}

export default App;
