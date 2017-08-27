const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todosSchema = Schema({
  kegiatan:  String,
  deskripsi: String,
  status : String
});

const modelTodos = mongoose.model('todos', todosSchema);
module.exports = modelTodos
