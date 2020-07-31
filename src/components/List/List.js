import React from 'react';
import './List.css';

const List = (props) => {
    return (
        <div className='list'>
            {props.items.map((item) => (
                <div key={item.id} className='item'>
                    {item.desc}
                </div>
            ))}
        </div>
    );
};

export default List;
