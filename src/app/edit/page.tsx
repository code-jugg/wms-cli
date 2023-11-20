'use client';
import AxiosClient from '@/lib/AxiosClient';
import { Location } from '@/lib/types';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const page = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [location, setLocation] = useState<string | null>(null);
  if (location) {
    (async function clear() {
      try {
        const response = await AxiosClient.put(`/edit/${location}/clear`);
        alert(response.data.message);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error(err);
        }
      }
    })();
  }
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
      {locations.map((location, i) => {
        return (
          <div
            key={i}
            className="max-w-xs flex flex-col justify-center m-auto text-slate-200"
          >
            <div className="bg-slate-700 shadow-sm rounded px-8 pt-6 pb-8 m-3">
              <div className="pb-4">Pick{location.number}</div>
              <div className="">格納数: {location.QTY}cs</div>
              <div className="flex justify-end pt-6">
                <button
                  type="button"
                  id={location.number}
                  onClick={() => setLocation(location.number)}
                  className="bg-blue-700 hover:bg-blue-500 text-slate-200 font-bold py-2 px-8 rounded focus:outline-none"
                >
                  選択
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default page;
