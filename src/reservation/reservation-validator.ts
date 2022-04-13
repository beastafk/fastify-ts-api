import { IBike } from "./reservation-data-provider";
import { BIKE_STATUS_FREE } from "./reservation-schemas";

export const ReservationValidator = {
  canBeReserved: async (bike: IBike) => {
    return bike.status === BIKE_STATUS_FREE;
  }
}