const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    todoBody: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        dateCreated: { type: String, default: Date.now },
        datetodo: { type: String, required: true },
        completed: { type: Boolean, default: false }
    }
});


module.exports = mongoose.model('todo', todoSchema);