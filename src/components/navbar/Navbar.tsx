import "./Navbar.css";

type NavbarProps = {
    toggleViewingSyntax: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ toggleViewingSyntax }) => {
    function handleSyntaxToggle() {
        toggleViewingSyntax();
    }

    return (
        <div className="nav">
            <h1 className="title">Pyru Playground</h1>
            <button className="syntax-button" onClick={handleSyntaxToggle}>
                Syntax
            </button>
        </div>
    );
};

export default Navbar;
