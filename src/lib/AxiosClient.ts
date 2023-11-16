import axios from 'axios';

const AxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default AxiosClient;
