import React from "react";

import "./Output.css";

type OutputProps = {
    runCode: () => void;
    outputArray: string[];
};

const Output: React.FC<OutputProps> = ({ runCode, outputArray }) => {
    return (
        <div className="output-container">
            <h1 className="output-title">Output</h1>
            <textarea
                className="output"
                cols={30}
                rows={30}
                value={outputArray.join("\n")}
                readOnly
            ></textarea>
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
    );
};

export default Output;
