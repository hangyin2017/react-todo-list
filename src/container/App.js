import React, { Component } from 'react';
import './App.css';
import AddTask from '../components/AddTask/AddTask';
import List from '../components/List/List';

/**
 * @description Main app component.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 */
class App extends Component {
    constructor(props) {
        super(props);

        // Get the date now in the format of 'yyyy-mm-dd'.
        const dateNow = new Date().toISOString().slice(0, 10);

        /**
         * @typedef {Object} ComponentState
         * @property {Object[]} tasks - All listed tasks.
         * @property {string} taskInput - Store the content of the task input bar.
         * @property {string} datePicker - Store the date of the task input date picker.
         */

        /** @type {ComponentState} */
        this.state = {
            tasks: [],
            taskInput: '',
            datePicker: dateNow,
        };
    }

    /**
     * @description Read the list of tasks from local storage and put into this.state.
     */
    componentWillMount() {
        const toDoListTasks = localStorage.getItem('toDoListTasks') || '[]';
        this.setState({ tasks: JSON.parse(toDoListTasks) });
    }

    /**
     * @description Update the task description when type in the Bar.
     * @param {Object} taskInput - Object of an input bar change event
     */
    handleTaskInputChange = (e) => {
        this.setState({ taskInput: e.target.value });
    };

    /**
     * @description Add task if press Enter in the task input bar.
     * @param {Object} e - keyDown event
     */
    handleKeyDown = (e) => {
        // Press Enter key
        if (e.keyCode === 13) this.addTask();
    };

    /**
     * @description Add task to the To-Do list.
     */
    addTask = () => {
        if (this.state.taskInput === '') return;
        const newId = this.state.tasks.length + 1;
        const newTask = {
            id: newId,
            desc: this.state.taskInput,
            status: 'To Do',
            date: this.state.datePicker,
        };
        const updatedTasks = [...this.state.tasks, newTask];
        this.setState(
            { tasks: updatedTasks, taskInput: '' },
            // Callback to store task list in local storage.
            this.updateLocalStorageTasks
        );
    };

    /**
     * @description Update task status between To Do and Done.
     * @param {Object} clickedTask - A task object
     */
    handleTaskUpdate = (clickedTask) => {
        this.setState((previousState) => {
            const tasks = [...previousState.tasks];
            const index = tasks.indexOf(clickedTask);
            tasks[index] = { ...clickedTask };
            tasks[index].status =
                tasks[index].status === 'To Do' ? 'Done' : 'To Do';
            return { tasks };
        }, this.updateLocalStorageTasks);
    };

    /**
     * @description Update date if the date picker's value in AddTask changes.
     * @param {Object} e - Date picker onChange event
     */
    handleDateChange = (e) => {
        this.setState({ datePicker: e.target.value });
    };

    /**
     * @description Store task list in the state to local storage.
     */
    updateLocalStorageTasks = () => {
        localStorage.setItem('toDoListTasks', JSON.stringify(this.state.tasks));
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
                    datePicker={this.state.datePicker}
                    taskInputChange={(taskInput) =>
                        this.handleTaskInputChange(taskInput)
                    }
                    keyDown={this.handleKeyDown}
                    addTask={this.addTask}
                    dateChange={this.handleDateChange}
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
