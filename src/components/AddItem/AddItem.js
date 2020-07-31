import React from 'react';
import './AddItem.css';

const AddItem = (props) => {
    return (
        <div className='additem'>
            <input type='text' className='additem-input'></input>
            <button className='additem-button'>Add</button>
        </div>
    );
};

export default AddItem;
