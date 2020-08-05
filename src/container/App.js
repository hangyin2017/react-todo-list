import React, { Component } from 'react';
import './App.css';
import AddTask from '../components/AddTask/AddTask';
import List from '../components/List/List';

class App extends Component {
    state = {
        tasks: [
            { id: 1, desc: 'aa', status: 'To Do' },
            { id: 2, desc: 'bb', status: 'To Do' },
            { id: 3, desc: 'cc', status: 'Done' },
        ],

        taskInput: '',
    };

    /**
     * Update the task description when type in the Bar.
     */
    handleTaskInputChange = (taskInput) => {
        this.setState({ taskInput: taskInput.target.value });
    };

    /**
     * Add task if press Enter in the task input bar.
     */
    handleKeyDown = (e) => {
        if (e.keyCode === 13) this.addTask();
    };

    /**
     * Add task to the To-Do list
     */
    addTask = () => {
        if (this.state.taskInput === '') return;
        const newId = this.state.tasks.length + 1;
        const newTask = {
            id: newId,
            desc: this.state.taskInput,
            status: 'To Do',
        };
        const updatedTasks = [...this.state.tasks, newTask];
        this.setState({ tasks: updatedTasks, taskInput: '' });
    };

    /**
     * Update task status between To Do and Done
     */
    handleTaskUpdate = (clickedTask) => {
        this.setState((previousState) => {
            const tasks = [...previousState.tasks];
            const index = tasks.indexOf(clickedTask);
            tasks[index] = { ...clickedTask };
            tasks[index].status =
                tasks[index].status === 'To Do' ? 'Done' : 'To Do';
            return { tasks };
        });
    };

    render() {
        /**
         * Put tasks into corresponding columns, then map the columns to the page.
         */
        const { tasks = [] } = this.state;
        const columns = [
            {
                tab: 'To Do',
                tasks: tasks.filter((task) => task.status === 'To Do'),
            },
            {
                tab: 'Done',
                tasks: tasks.filter((task) => task.status === 'Done'),
            },
        ];

        return (
            <div className='app'>
                <div className='app-title'>
                    <h1>To-Do List</h1>
                </div>
                <AddTask
                    taskInput={this.state.taskInput}
                    taskInputChange={(taskInput) =>
                        this.handleTaskInputChange(taskInput)
                    }
                    keyDown={this.handleKeyDown}
                    addTask={this.addTask}
                />
                <div className='app-columns'>
                    {columns.map((column, index) => (
                        <div key={index} className='column'>
                            <div className='column-tab'>{column.tab}</div>
                            <List
                                tasks={column.tasks}
                                updateTask={this.handleTaskUpdate}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
