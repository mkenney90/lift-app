import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="pure-u-1">
            <p>Copyright &copy; 2021 Mike Kenney</p>
            <Link to="/About">About</Link>
        </footer>
    )
}

export default Footer;