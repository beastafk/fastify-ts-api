import { IBikeReservation } from './reservation-handler';
import { BIKE_STATUS_FREE } from './reservation-schemas';

export interface IBike {
  uuid: string;
  status: string;
  model: string;
  battery: string;
  city: string;
}

const bikes: IBike[] = [
  { uuid: 'b54a4074-e329-4052-ab95-c413058df506', status: 'free', model: 'Comfort', battery: '30%', city: 'Sofia' },
  { uuid: 'a49cd437-c649-43bb-b2e5-e57c29c8cd3a', status: 'free', model: 'Urban', battery: '25%', city: 'Sofia' },
  { uuid: '1f40bd78-cd08-400a-b368-de212d9ac285', status: 'free', model: 'Cross Country', battery: '99%', city: 'Sofia' },
  { uuid: '265728c9-dbac-497b-bedf-23cfaa3a1e38', status: 'free', model: 'Comfort', battery: '10%', city: 'Berlin' },
  { uuid: '81c608db-da0b-4282-8d4f-22c8a0181897', status: 'free', model: 'Urban', battery: '75%', city: 'Berlin' },
  { uuid: '95ec545b-d293-4bfb-93d1-40003cb732eb', status: 'free', model: 'Cross Country', battery: '50%', city: 'Berlin' },
];

const sampleReservation: IBikeReservation = {
  'uuid': 'c649-43bb-b2e5-e57c29c8cd3a-dsa',
  'bike': {
      'uuid': 'a49cd437-c649-43bb-b2e5-e57c29c8cd3a',
      'model': 'Urban',
      'battery': '25%',
      'city': 'Sofia',
      'status': 'reserved'
  }
}

const ReservationDataProvider = {
  findAllFreeBikesByCity: async (city: string): Promise<IBike[]> => {
    // simulate some DB searching
    return bikes.filter((bike) => {
      return bike.city === city && bike.status == BIKE_STATUS_FREE;
    })
  },

  findOneBikeByUuid: async (uuid: string): Promise<IBike|undefined> => {
    const bike = bikes.find((bike) => {
      return bike.uuid === uuid;
    })
    return bike;
  },

  findReservationByUuid: async (uuid: string): Promise<IBikeReservation> => {
    return sampleReservation;
  }

};

export default ReservationDataProvider;