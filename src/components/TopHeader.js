const React = require('react');
const TodoTaskAddForm = require('./TodoTaskAddForm');

var TopHeader = (props) => {
    return(
    <div>
        <div className="top_bar">
            <div className="input-group container">
                <div className="pull-left">
                    <p>React ToDo Application</p>
                </div>
                <button type="button" className="btn btn-info pull-right" data-toggle="modal" data-target="#AddTaskModal">Add Todo</button>
            </div>
        </div>
        <TodoTaskAddForm id={props.id} onNewTodoItem={props.onNewTodoItem}/>
    </div>
    );
};


module.exports = TopHeader;