import React, { useState } from "react";

import "./Output.css";

export type ExecutionMode = "interpreter" | "compiler";
export type OutputType =
  | "tokens"
  | "ast"
  | "codeOutput"
  | "preOptimizedCfg"
  | "postOptimizedCfg"
  | "bytecode";

type OutputData = {
  tokens: string;
  ast: string;
  codeOutput: string[];
  preOptimizedCfg: string;
  postOptimizedCfg: string;
  bytecode: string;
};

type OutputProps = {
  runCode: () => void;
  outputData: OutputData;
  executionMode: ExecutionMode;
  setExecutionMode: (mode: ExecutionMode) => void;
};

const Output: React.FC<OutputProps> = ({
  runCode,
  outputData,
  executionMode,
  setExecutionMode,
}) => {
  const [activeTab, setActiveTab] = useState<OutputType>("codeOutput");

  const interpreterTabs: { id: OutputType; label: string }[] = [
    { id: "tokens", label: "Tokens" },
    { id: "ast", label: "AST" },
    { id: "codeOutput", label: "Output" },
  ];

  const compilerTabs: { id: OutputType; label: string }[] = [
    { id: "tokens", label: "Tokens" },
    { id: "ast", label: "AST" },
    { id: "preOptimizedCfg", label: "Pre-Optimized CFG" },
    { id: "postOptimizedCfg", label: "Post-Optimized CFG" },
    { id: "bytecode", label: "Bytecode" },
    { id: "codeOutput", label: "Output" },
  ];

  const tabs = executionMode === "interpreter" ? interpreterTabs : compilerTabs;

  const handleModeChange = (newMode: ExecutionMode) => {
    setExecutionMode(newMode);
    setActiveTab("codeOutput");
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "tokens":
        return outputData.tokens;
      case "ast":
        return outputData.ast;
      case "codeOutput":
        return outputData.codeOutput.join("\n");
      case "preOptimizedCfg":
        return outputData.preOptimizedCfg;
      case "postOptimizedCfg":
        return outputData.postOptimizedCfg;
      case "bytecode":
        return outputData.bytecode;
      default:
        return "";
    }
  };

  return (
    <div className="output-container">
      <div className="output-header">
        <h1 className="output-title">Output</h1>
        <div className="execution-mode-selector">
          <button
            className={`mode-button ${executionMode === "interpreter" ? "active" : ""}`}
            onClick={() => handleModeChange("interpreter")}
          >
            Interpreter
          </button>
          <button
            className={`mode-button ${executionMode === "compiler" ? "active" : ""}`}
            onClick={() => handleModeChange("compiler")}
          >
            Compiler
          </button>
        </div>
        <button className="run" onClick={runCode}>
          Run&nbsp;
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            transform="rotate(90)"
          >
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          </svg>
        </button>
      </div>

      <div className="output-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <textarea
        className="output"
        cols={30}
        rows={30}
        value={getTabContent()}
        readOnly
      ></textarea>
    </div>
  );
};

export default Output;
