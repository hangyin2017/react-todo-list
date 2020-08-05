import React from 'react';
import './List.css';

const List = (props) => {
    return (
        <div className='list'>
            {props.tasks.map((task) => (
                <div key={task.id} className='task'>
                    {task.desc}
                </div>
            ))}
        </div>
    );
};

export default List;
