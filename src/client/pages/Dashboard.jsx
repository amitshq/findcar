import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getCarsUnder15Lakh from '@wasp/queries/getCarsUnder15Lakh';

export function DashboardPage() {
  const { data: cars, isLoading, error } = useQuery(getCarsUnder15Lakh);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {cars.map((car) => (
        <div
          key={car.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{car.name}</div>
          <div>{car.price}</div>
          <div>{car.releasedYear}</div>
        </div>
      ))}
      <Link to='/create-car' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Create Car</Link>
    </div>
  );
}