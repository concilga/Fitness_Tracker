import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, useParams, useHistory } from 'react-router-dom';

const EditRoutine = ({token, user, setPublicRoutines, publicRoutines}) => {
    if(!user){
        return (
            <></>
        )
    }

    const {id} = useParams()

    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    async function fetchRoutines() {
        const response = await fetch("https://fitnesstrac-kr.herokuapp.com/api/routines");
        const info = await response.json();
        setPublicRoutines(info);
    }
    
    const setTemplate = () => {
        fetchRoutines();

        const individualRoutine = publicRoutines.filter(
            (routine) => routine.id == id
        );

        setName(individualRoutine[0].name);
        setGoal(individualRoutine[0].goal);
    }

    useEffect(() => {
        setTemplate();
    }, []);

    const handleSubmit = async(event) => {
        event.preventDefault();
        setError("");

        const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                    name,
                    goal,
                    isPublic: true
            })
        });
        const info = await response.json();

        if(info.error) {
            return setError(info.error);
        }

        fetchRoutines();
        
        history.push(`/MyRoutines`);
    }



    return (
        <div id='container'>
            <div id='login-navbar'>
                <h2>Please Edit the Information Below and Submit:</h2>
            </div>
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name of Routine:</label>
                    <input required type='text' name='name' value={name} 
                        onChange={(event) => setName(event.target.value)}/>
                    <label htmlFor='goal'>Description:</label>
                    <input required type='goal' name='goal' value={goal} 
                        onChange={(event) => setGoal(event.target.value)}/>
                    <button type='submit' className='button-19'>Submit</button>
                </form>
                <p>{error}</p>
            </div>
      </div>
    )
}

export default EditRoutine;