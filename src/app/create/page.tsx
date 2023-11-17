'use client';
import Scanner from '@/components/Scanner';
import AxiosClient from '@/lib/AxiosClient';
import { AxiosError } from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';

const page = () => {
  const [value, setValue] = useState<{
    name?: string;
    code?: string;
    branch?: string;
    MFD?: string;
    BBE?: string;
  } | null>(null);
  const [JAN, setJAN] = useState<string | null>(null);
  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const response = await AxiosClient.post('/create/product', {
        ...value,
        JAN,
      });
      alert(response.data.message);
      window.location.reload();
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message);
      }
    }
  };
  return (
    <>
      {JAN ? (
        <div className="max-w-xs flex flex-col justify-center m-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-slate-700 shadow-sm rounded px-8 pt-6 pb-8 m-6"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-slate-200 text-sm font-bold mb-2"
              >
                製品名
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setValue({ ...value, name: e.target.value });
                }}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="code"
                className="block text-slate-200 text-sm font-bold mb-2"
              >
                製品番号
              </label>
              <input
                type="text"
                id="code"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValue({ ...value, code: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="branch"
                className="block text-slate-200 text-sm font-bold mb-2"
              >
                枝番
              </label>
              <input
                type="text"
                id="branch"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValue({ ...value, branch: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="MFD"
                className="block text-slate-200 text-sm font-bold mb-2"
              >
                製造日
              </label>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValue({ ...value, MFD: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="BBE"
                className="block text-slate-200 text-sm font-bold mb-2"
              >
                賞味期限
              </label>
              <input
                type="date"
                id="BBE"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValue({ ...value, BBE: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-500 text-slate-200 font-bold py-2 px-8 rounded focus:outline-none"
            >
              送信
            </button>
          </form>
        </div>
      ) : (
        <Scanner onReadCode={(result) => setJAN(result.getText())} />
      )}
    </>
  );
};

export default page;
