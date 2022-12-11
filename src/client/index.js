const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const { todoOperation } = require("./client-utils");

const HOST_URL = "127.0.0.1:8080";
const PROTO_PATH = path.join(__dirname, "..", "proto", "todo.proto");
const protoOptions = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const main = () => {
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, protoOptions);
    const todo_proto = grpc.loadPackageDefinition(packageDefinition).todo;

    const client = new todo_proto.TodoService(
        HOST_URL,
        grpc.credentials.createInsecure()
    );

    const argv = process.argv.slice(2);
    todoOperation(client, argv);
};

main();
