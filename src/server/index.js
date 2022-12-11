const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const todoServiceImpl = require("./todo-service");

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
    console.log(`Initializing server at ${HOST_URL}`);
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, protoOptions);
    const todo_proto = grpc.loadPackageDefinition(packageDefinition).todo;

    const server = new grpc.Server();

    server.addService(todo_proto.TodoService.service, todoServiceImpl);
    console.log("Added Todo service");

    server.bindAsync(
        HOST_URL,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (!!err) {
                console.error(
                    `Error occured while initializing server \n${err}`
                );
            } else {
                server.start();
                console.log(`Server Initialized at ${port}`);
            }
        }
    );
};

main();
