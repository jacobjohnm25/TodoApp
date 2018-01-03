const React = require('react');
const constants = require('../constants');
const ALL = constants.ALL;
const COMPLETED = constants.COMPLETED;

var Filter = (props)=>{
    var currentFilter= props.currentFilter;
    var filterName = props.filterName;
    var filterStyle = "btn btn-default btn-sm todo_filter";
    if (currentFilter === filterName){
         filterStyle = "btn btn-info btn-sm todo_filter"
    }
    return(
        <a href="#" className={filterStyle} onClick={(evt)=>{props.onFilterChange(evt, filterName);}}>
            <strong>{props.children}</strong>
        </a>
    );
};

var TodoFilter = (props) =>{
    return(
       <div className="container text-center">
            {'Filter: '}
            <Filter currentFilter={props.currentFilter} onFilterChange={props.onFilterChange} filterName={ALL}>{ALL}</Filter>
            <Filter currentFilter={props.currentFilter} onFilterChange={props.onFilterChange} filterName={COMPLETED}>{COMPLETED}</Filter>
       </div>       
    );
};


module.exports = TodoFilter;