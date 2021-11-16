
import Lifts from "./Lifts";

const WorkoutTemplate = ({ lifts, handleRemove, handleClear, handleSave, handleChange }) => {
    return (
        <div className="workout_wrapper pure-u-1">
            <div className="workout_outline_form">
                <form className="pure-form">
                <input id="workout_name_input" className="pure-input-1-3" placeholder="enter a name for this workout"></input>
                </form>
            </div>
            <div className="workout_outline pure-u-1">
                {lifts.length ? <Lifts lifts={lifts} handleRemove={handleRemove} handleChange={handleChange} /> : <p className="placeholder_text">Add some lifts to get started!</p>}
            </div>
            <div className="workout_outline_controls pure-u-1">
                <div className="pure-u-1-2 pure-button pure-button-primary workout-save-btn" disabled={!lifts.length} onClick={handleSave}>Save</div>
                <div className="pure-u-1-2 pure-button pure-button-primary workout-clear-btn" onClick={handleClear}>Clear</div>
            </div>
        </div>
    )
}

export default WorkoutTemplate;