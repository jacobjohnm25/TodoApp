const React = require('react');
const moment = require('moment');

var TodoListItem = (props) => {
   
   return(
       <li className="list-group-item todo_box">
           <label className="pull-right">
               <input type="checkbox" id={props.id} onChange={props.onDidTaskCheck}/>
	      </label>
           <div className="col-xs-12 col-sm-12 col-md-4">
               <p className="title">{props.todo.todoBody.title}</p>
               <div className="col-xs-12 date_created">
                   <span className="label label-success">Date Created | {props.todo.todoBody.dateCreated}</span>
               </div>
               <div className="col-xs-12 date_todo">
                   <span className="label label-primary">Date to Complete | {props.todo.todoBody.datetodo}</span>
               </div>
           </div>
           <div className="col-xs-12 col-sm-12 col-md-8 todo_desc">
               <p>{props.todo.todoBody.description}</p> <br/>
           </div>         
           <button className="btn btn-default btn-danger pull-right"
                   onClick={props.onDeleteBtnClick}
                   value={props.index}
                   id={props.id}>
                Delete
            </button>
           <button className="btn btn-primary pull-right"
               data-toggle="modal" data-target="#EditTaskModal"  
                   onClick={props.onEditBtnClick}
                   value={props.index}
                   id={props.id}>
            Edit Task
            </button>
       </li>
   );

};

module.exports = TodoListItem;