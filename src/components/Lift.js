// an individual lift or movement within a workout

const Lift = ({ lift, handleRemove, handleChange }) => {
    const weightInputId = "weight_input_" + lift.id;
    const setsInputId = "sets_input_" + lift.id;
    const repsInputId = "reps_input_" + lift.id;
    return (
        <td className="workout_item">
            <span onClick={() => handleRemove(lift.id)}>{lift.name}</span>
            <div className="lift_inputs">
                <form className="pure-form">
                <input id={weightInputId} pattern="\d*" onChange={handleChange} ></input>lbs x 
                <input id={setsInputId} pattern="\d*" onChange={handleChange} ></input>sets x 
                <input id={repsInputId} pattern="\d*" onChange={handleChange} ></input> reps
                </form>
            </div>
        </td>
    )
}

export default Lift;