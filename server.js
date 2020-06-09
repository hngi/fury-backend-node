const http = require('http');
const app = require('./app');
const server = http.createServer(app);

const port = process.env.PORT || 4200;

server.listen(port, console.log(`Server started on port ${port}`));
