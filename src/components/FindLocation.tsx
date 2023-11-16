import AxiosClient from '@/lib/AxiosClient';
import { Location } from '@/lib/types';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

type LocationProps = {
  id?: (text: string | null) => void;
  product?: string;
};

const FindLocation = ({ id, product }: LocationProps) => {
  const returnLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    id?.(e.currentTarget.id);
  };
  const [locations, setLocations] = useState<Location[]>([]);
  useEffect(() => {
    (async function dataFetch() {
      try {
        const response = await AxiosClient.get(`/find/${product}/stored`);
        setLocations(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          alert(err.response?.data.message);
        }
      }
    })();
  }, []);
  const fetchEmpty = async () => {
    try {
      const empty = await AxiosClient.get(`/find/empty`);
      setLocations(empty.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(err.message);
      }
    }
  };
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
                  onClick={returnLocation}
                  className="bg-blue-700 hover:bg-blue-500 text-slate-200 font-bold py-2 px-8 rounded focus:outline-none"
                >
                  選択
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex justify-center px-3">
        <div className="flex justify-end">
          <button
            onClick={fetchEmpty}
            className="bg-blue-700 hover:bg-blue-500 text-slate-200 font-bold py-2 px-8 rounded focus:outline-none"
          >
            正PL入荷
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindLocation;
