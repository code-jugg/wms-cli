'use client';
import { useAuth } from '@/context/auth';
import AxiosClient from '@/lib/AxiosClient';
import { AxiosError } from 'axios';

const page = () => {
  const { user } = useAuth();
  const clh = async () => {
    try {
      const res = await AxiosClient.post('/create/location');
      alert(res.data.message);
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data);
      }
    }
  };
  if (user?.id === 'admin$12jugg') {
    return (
      <div>
        <button onClick={clh} className="w-12 h-6">
          clA
        </button>
      </div>
    );
  } else {
    return;
  }
};

export default page;
