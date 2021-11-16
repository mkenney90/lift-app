
const Exercise = ({ ex, displayClass, handleClick, onDelete }) => {
    return (
        <div className="exercise_btn_container pure-u-1-3">
            <div className={"pure-button pure-u-11-12 exercise_btn " + displayClass} onClick={displayClass === "active" ? () => handleClick(ex) : null}>
                <p className="pure-u-5-6">{ex.name}</p>
                <span className="pure-u-1-6" onClick={e => e.stopPropagation()}>
                    <div className="delete_btn" onClick={() => onDelete(ex)}>x</div>
                </span>
            </div>
        </div>
    )
}

export default Exercise;