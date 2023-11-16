'use client';
import { useAuth } from '@/context/auth';
import AxiosClient from '@/lib/AxiosClient';
import { Login } from '@/lib/types';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const page = () => {
  const { user } = useAuth();
  const [value, setValue] = useState<Login | null>(null);
  const handleLogin = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const response = await AxiosClient.post('/auth/login', value);
      alert(response.data.message);
      location.reload();
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data.message);
      }
    }
  };
  if (!user) {
    return (
      <div className="w-full h-full max-w-xs flex flex-col justify-center mt-6 mx-auto">
        <form
          onSubmit={handleLogin}
          className="bg-slate-700 shadow-sm rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="id_email"
              className="block text-slate-200 text-sm font-bold mb-2"
            >
              ユーザーIDまたはメールアドレス
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none"
              id="id_email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue({
                  ...value,
                  id: e.target.value,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-slate-200 text-sm font-bold mb-2"
              htmlFor="password"
            >
              パスワード
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue({ ...value, password: e.target.value });
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-700 hover:bg-blue-500 text-slate-200 font-bold py-2 px-4 rounded focus:outline-none"
              type="submit"
            >
              ログイン
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-slate-400 hover:text-slate-200"
              href="/forgot"
            >
              パスワードを忘れた
            </Link>
          </div>
        </form>
      </div>
    );
  } else {
    redirect('/');
  }
};

export default page;
