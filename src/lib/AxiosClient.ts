import axios from 'axios';

const AxiosClient = axios.create({
  baseURL: 'https://wms-api-c3es.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://wms-api-c3es.onrender.com/',
  },
  withCredentials: true,
});

export default AxiosClient;
