require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT || 8080;

console.log('dot env:-', process.env.DEV_DB_USERNAME);

process.on('uncaughtException', (err) => {
  console.error(`${new Date().toUTCString()} uncaughtException: `, err);
  process.exit(0);
});

process.on('unhandledRejection', (err) => {
  console.error(`${new Date().toUTCString()} unhandledRejection: `, err);
  process.exit(0);
});

server.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}/foodplorer-api/v1`)
);
