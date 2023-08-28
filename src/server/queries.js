import HttpError from '@wasp/core/HttpError.js'

export const getCar = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const car = await context.entities.Car.findUnique({
    where: { id: args.id, userId: context.user.id },
  });

  if (!car) { throw new HttpError(400) }

  return car;
}

export const getCarsUnder15Lakh = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Car.findMany({
    where: {
      price: { lt: 1500000 }
    }
  });
}