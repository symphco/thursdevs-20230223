import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyStatic from 'fastify-static';
import * as path from 'path';

const SERVER = fastify({
  logger: process.env.NODE_ENV !== 'test',
});

SERVER.register(fastifyStatic, {
  root: path.resolve(__dirname, '..', '..', '..', 'static'),
  prefix: '/static/',
});

SERVER.register(fastifyCors, {
  origin: true,
});

export default SERVER;
