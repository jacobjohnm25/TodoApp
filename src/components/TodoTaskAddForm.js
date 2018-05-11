const React = require('react');
const moment = require('moment');
const jQuery = require('jquery');

class TodoTaskAddForm extends React.Component{
   constructor(props){
       super(props);
       this.state = {
            newTodo:{
                _id:'',
                todoBody:{
                    title: '',
                    description: '',
                    dateCreated: '',
                    datetodo: '',
                    completed: false
                }
            }
       }
    //    this.inputRef = null;
    //    this.descIp = null;
       this.handleFormSubmit = this.handleFormSubmit.bind(this);
       this.sumbitBtnClick = this.sumbitBtnClick.bind(this);
       this.handleRefInputEvt = this.handleRefInputEvt.bind(this);
       this.descInputEvt = this.descInputEvt.bind(this);
       this.toCompleteDateEvt = this.toCompleteDateEvt.bind(this);
   }

   sumbitBtnClick(evt){
       console.log("Clicked");
       console.log(evt);
       jQuery(".modal").show = false;
   }

   dateTodoCreated(){
       var date = new Date();
       var formatDate = (date) => {
           var hours = date.getHours();
           var minutes = date.getMinutes();
           var ampm = hours >= 12 ? 'pm' : 'am';
           hours = hours % 12;
           hours = hours ? hours : 12; // the hour '0' should be '12'
           minutes = minutes < 10 ? '0' + minutes : minutes;
           var strTime = hours + ':' + minutes + ' ' + ampm;
           return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
       };
       var date_created = formatDate(date);
       return date_created;
   }

   handleFormSubmit(e){
       e.preventDefault();
    //    var todo = {
    //        _id:null,
    //        todoBody: {
    //            title: this.inputRef.value,
    //            description: this.descIp.value,
    //            dateCreated: this.dateTodoCreated(),
    //            datetodo: this.dateToComplete.value,
    //            completed: false
    //        }
    //    };
       var newTodotitle = (this.state.newTodo.todoBody.title).trim();
       var newTododesc = (this.state.newTodo.todoBody.description).trim();
       var newTododateTodo = this.state.newTodo.todoBody.datetodo;

       var todo = {
           _id: null,
           todoBody: {
               title: newTodotitle,
               description: newTododesc,
               dateCreated: this.dateTodoCreated(),
               datetodo: newTododateTodo,
               completed: false
           }
       };

       this.props.onNewTodoItem(todo);

       this.setState({
           newTodo: {
               _id: '',
                todoBody:{
                    title: '',
                    description: '',
                    dateCreated: '',
                    datetodo: '',
                    completed: false
                  }
             }
       });

    //    this.inputRef.value = '';
    //    this.descIp.value = '';
    //    this.dateToComplete.value = '';
   }

//    handleRefInputEvt(inputRef){
//        this.inputRef = inputRef;
//    }

//    descInputEvt(descIp){
//        this.descIp = descIp;
//    }

//    toCompleteDateEvt(dateToComplete){
//        this.dateToComplete = dateToComplete;
//    }

    handleRefInputEvt(inputChangeEvt){
        this.setState({
            newTodo: {
                _id: '',
                todoBody: {
                    title: inputChangeEvt.target.value,
                    description: this.state.newTodo.todoBody.description,
                    datetodo: this.state.newTodo.todoBody.datetodo,
                    dateCreated: this.state.newTodo.todoBody.dateCreated,
                    completed: this.state.newTodo.todoBody.completed
                }
            }
        });    
    }

    descInputEvt(descChangeEvt) {
        this.setState({
            newTodo: {
                _id: '',
                todoBody: {
                    title: this.state.newTodo.todoBody.title,
                    description: descChangeEvt.target.value,
                    datetodo: this.state.newTodo.todoBody.datetodo,
                    dateCreated: this.state.newTodo.todoBody.dateCreated,
                    completed: this.state.newTodo.todoBody.completed
                }
            }
        });
    }
    
    toCompleteDateEvt(datetodoChangeEvt){
        this.setState({
            newTodo: {
                _id: '',
                todoBody: {
                    title: this.state.newTodo.todoBody.title,
                    description: this.state.newTodo.todoBody.description,
                    datetodo: datetodoChangeEvt.target.value,
                    dateCreated: this.state.newTodo.todoBody.dateCreated,
                    completed: this.state.newTodo.todoBody.completed
                }
            }
        });
    }

   render(){
    return(
        <div className="modal fade" role="dialog" id={this.props.id}>
        <div className="modal-dialog">  
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Add Task Form</h4>
                </div>
                <div className="modal-body">
                    <form onSubmit={this.handleFormSubmit} >
                        <div className="form-group">
                            <label htmlFor="todoforminput">Enter task to Do</label>
                            <input type="text" 
                                   id="todoforminput" 
                                   className="form-control"
                                   placeholder="Example: Start the car"
                                   onChange={this.handleRefInputEvt}
                                   value={this.state.newTodo.todoBody.title}
                                   required />
                            <label htmlFor="tododesc">Enter Description of the Task</label>
                            <textarea className="form-control" 
                                      rows="3" name="description" 
                                      placeholder="Add description"
                                      onChange={this.descInputEvt}
                                      value={this.state.newTodo.todoBody.description}
                                      id="tododesc" required/>
                            <label htmlFor="tododate">Enter Date to complete Task</label>          
                            <input id="tododate" 
                                    onChange={this.toCompleteDateEvt}
                                    value={this.state.newTodo.todoBody.datetodo}
                                   type="date" className="form-control" required/>          
                            <div className="modal-footer">
                                    <button type="submit" className="btn btn-success" onClick={this.sumbitBtnClick}>
                                        Add Task
                                    </button>
                                    <button type="button" data-dismiss="modal" className="btn btn-default">Close</button>
                            </div>
                        </div>
                    </form>
                </div> {/* Modal Body */}
            </div> {/* Modal Content */}
        </div>  {/* Modal Dialog */}
    </div>  
    );
   } 
}

module.exports = TodoTaskAddForm;
