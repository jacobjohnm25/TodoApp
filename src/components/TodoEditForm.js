const React = require('react');
const axios = require('axios');

class TodoEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoToEdit: this.props.todoToEdit
        }
        this.inputRef = null;
        this.descIp = null;
        this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
        this.handleRefInputEvt = this.handleRefInputEvt.bind(this);
        this.descInputEvt = this.descInputEvt.bind(this);
        this.toCompleteDateEvt = this.toCompleteDateEvt.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.descChange = this.descChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.todoToEdit !== this.props.todoToEdit) {
            this.setState({ todoToEdit: nextProps.todoToEdit });
        }
    }
    
    handleEditFormSubmit(e) {
        e.preventDefault();
        var id_to_update = this.props.todoToEdit._id;
        var EditedTodo = {
            todoBody:{
                title: this.state.todoToEdit.todoBody.title,
                description: this.state.todoToEdit.todoBody.description,
                datetodo: this.state.todoToEdit.todoBody.datetodo,
                completed: this.state.todoToEdit.todoBody.completed
            }
        };
        axios.put(`${this.props.urlToSubmitEdit}${id_to_update}`, EditedTodo)
                .then((response) => {
                    console.log(`${id_to_update}Todo Edited`);
                })
                .catch(err => {
                    console.error(err);
                });
        this.inputRef.value = '';
        this.descIp.value = '';
        this.dateToComplete.value = '';
    }
    
    handleRefInputEvt(inputRef) {
        this.inputRef = inputRef;
    }

    inputChange(evt) {
        var newTitle = {
                todoBody: {
                    title: evt.target.value,
                    description: this.state.todoToEdit.todoBody.description,
                    datetodo: this.state.todoToEdit.todoBody.datetodo,
                    completed: this.state.todoToEdit.todoBody.completed
                }
        };
        this.setState({ todoToEdit: newTitle});
    }

    descChange(evt){
        var newDesc = {
            todoBody: {
                title: this.state.todoToEdit.todoBody.title,
                description: evt.target.value,
                datetodo: this.state.todoToEdit.todoBody.datetodo,
                completed: this.state.todoToEdit.todoBody.completed
            }
        };
        this.setState({ todoToEdit: newDesc });
    }

    dateChange(evt){
        var newDate = {
            todoBody: {
                title: this.state.todoToEdit.todoBody.title,
                description: this.state.todoToEdit.todoBody.description,
                datetodo: evt.target.value,
                completed: this.state.todoToEdit.todoBody.completed
            }
        };
        this.setState({ todoToEdit: newDate });
    }

    descInputEvt(descIp) {
        this.descIp = descIp;
    }

    toCompleteDateEvt(dateToComplete) {
        this.dateToComplete = dateToComplete;
    }

    render() {
        return (
            <div className="modal fade" role="dialog" id={this.props.id} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Edit Task Form</h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.handleEditFormSubmit} >
                                <div className="form-group">
                                    <label htmlFor="todoforminput">Edit Task</label>
                                    <input type="text"
                                        id="todoforminput"
                                        className="form-control"
                                        placeholder="Example: Start the car"
                                        ref={this.handleRefInputEvt}
                                        onChange={this.inputChange}
                                        value={this.state.todoToEdit.todoBody.title}
                                    />
                                    <label htmlFor="tododesc">Edit Description of the Task</label>
                                    <textarea className="form-control"
                                        rows="3" name="description"
                                        placeholder="Add description"
                                        ref={this.descInputEvt}
                                        onChange={this.descChange}
                                        value={this.state.todoToEdit.todoBody.description}
                                        id="tododesc" required />
                                    <label htmlFor="tododate">Edit Date to complete Task</label>
                                    <input id="tododate" ref={this.toCompleteDateEvt} 
                                           onChange={this.dateChange} type="date" 
                                           value={this.state.todoToEdit.todoBody.datetodo} 
                                           className="form-control" />
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-success">
                                            Submit Edited Task
                                        </button>
                                        <button type="button" data-dismiss="modal"  className="btn btn-default">Close</button>
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

module.exports = TodoEditForm;
