import React, { useEffect, useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import axios from 'axios';

function Edit() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        LoadTaskByID();
    }, []);

    function LoadTaskByID() {
        axios.get('/api/tasks/' + id, {})
        .then(res => {
            setTitle(res.data.title);
            setStatus(res.data.completed);
        }).catch(err => {
            console.log(err);
        })
    }

    function UpdateTask(e) {
        e.preventDefault();
        setLoading(true);
        axios.put('/api/tasks/' + id + '/', {
            title: title,
            completed: status,
        })
        .then(() => {
            navigate('/');
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <div className="container border bg-light shadow-lg">
            <section className="my-2 px-2">
                <form onSubmit={UpdateTask}>
                    <h3>Edit Task</h3>
                    <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                    <span>Completed:</span><input type="checkbox" checked={status === true ? 'checked' : ''} onChange={(e) => setStatus(e.target.checked)}/>
                    <div className="text-end">
                        <button type="submit" className="btn btn-success" disabled={loading}>{loading ? 'Loading' : 'Submit'}</button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Go Back</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Edit;