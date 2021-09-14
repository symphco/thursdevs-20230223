import fastify from 'fastify';
import fastifyCors from 'fastify-cors';

const SERVER = fastify({
  logger: true,
});

SERVER.register(fastifyCors, {
  origin: true,
});

export default SERVER;
