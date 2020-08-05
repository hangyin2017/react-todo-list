import React from 'react';
import './AddTask.css';

const AddTask = (props) => {
    return (
        <div className='addtask'>
            <input
                id='taskInput'
                type='text'
                className='addtask-input'
                value={props.taskInput}
                onChange={props.taskInputChange}
            ></input>
            <button className='addtask-button' onClick={props.addTask}>
                Add
            </button>
        </div>
    );
};

export default AddTask;
