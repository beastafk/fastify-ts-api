export const BIKE_STATUS_FREE = 'free';
export const BIKE_STATUS_RESERVED = 'reserved';

export const BikeInfoSchema = {
  type: 'object',
  properties: {
    'uuid': {
      type: 'string'
    },
    'model': {
      type: 'string'
    },
    'battery': {
      type: 'string'
    },
    'city': {
      type: 'string'
    },
    'status': {
      type: 'string',
      enum: [BIKE_STATUS_FREE, BIKE_STATUS_RESERVED]
    }
  }
}

export const BikeReservationSchema = {
  type: 'object',
  properties: {
    'uuid': {
      type: 'string'
    },
    'bike': {
      ...BikeInfoSchema
    }
  }
}

export const BikeListRequestSchema: Record<string, object|string> = {
  description: 'Lists all available bikes',
  querystring: {
    type: 'object',
    properties: {
      city: {
        type: 'string'
      }
    },
    required: ['city']
  },
  response: {
    200: {
      type: 'array',
      items: {
        ...BikeInfoSchema
      }
    }
  }
}

export const BikeReserveRequestSchema: Record<string, object|string> = {
  description: 'Creates Bike Reservation',
  body: {
    type: 'object',
    properties: {
      uuid: {
        type: 'string'
      }
    },
    required: ['uuid']
  },
  response: {
    200: {
      ...BikeReservationSchema
    }
  }
}

export const ReservedBikeRequestSchema: Record<string, object|string> = {
  description: 'Used for retrieving or updating an existing reservation',
  params: {
    type: 'object',
    properties: {
      uuid: {
        type: 'string'
      }
    },
    required: ['uuid']
  },
  response: {
    200: {
      ...BikeReservationSchema
    }
  }
}

export default BikeListRequestSchema;