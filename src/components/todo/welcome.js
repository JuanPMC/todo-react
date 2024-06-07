import { Link, useParams } from "react-router-dom";

function Welcome() {

    const params = useParams()

    return (
    <div className="Welcome">
        <h1>Welcome {params.username}</h1>
        <h2>See yout todos <Link to="/list">here</Link></h2>
    </div>
    );
}

export default Welcome;
