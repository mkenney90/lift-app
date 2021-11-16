// component to display the movements/lifts within a given workout

import Lift from "./Lift";

const Lifts = ({ lifts, handleRemove, handleChange }) => {
    return (
        <table className="pure-table">
            <tbody>
            {lifts.map((lift) => (
                <tr key={lift.id} >
                    <Lift key={lift.id} lift={lift} handleRemove={handleRemove} handleChange={handleChange} />
                </tr>
                ))
            }
            </tbody>
        </table>
    )
}

export default Lifts;