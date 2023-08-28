import HttpError from '@wasp/core/HttpError.js'

export const findNewCar = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const cars = await context.entities.Car.findMany({
    where: {
      releasedYear: { gte: 2021 },
      price: { lte: 1500000 }
    },
    orderBy: { releasedYear: 'desc' }
  });

  return cars;
}
