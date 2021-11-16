import './App.css';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Exercises from './components/Exercises';
import WorkoutTemplate from './components/WorkoutTemplate';
import Footer from './components/Footer';
import About from './components/About';
import SavedWorkouts from './components/SavedWorkouts';


const App = () => {

    const [exercises, setExercises] = useState([]);     //array of available lifts
    const [workout, setWorkout] = useState([]);         //array of lifts in the workout
    const [inputValue, setInputValue] = useState("");
    const [inputErrors, setInputErrors] = useState([]);
    const [savedWorkouts, setSavedWorkouts] = useState([]);

    const exerciseUrl = "http://localhost:3001/exercises";
    const savedWorkoutUrl = "http://localhost:3001/workouts";

    const numberRegex = new RegExp(/[^0-9]/);

    const getData = async () => {
        await fetch(exerciseUrl)
            .then(res => res.json())
            .then(data => setExercises(data))
            .catch((err) => {
                console.log(err);
            })
        await fetch(savedWorkoutUrl)
            .then(res => res.json())
            .then(data => setSavedWorkouts(data))
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const addLift = async (lift) => {
        const res = await fetch(exerciseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(lift)
        })

        const newData = await res.json();
        setExercises([...exercises, newData]);
    }

    const handleClick = (target) => {
        setWorkout(workout.concat({id: target.id, name: target.name } ));
    }

    const handleAdd = (value) => {
        let dupes = exercises.filter((e) => e.name.toLowerCase() === value.toLowerCase());
        document.getElementById('lift_input').value = "";

        if (value !== "" && !dupes.length) {
            const newLift = {name: startCase(value)};
            addLift(newLift);
            setInputValue("");
        } else if (dupes.length) {
            alert('Cannot add: item already exists.');
        }
    }
 
    const handleInput = (event) => {
        setInputValue(event.target.value);
    }

    const handleNumericInput = (event) => {
        event.target.value = event.target.value.replace(numberRegex, '');
    }

    const handleRemove = (target) => {
        setWorkout(workout.filter((ex) => ex.id !== target));
    }

    const handleDelete = async (target) => {
        if (!window.confirm("Delete " + target.name + " from the list?")) return;
        handleRemove(target.id)
        const res = await fetch(exerciseUrl + `/${target.id}`, {
            method: 'DELETE',
        });

        res.status === 200 
            ? setExercises(exercises.filter((ex) => ex.id !== target.id))
            : alert("Error deleting entry " + target.name);
    }

    const handleClear = (clearName = false ) => {
        setWorkout([]);
        if (clearName === true) {
            document.getElementById('workout_name_input').value = "";
        }
    }

    const handleSave = async () => {

        let inputWrapper = document.getElementsByClassName("workout_wrapper")[0];
        let inputs = Array.from(inputWrapper.getElementsByTagName("input"));
        let errors = [];

        if (!inputWrapper || !inputs) return;

        for (var i in inputs) {
            if (inputs[i].value === "") {
                errors.push(inputs[i].id);
                inputs[i].classList.toggle("error", true);
            } else {
                inputs[i].classList.toggle("error", false);
            }
        }

        setInputErrors([...errors]);

        if (errors.length) {
            toast.error("Please make sure all fields have valid input.");
            return;
        }

        const jsonData = workout.map((w) => ({
            movement: w.name,
            weight: document.getElementById('weight_input_' + w.id).value,
            sets: document.getElementById('sets_input_' + w.id).value,
            reps: document.getElementById('reps_input_' + w.id).value
        }));

        const workoutName = document.getElementById('workout_name_input').value;

        if (workout.length) {
            const date = new Date();
            
            const res = await fetch(savedWorkoutUrl, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "timestamp": date, 
                    "name": workoutName, 
                    "details": jsonData
                })
            });

            const newData = await res.json();
            setSavedWorkouts([...savedWorkouts, newData]);

            handleClear(true);
            toast.success("Workout saved!");
        }
    }

    const startCase = (text) => {
        let splitText = text.split(" ");
        let formattedString = "";

        splitText.forEach((word) => {
            formattedString = formattedString + (word.slice(0,1).toUpperCase() + word.slice(1) + " ");
        })

        return formattedString.trim();
    }

  return ( 
    <Router>
    <div className="App pure-g">
        <Routes>
            <Route 
                exact path='/' 
                element={
                    <>
                    <h2 className="pure-u-1">Workout Plan:</h2>
                    <WorkoutTemplate lifts={workout} handleRemove={handleRemove} handleClear={handleClear} handleSave={handleSave} handleChange={handleNumericInput} />

                    <div className="saved_workouts pure-u-1">
                        {savedWorkouts.length > 0 && <Link to='/saved' className="open_saved_workouts pure-u-1-4">View saved workouts</Link>}
                    </div>

                    <h3 className="pure-u-1">Click to add from the list below:</h3>
                    <div className="exercise_list pure-u-1">
                        <Exercises exercises={exercises} workout={workout} handleClick={handleClick} onDelete={handleDelete} />
                    </div>

                    <div className="pure-u-1">
                        <div className="pure-form">
                            <input className="exercise_input pure-input" id="lift_input" placeholder="or enter a new exercise" onChange={handleInput} maxLength="20"></input>
                            <button className="btn_add pure-button" onClick={() => handleAdd(inputValue)} disabled={inputValue === ""}>Add</button>
                        </div>
                    </div>
                    <Footer />
                    </>
                }
            />
            <Route path='/saved' element={<SavedWorkouts saved={savedWorkouts} />} />
            <Route path='/about' element={<About />} />
        </Routes>
    </div>
    <Toaster />
    </Router>

  );
}

export default App;