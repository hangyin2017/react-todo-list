import React, { Component } from 'react';
import './App.css';
import AddItem from '../components/AddItem/AddItem';
import List from '../components/List/List';

class App extends Component {
    state = {
        items: [
            { id: 1, desc: 'aa', status: 'To Do' },
            { id: 2, desc: 'bb', status: 'To Do' },
            { id: 3, desc: 'cc', status: 'Done' },
        ],
    };

    render() {
        const { items = [] } = this.state;
        const columns = [
            {
                tab: 'To Do',
                items: items.filter((item) => item.status === 'To Do'),
            },
            {
                tab: 'Done',
                items: items.filter((item) => item.status === 'Done'),
            },
        ];
        console.log(columns);

        return (
            <div className='app'>
                <div className='app-title'>
                    <h1>To-Do List</h1>
                </div>
                <AddItem />
                <div className='app-columns'>
                    {columns.map((column, index) => (
                        <div key={index} className='column'>
                            <div className='column-tab'>{column.tab}</div>
                            <List items={column.items} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
