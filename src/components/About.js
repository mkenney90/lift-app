import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="pure-u-1">
            <p className="pure-u-1">This app was built with React.js</p>
            <Link to="/">Back</Link>
        </div>
    )
}

export default About;