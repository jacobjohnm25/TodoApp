const React = require('react');

class TodoSearch extends React.Component{ 
    constructor(props){
        super(props);
        this.searchInput = this.searchInput.bind(this);
        this.searchInputRef = this.searchInputRef.bind(this);
    }

    searchInput(searchEvt){
        var text = searchEvt.target.value;
        this.props.onTodoSearch(text);
    }

    searchInputRef(elemRef){
        this.elemRef = elemRef;
        this.elemRef.focus();
    }

    render(){
        return (
            <div className="container form-group todo_search">
                <hr />
                <input type="text" className="form-control" id={this.props.id}
                    value={this.props.todoText} placeholder="Search Todos..."
                    onChange={this.searchInput} ref={this.searchInputRef}/>
            </div>
        );
    }    
}



module.exports = TodoSearch;