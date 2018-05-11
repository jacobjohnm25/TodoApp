const React = require('react');
const ReactDOM = require('react-dom');
const TodoComp = require('./components/TodoComp');

ReactDOM.render(
    <div>
        <TodoComp url='http://localhost:8000/' />
    </div>,
    document.getElementById('root')
);