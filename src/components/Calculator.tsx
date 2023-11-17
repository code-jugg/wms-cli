import AxiosClient from '@/lib/AxiosClient';
import { calc } from '@/lib/calc';
import { Location, Product } from '@/lib/types';
import { AxiosError } from 'axios';
import { usePathname } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';

const Calculator = ({ p, l }: { p: string; l: string }) => {
  const [product, setProduct] = useState<Product>();
  const [location, setLocation] = useState<Location>();
  const [value, setValue] = useState<{
    turn: string;
    step: string;
    surplus: string;
  }>({
    turn: '',
    step: '',
    surplus: '',
  });
  const [QTY, setQTY] = useState<number | null>(null);
  useEffect(() => {
    (async function fetchData() {
      try {
        const product = await AxiosClient.get(`/find/product/${p}/select`);
        const location = await AxiosClient.get(`/find/location/${l}/select`);
        setLocation(location.data);
        setProduct(product.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          alert(err.response?.data.message);
        }
      }
    })();
  });
  const path = usePathname();
  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const response = await AxiosClient.put(`${path}/${location?.number}`, {
        productId: product?.id,
        QTY,
      });
      alert(response.data.message);
      window.location.reload();
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data.message);
      }
    }
  };
  return (
    <div className="max-w-xs flex flex-col justify-center m-auto text-slate-200">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-700 shadow-sm rounded px-8 pt-6 pb-8 m-3"
      >
        <div className="flex">
          <div>
            <label
              htmlFor="turn"
              className="block text-slate-200 text-sm font-bold mb-2"
            >
              回し
            </label>
            <input
              type="text"
              id="turn"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none"
              pattern="\d+"
              required
              defaultValue={0}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue({ ...value, turn: e.target.value });
              }}
            />
          </div>
          <p className="pt-8 px-2">×</p>
          <div>
            <label
              htmlFor="step"
              className="block text-slate-200 text-sm font-bold mb-2"
            >
              段数
            </label>
            <input
              type="text"
              id="step"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none"
              pattern="\d+"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue({ ...value, step: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3">
            <label
              htmlFor="surplus"
              className="block text-slate-200 text-sm font-bold mb-2 mt-4"
            >
              余剰
            </label>
            <input
              type="text"
              id="surplus"
              className="shadow appearance-none border rounded py-2 w-full text-slate-700 leading-tight focus:outline-none"
              pattern="\d+"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue({ ...value, surplus: e.target.value });
              }}
            />
          </div>
          <div className="flex items-end w-2/3 px-3">
            ={calc(value.turn, value.step, value.surplus)}
            cs
          </div>
        </div>
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            onClick={() =>
              setQTY(
                parseInt(value.turn) * parseInt(value.step) +
                  parseInt(value.surplus)
              )
            }
            className="bg-blue-700 hover:bg-blue-500 text-slate-200 font-bold py-2 px-8 rounded focus:outline-none"
          >
            送信
          </button>
        </div>
      </form>
      <div className="bg-slate-700 shadow-sm rounded px-8 pt-6 pb-8 m-3">
        <h1 className="border-b border-slate-400 pb-2 font-semibold">
          ロケーション情報
        </h1>
        <div className="pt-4">
          <div>ロケーション番号: Pick{location?.number}</div>
          <div>在庫数: {location?.QTY}cs</div>
        </div>
      </div>
      <div className="bg-slate-700 shadow-sm rounded px-8 pt-6 pb-8 m-3">
        <h1 className="border-b border-slate-400 pb-2 font-semibold">
          製品情報
        </h1>
        <div className="pt-4">
          <div>製品名:{product?.name}</div>
          <div>製品番号: {product?.code}</div>
          <div>枝番: {product?.branch}</div>
          <div className="text-xs">製造年月日: {product?.MFD}</div>
          <div>賞味期限: {product?.BBE}</div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
