const React = require('react');
const TodoListItem = require('./TodoListItem');
const TodoEditForm = require('./TodoEditForm');

var TodoList = (props) => {

    var todoList = [];
    var todos = props.todos;
    var title = '';
    var desc = '';
    for (var i = 0; i < todos.length; i++) {
        todoList.push(<TodoListItem 
                        todo={todos[i]} 
                        id={props.todos[i]._id} 
                        key={props.todos[i]._id}
                        index={i}
                        onEditBtnClick={props.onEditBtnClick} 
                        onDeleteBtnClick={props.onDeleteBtnClick}
                        onDidTaskCheck={props.onDidTaskCheck}/>
                    );
    }
            
    return( 
        <div>  
            <ul className="list-group container todo_list_ul">
                {todoList}
            </ul>
            <TodoEditForm id="EditTaskModal" 
            urlToSubmitEdit={props.urlToSubmitEdit} 
            todoToEdit={props.todoToEdit}/>
        </div> 
    );

};

module.exports = TodoList;