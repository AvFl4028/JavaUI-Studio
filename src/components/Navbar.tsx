import "./styles/Navbar.style.css";

export default function Navbar() {
    return (
        <div className="navbar-container">
            <h1 className="title">JavaUI Studio</h1>
            <a href="/#">
                <p className="url">File</p>
            </a>
            <a href="/#">
                <p className="url">Edit</p>
            </a>
            <a href="/#">
                <p className="url">Build</p>
            </a>
            <a href="/#">
                <p className="url">Run</p>
            </a>
            <a href="/#">
                <p className="url">Git</p>
            </a>
            <a href="/#">
                <p className="url">Help</p>
            </a>
        </div>
    );
}
