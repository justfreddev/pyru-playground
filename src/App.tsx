import axios from "axios";
import { useState } from "react";

import CodeEditor from "./components/editor/CodeEditor";
import Navbar from "./components/navbar/Navbar";
import SyntaxView from "./components/syntaxview/SyntaxView";
import Output from "./components/output/Output";

import "./App.css";

type ExecutionMode = "interpreter" | "compiler";

type OutputData = {
  tokens: string;
  ast: string;
  codeOutput: string[];
  preOptimizedCfg: string;
  postOptimizedCfg: string;
  bytecode: string;
};

function App() {
  const [isViewingSyntax, setIsViewingSyntax] = useState(false);
  const [executionMode, setExecutionMode] =
    useState<ExecutionMode>("interpreter");
  const [interpreterOutput, setInterpreterOutput] = useState<OutputData>({
    tokens: "",
    ast: "",
    codeOutput: [],
    preOptimizedCfg: "",
    postOptimizedCfg: "",
    bytecode: "",
  });
  const [compilerOutput, setCompilerOutput] = useState<OutputData>({
    tokens: "",
    ast: "",
    codeOutput: [],
    preOptimizedCfg: "",
    postOptimizedCfg: "",
    bytecode: "",
  });
  const [code, setCode] = useState("");

  const outputData =
    executionMode === "interpreter" ? interpreterOutput : compilerOutput;
  const interpreterApiUrl = import.meta.env.VITE_INTERPRETER_API_URL;
  const compilerApiUrl = import.meta.env.VITE_COMPILER_API_URL;

  function toggleViewingSyntax() {
    setIsViewingSyntax((prev) => !prev);
  }

  function runCode() {
    const setOutputFn =
      executionMode === "interpreter"
        ? setInterpreterOutput
        : setCompilerOutput;
    setOutputFn((prevData) => ({
      ...prevData,
      codeOutput: [],
    }));

    const apiUrl =
      executionMode === "interpreter"
        ? `${interpreterApiUrl}`
        : `${compilerApiUrl}`;

    axios
      .post(
        apiUrl,
        { source: code },
        { headers: { "Access-Control-Allow-Origin": "*" } },
      )
      .then((response) => {
        const responseData =
          typeof response.data === "string"
            ? JSON.parse(response.data)
            : response.data;

        let codeOutput: string[];
        if (Array.isArray(responseData.output)) {
          codeOutput = responseData.output;
        } else if (typeof responseData.output === "string") {
          codeOutput = responseData.output ? [responseData.output] : [];
        } else {
          codeOutput = [];
        }

        setOutputFn({
          tokens: responseData.tokens || "",
          ast: responseData.ast || "",
          codeOutput: codeOutput,
          preOptimizedCfg: responseData.pre_optimization_cfg || "",
          postOptimizedCfg: responseData.post_optimization_cfg || "",
          bytecode: responseData.bytecode || "",
        });
      })
      .catch((error) => {
        console.error(error.response);
        setOutputFn((prevData) => ({
          ...prevData,
          codeOutput: [...prevData.codeOutput, `Error: ${error.message}`],
        }));
      });
  }

  return (
    <div>
      <Navbar toggleViewingSyntax={toggleViewingSyntax} />
      <div className="main">
        <CodeEditor setCode={setCode} />
        <Output
          runCode={runCode}
          outputData={outputData}
          executionMode={executionMode}
          setExecutionMode={setExecutionMode}
        />
      </div>

      {isViewingSyntax && (
        <SyntaxView toggleViewingSyntax={toggleViewingSyntax} />
      )}
    </div>
  );
}

export default App;
