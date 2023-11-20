'use client';
import AxiosClient from '@/lib/AxiosClient';
import { Location } from '@/lib/types';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const page = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  useEffect(() => {
    try {
      (async function fetchData() {
        const response = await AxiosClient.get('/edit/stored');
        setLocations(response.data);
      })();
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(err.response?.data.message);
      }
    }
  });
  return (
    <div>
      {locations.map((location) => {
        return <div>{location.number}</div>;
      })}
    </div>
  );
};

export default page;
