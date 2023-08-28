import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getCar from '@wasp/queries/getCar';
import updateCar from '@wasp/actions/updateCar';

export function CarPage() {
  const { carId } = useParams();
  const { data: car, isLoading, error } = useQuery(getCar, { id: parseInt(carId) });
  const updateCarFn = useAction(updateCar);
  const [newPrice, setNewPrice] = useState(0);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateCar = () => {
    updateCarFn({ id: car.id, price: newPrice });
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <div className='font-bold'>Name:</div>
        <div>{car.name}</div>
      </div>
      <div className='mb-4'>
        <div className='font-bold'>Price:</div>
        <div>{car.price}</div>
      </div>
      <div className='mb-4'>
        <div className='font-bold'>Released Year:</div>
        <div>{car.releasedYear}</div>
      </div>
      <div className='mb-4'>
        <div className='font-bold'>User:</div>
        <div>{car.user.username}</div>
      </div>
      <div className='mb-4'>
        <div className='font-bold'>New Price:</div>
        <input
          type='number'
          className='border rounded px-2 py-1'
          value={newPrice}
          onChange={(e) => setNewPrice(parseInt(e.target.value))}
        />
      </div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleUpdateCar}
      >
        Update Price
      </button>
      <Link
        to={`/dashboard`}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
      >
        Dashboard
      </Link>
    </div>
  );
}