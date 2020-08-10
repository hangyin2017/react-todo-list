import React from 'react';
import './List.css';

const List = (props) => {
    return (
        <div className='list'>
            {props.tasks.map((task) => (
                <div
                    key={task.id}
                    className='list-task'
                    onClick={() => props.updateTask(task)}
                >
                    <span className='list-task-desc'>{task.desc}</span>
                    <input
                        type='date'
                        className='list-task-datePicker'
                        value={task.date}
                        // onChange={}
                    ></input>
                </div>
            ))}
        </div>
    );
};

export default List;
