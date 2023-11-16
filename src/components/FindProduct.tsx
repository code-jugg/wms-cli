import AxiosClient from '@/lib/AxiosClient';
import { Product } from '@/lib/types';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

type ProductProps = {
  id?: (text: string | null) => void;
  JAN?: string;
};

const FindProduct = ({ id, JAN }: ProductProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const returnProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    id?.(e.currentTarget.id);
  };
  useEffect(() => {
    (async function dataFetch() {
      try {
        const response = await AxiosClient.get(`/find/${JAN}/product`);
        setProducts(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          alert(err.response?.data.message);
        }
      }
    })();
  }, []);
  return products.map((product, i) => {
    return (
      <div
        key={i}
        className="max-w-xs flex flex-col justify-center m-auto text-slate-200"
      >
        <div className="bg-slate-700 shadow-sm rounded px-8 pt-6 pb-8 m-6">
          <div className="pb-4">製品名: {product.name}</div>
          <div className="">製品番号: {product.code}</div>
          <div className="">枝番: {product.branch}</div>
          <div className="text-xs">製造年月日{product.MFD}</div>
          <div className="">賞味期限: {product.BBE}</div>
          <div className="flex justify-end pt-6">
            <button
              type="button"
              id={product.id}
              onClick={returnProduct}
              className="bg-blue-700 hover:bg-blue-500 text-slate-200 font-bold py-2 px-8 rounded focus:outline-none"
            >
              選択
            </button>
          </div>
        </div>
      </div>
    );
  });
};

export default FindProduct;
