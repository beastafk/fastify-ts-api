import Fastify, { FastifyInstance } from 'fastify'
import reservationRoutes from './reservation/reservation-routes';
import { BikeInfoSchema, BikeReservationSchema } from './reservation/reservation-schemas';

const server: FastifyInstance = Fastify({
  logger: true
});

server.addSchema({
  $id: 'bikeInfoSchema',
  ...BikeInfoSchema
});
server.addSchema({
  $id: 'bikeReservationSchema',
  ...BikeReservationSchema
});

server.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/documentation',
  swagger: {
    info: { title: 'Bike Reservation REST API' },
  },
});

server.register(reservationRoutes, {prefix: "/api/bikes/reserve"});

const start = async () => {
  try {
    const PORT = process.env.port || 8080;

    await server.listen(PORT, '0.0.0.0')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start();