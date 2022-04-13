import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import ReservationDataProvider, { IBike } from "./reservation-data-provider";
import { IBikeReservation, ReservationHandler } from "./reservation-handler";
import BikeListReservationSchema, { BikeReserveRequestSchema, ReservedBikeRequestSchema } from "./reservation-schemas";
import { ReservationValidator } from "./reservation-validator";

type ListBikesRequest = FastifyRequest<{
  Querystring: { city: string }
}>
type ReserveBikeRequest = FastifyRequest<{
  Body: { uuid: string }
}>
type ReservedBikeRequest = FastifyRequest<{
  Params: { uuid: string }
}>

const reservationRoutes: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
  // list all free bikes
  server.get('/', { schema: BikeListReservationSchema }, async function (req: ListBikesRequest, reply: FastifyReply) {
    const freeBikes = await ReservationDataProvider.findAllFreeBikesByCity(req.query.city);

    return reply.send(freeBikes);
  });

  // reserve a bike
  server.post('/', { schema: BikeReserveRequestSchema }, async function (req: ReserveBikeRequest, reply: FastifyReply) {
    const bikeToReserve = await ReservationDataProvider.findOneBikeByUuid(req.body.uuid) as IBike;

    if (!await ReservationValidator.canBeReserved(bikeToReserve)) {
      return reply.code(400).send({
        statusCode: 400,
        message: 'Bike cannot be reserved',
        eror: 'bike_cannot_be_reserved'
      });
    }

    const newReservation = await ReservationHandler.makeReservation(bikeToReserve);

    return reply.send(newReservation);
  });

  // get info about reservation
  server.get('/:uuid', { schema: ReservedBikeRequestSchema }, async function (req: ReservedBikeRequest, reply: FastifyReply) {
    const bikeReservation = await ReservationDataProvider.findReservationByUuid(req.params.uuid) as IBikeReservation;

    return reply.send(bikeReservation);
  });

  server.put('/:uuid', {schema: ReservedBikeRequestSchema }, async function (req: ReservedBikeRequest, reply: FastifyReply) {
    const bikeReservation = await ReservationDataProvider.findReservationByUuid(req.params.uuid) as IBikeReservation;
    bikeReservation.bike.battery = '33%';

    return reply.send(bikeReservation);
  });

  server.delete('/:uuid', async function (req: ReservedBikeRequest, reply: FastifyReply) {
    const bikeReservation = await ReservationDataProvider.findReservationByUuid(req.params.uuid) as IBikeReservation;
    // delete bike reservation
    return reply.send({});
  })
};

export default reservationRoutes;