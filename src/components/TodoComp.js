const React = require('react');
const TopHeader = require('./TopHeader');
const TodoSearch = require('./TodoSearch');
const TodoFilter = require('./TodoFilter');
const TodoList = require('./TodoList');
const constants = require('../constants');
const axios = require('axios');
const ALL = constants.ALL;
const COMPLETED = constants.COMPLETED;


class TodoComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            todoToEdit:{
                _id:'',
                todoBody: {
                    title:'',
                    description:'',
                    datetodo:'',
                    dateCreated:'',
                    completed: false
                }
            },
            currentFilter:ALL,
            searchTerm: ''
        }
        this.loadTodosFromServer = this.loadTodosFromServer.bind(this);
        this.handleNewTodoItem = this.handleNewTodoItem.bind(this);
        this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
        this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
        this.handleDidTaskCheck = this.handleDidTaskCheck.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleTodoSearch = this.handleTodoSearch.bind(this);
    }

    loadTodosFromServer() {
        axios.get(`${this.props.url}todos`)
            .then((res) => {
                this.setState({ todos: res.data });
            });
    }

    // ON CheckBox Click
    handleDidTaskCheck(evt){
        var id_to_edit = evt.target.id;
        evt.target.checked = true;
        this.setState((prevState) => {
            var todos = prevState.todos;
            var todo = todos.find((todo) => { return todo.id === id_to_edit});
            axios.put(`${this.props.url}${id_to_edit}/completed`, todo)
                .then((response) => {
                    this.setState({ todos: todos });
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ todos: prevState.todos });
                });
            return {
                todos: todos
            };
        });
    }
    
    // CREATE NEW Todo TASKs
    handleNewTodoItem(todo){
         this.setState( (prevState) => {
             var todos = prevState.todos.concat(todo);
             axios.post(this.props.url, todo)
                  .then((response) => {
                    todo._id = response.data._id;
                    this.setState({ todos: todos });
                  })
                  .catch(err => {
                      this.setState({ todos: prevState.todos});
                 }); 
             return {
                 todos: todos
             };        
         });
    }

    // DELETE a Todo TASK
    handleDeleteBtnClick(evt) {
        // var index = Number(evt.target.value);
        var index = null;
        var id_to_delete = evt.target.id;
        this.setState((prevState) => {
            var todos = prevState.todos;
            var index = todos.findIndex((todo) => {return todo._id === id_to_delete});
            axios.delete(`${this.props.url}${id_to_delete}`)
                .then((response) => {
                    console.log(`${id_to_delete} todo Deleted`);
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ todos: prevState.todos });
                });
            todos = todos.slice(0, index).concat(todos.slice(index + 1));      
            return {
                todos: todos
            };
        });
    }

    // EDIT a Todo TASK
    handleEditBtnClick(evt) {
        var id_to_update = evt.target.id;
        this.setState((prevState) =>{
            var todos = prevState.todos;
            var todo = todos.find(function (todo) { return todo._id === id_to_update; });
            return {
                todoToEdit: todo
            };   
        });
    }
    
    // Takes Care of Filter State
    handleFilterChange(evt, currentFilter){
        evt.preventDefault();
        this.setState((prevState)=>{
            return {
                currentFilter: currentFilter
            };
        });
    }

    handleTodoSearch(searchTerm) {
        this.setState((prevState)=>{
            return {
                searchTerm: searchTerm
            };
        });
    }
    
    filterTodos(){
        var todos = this.state.todos;
        var currentFilter = this.state.currentFilter;
        var filteredTodos = [];
        var searchTerm = this.state.searchTerm;

        for (var i = 0; i < todos.length; ++i) {
                var todoItem = todos[i];
                if (todoItem.todoBody.title.indexOf(searchTerm) === -1) {
                    continue;
                }
                if (currentFilter === COMPLETED && !todoItem.completed) {
                    continue;
                }
                filteredTodos.push(todoItem);
        }
        return filteredTodos;
    }

    componentDidMount() {
        this.loadTodosFromServer();
        setInterval(this.loadTodosFromServer, 5000);
    }

    render() {
        var todos = this.filterTodos();
        return (
            <div>
                <TopHeader id="AddTaskModal" 
                    onNewTodoItem={this.handleNewTodoItem}
                />
                <TodoSearch id="TodoSearch" todoText={this.state.searchTerm} onTodoSearch={this.handleTodoSearch}/>
                <TodoFilter onFilterChange={this.handleFilterChange} 
                            currentFilter={this.state.currentFilter}/>
                <hr/>
                <TodoList todos={this.state.todos}
                    urlToSubmitEdit={this.props.url} 
                    todoToEdit={this.state.todoToEdit}
                    onEditBtnClick={this.handleEditBtnClick} 
                    onDeleteBtnClick={this.handleDeleteBtnClick}
                    onDidTaskCheck={this.handleDidTaskCheck}/>    
            </div>            
        );

    }
}

module.exports = TodoComp;