const { v4: uuidv4 } = require("uuid");

const todoList = [];

exports.addTodo = (call, callback) => {
    const todo = call.request;
    todo["id"] = uuidv4();
    todoList.push(todo);
    callback(null, todo);
};

exports.getTodoById = (call, callback) => {
    const { id } = call.request;
    const todo = todoList.find((todo) => todo.id === id);
    const err = !!todo ? null : new Error(`Not found todo with id: ${id}`);
    callback(err, todo);
};

exports.getAllTodos = (call, callback) => {
    callback(null, { todos: todoList });
};

exports.deleteTodo = (call, callback) => {
    const { id } = call.request;
    const index = todoList.findIndex((todo) => todo.id === id);
    if (index !== -1) {
        todoList.splice(index, 1);
    }
    const err =
        index !== -1 ? null : new Error(`Not found todo with id: ${id}`);
    callback(err, { todos: todoList });
};
