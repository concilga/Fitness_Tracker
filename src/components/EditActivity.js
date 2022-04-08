import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, useParams, useHistory } from 'react-router-dom';

const EditActvitiy = ({token, user, setPublicRoutines, publicRoutines}) => {
    if(!user){
        return (
            <></>
        )
    }

    const {id} = useParams()

    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    async function fetchRoutines() {
        const response = await fetch("https://fitnesstrac-kr.herokuapp.com/api/routines");
        const info = await response.json();
        setPublicRoutines(info);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setError("");

        const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routine_activities/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                    count,
                    duration
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
                <label htmlFor='count'>Count of an Activity:</label>
                <input required type='text' name='count' value={count} 
                    onChange={(event) => setCount(event.target.value)}/>
                <label htmlFor='duration'>Duration:</label>
                <input required type='duration' name='duration' value={duration} 
                    onChange={(event) => setDuration(event.target.value)}/>
                <button type='submit' className='button-19'>Submit</button>
                </form>
                <p>{error}</p>
            </div>
      </div>
    )
}

export default EditActvitiy;