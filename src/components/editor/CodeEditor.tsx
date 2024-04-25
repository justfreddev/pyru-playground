import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/lesser-dark.css";
import "codemirror/mode/javascript/javascript";

import "./CodeEditor.css";

type CodeEditorProps = {
    setCode: (code: string) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ setCode }) => {
    return (
        <div className="code-editor">
            <CodeMirror
                className="code-mirror"
                options={{
                    lineNumbers: true,
                    lineWrapping: false,
                    theme: "lesser-dark",
                }}
                onChange={(_editor, _data, value) => {
                    setCode(value);
                }}
            />
        </div>
    );
};

export default CodeEditor;
