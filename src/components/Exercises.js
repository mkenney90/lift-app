// the available exercises a user can add to a workout

import Exercise from "./Exercise";

const Exercises = ({ exercises, workout, handleClick, onDelete }) => {
    return (
        <>
        {exercises.map((ex, idx) => {
                const displayClass = workout.find(w => w.name === ex.name) !== undefined ? "inactive" : "active";
                
                return (
                    <Exercise key={idx} ex={ex} displayClass={displayClass} handleClick={handleClick} onDelete={onDelete} />
                )
            })
        }
        </>
    )
}

export default Exercises;