const parseArgument = (argv, key) => {
    const argument = argv.find((arg) => arg.includes(key + "="));
    if (!argument) {
        throw new Error(`${key} not found`);
    }
    return argument.split("=")[1];
};

const addTodo = (client, argv) => {
    const name = parseArgument(argv, "name");
    const description = parseArgument(argv, "description");

    client.addTodo({ name, description }, (err, response) => {
        if (!!err) {
            console.error(err);
        } else {
            console.log(response);
        }
    });
};

const getTodoById = (client, argv) => {
    const id = parseArgument(argv, "id");

    client.getTodoById({ id }, (err, response) => {
        if (!!err) {
            console.error(err);
        } else {
            console.log(response);
        }
    });
};

const getAllTodos = (client) => {
    client.getAllTodos(null, (err, response) => {
        if (!!err) {
            console.error(err);
        } else {
            console.log(response);
        }
    });
};

const deleteTodo = (client, argv) => {
    const id = parseArgument(argv, "id");

    client.deleteTodo({ id }, (err, response) => {
        if (!!err) {
            console.error(err);
        } else {
            console.log(response);
        }
    });
};

exports.todoOperation = (client, argv) => {
    const operation = parseArgument(argv, "operation");

    if (operation === "add") {
        addTodo(client, argv);
    } else if (operation === "getbyid") {
        getTodoById(client, argv);
    } else if (operation === "getall") {
        getAllTodos(client);
    } else if (operation === "delete") {
        deleteTodo(client, argv);
    } else {
        console.error("Invalid Operation");
    }
};
