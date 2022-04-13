import { IBike } from "./reservation-data-provider";
import { BIKE_STATUS_RESERVED } from "./reservation-schemas";

export interface IBikeReservation {
  uuid: string;
  bike: IBike;
}

export const ReservationHandler = {
  async makeReservation(bike: IBike): Promise<IBikeReservation> {
    bike.status = BIKE_STATUS_RESERVED;
    const bikeReservation = {
      uuid: '2808bda2-c501-425a-9e9a-730fd3e66fff',
      bike: bike,
    }

    return bikeReservation;
  }
};