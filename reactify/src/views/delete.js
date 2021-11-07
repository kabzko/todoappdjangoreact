import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Delete() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        LoadTaskByID();
    }, []);

    function LoadTaskByID() {
        axios.get('/api/tasks/' + id, {})
        .then(res => {
            setTitle(res.data.title);
        }).catch(err => {
            console.log(err);
        })
    }

    function DeleteTask(e) {
        e.preventDefault();
        setLoading(true);
        axios.delete('/api/tasks/' + id + '/')
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
            <section class="my-2 px-2">
                <form onSubmit={DeleteTask}>
                    <h3>Delete Task</h3>
                    <p>Are you sure you want to delete <b>{title}</b>?</p>
                    <div className="text-end">
                        <button type="submit" className="btn btn-success" disabled={loading}>{loading ? 'Loading' : 'Submit'}</button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Go Back</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Delete;