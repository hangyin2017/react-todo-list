import React from 'react';
import './AddTask.css';

const AddTask = (props) => {
    return (
        <div className='addtask'>
            <input
                type='text'
                className='addtask-taskinput'
                value={props.taskInput}
                onChange={props.taskInputChange}
                onKeyDown={props.keyDown}
            ></input>
            <input
                type='date'
                className='addtask-datePicker'
                value={props.datePicker}
                onChange={props.dateChange}
            ></input>
            <button className='addtask-button' onClick={props.addTask}>
                Add
            </button>
        </div>
    );
};

export default AddTask;
