import "./SyntaxView.css";

type SyntaxViewProps = {
  toggleViewingSyntax: () => void;
};

const SyntaxView: React.FC<SyntaxViewProps> = ({ toggleViewingSyntax }) => {
  return (
    <div className="syntax-view">
      <div className="syntax-view-header">
        <h2>Pyru Syntax</h2>
        <h3>
          EBNF grammar available{" "}
          <a href="https://github.com/justfreddev/pyru/blob/master/src/grammar.ebnf">
            here
          </a>
        </h3>
        <a className="syntax-view-cross" onClick={toggleViewingSyntax}>
          <svg
            width="46"
            height="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </a>
      </div>

      <div className="syntax-container">
        <div>
          <h4>Variable declaration</h4>
          <pre>
            {`let x = 10;
let name = "fred";
let bool = true;
`}
          </pre>
        </div>

        <div>
          <h4>Variable assignment</h4>
          <pre>
            {`x = x + 1;
name = "fred" + " padgham";
`}
          </pre>
        </div>

        <div>
          <h4>Printing expressions</h4>
          <pre>
            {`print(123);
print(name);
print(null);
`}
          </pre>
        </div>

        <div>
          <h4>If statements</h4>
          <pre>
            {`if name == "fred":
  print("hello fred");
else:
  print("you're not fred!");

let fruits = ["apples", "bananas", "cherries"];
if "apples" in fruits:
  print("yes");

if "dates" not in fruits:
  print("yes");
`}
          </pre>
        </div>

        <div>
          <h4>Lists</h4>
          <pre>
            {`let fruit = ["apples", "bananas", "cherries"];
print(fruit[0]);
print(fruit[:1]);
fruit.push("dates");
print(fruit.pop());
fruit.remove(3);
fruit.insertAt(3, "dates");
fruit.index("bananas");
print(len(fruit));
print(fruit.sort());
`}
          </pre>
        </div>

        <div>
          <h4>Functions</h4>
          <pre>
            {`def fibonacci(n):
  if n <= 1:
    return n;
  else:
    return fibonacci(n - 1) + fibonacci(n - 2);
`}
          </pre>
        </div>

        <div>
          <h4>While loops</h4>
          <pre>
            {`let counter = 0;
while counter < 10:
  print(counter);
  counter++;
`}
          </pre>
        </div>

        <div>
          <h4>For loops</h4>
          <pre>
            {`for i in 0..10:
  print(i);

for j in 0..10 step 2:
  print(j);
`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SyntaxView;
