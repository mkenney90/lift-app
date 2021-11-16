import { Link } from "react-router-dom";

const SavedWorkouts = ({ saved }) => {
    return (
        <div className="saved_workouts_outline pure-u-1">
            {saved.map((w, idx) => {
                let date = new Date(w.timestamp);
                let pubDate = date.toLocaleString('default', { month: 'short', day: '2-digit', hour: '2-digit', hourCycle: 'h24', minute: '2-digit' });
                return (
                    <table key={idx} className="saved_item">
                        <thead>
                            <tr>
                                <th colSpan="4">{w.name || pubDate}</th>
                            </tr>
                            <tr>
                                <th>Movement</th>
                                <th>Weight</th>
                                <th>Sets</th>
                                <th>Reps</th>
                            </tr>
                        </thead>
                        <tbody>
                        {w.details.map((m, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{m.movement}</td>
                                    <td>{m.weight || '?'}</td>
                                    <td>{m.sets}</td>
                                    <td>{m.reps}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan="4">
                                <label>
                                    <input type="checkbox" />
                                    Done
                                </label>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                )
            })}
        <Link to='/'>Back</Link>
        </div>
    )
}

export default SavedWorkouts;