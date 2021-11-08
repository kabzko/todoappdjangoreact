import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        LoadTask();
    }, []);

    function LoadTask() {
        axios.get('/api/tasks/')
        .then(res => {
            setTasks(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    function AddTask(e) {
        e.preventDefault();
        setLoading(true);
        axios.post('/api/tasks/', {
            title: title
        }).then(() => {
            setTitle('');
            LoadTask();
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }

    function renderTasks() {
        if (!tasks) {
            return (
                <div>
                    Loading...
                </div>
            )
        }
        if (tasks.length === 0) {
            return (
                <div>
                    No task yet, Add one.
                </div>
            )
        }

        return tasks.map((task, index) => {
            return (
                <div className="my-2" key={index}>
                    <div className="row">
                        <div className="col">
                            {
                                task.completed === true ? <strike>{task.title}</strike> : <span>{task.title}</span>
                            }
                        </div>
                        <div className="col text-end">
                            <Link to={`/edit/${task.id}`}>
                                <button className="btn btn-warning">Edit</button>
                            </Link>
                            <Link to={`/delete/${task.id}`}>
                                <button className="btn btn-danger">Delete</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="container border bg-light shadow-lg">
            <h3>My Tasks</h3>
            <form onSubmit={AddTask}>
                <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                <div className="text-end">
                    <button type="submit" className="btn btn-primary mt-2" disabled={loading}>{loading ? 'Loading' : 'Add'}</button>
                </div>
            </form>
            <section className="border my-2 px-2">
                {renderTasks()}
            </section>
        </div>
    )
}

export default Home;