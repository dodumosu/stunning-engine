const { createServer } = require('http');
require('./config');
const app = require('./app');

const getServerPort = (portSpec) => {
  const port = Number.parseInt(portSpec, 10);
  if (Number.isNaN(port)) return false;
  if (port > 0) return port;
  return false;
};

const port = getServerPort(process.env.PORT) || 3000;
const server = createServer(app);

server.listen(port);
