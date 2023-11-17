'use client';
import { useAuth } from '@/context/auth';
import AxiosClient from '@/lib/AxiosClient';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

export default function Home() {
  const { user } = useAuth();
  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await AxiosClient.delete('/auth/logout');
      alert(response.data.message);
      location.reload();
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(err.response?.data.message);
      }
    }
  };
  if (user) {
    return (
      <main className="w-full h-full max-w-xs flex flex-col text-center justify-center mx-auto text-white font-bold">
        <Link href="/create" className="bg-slate-700 rounded py-6 my-2">
          新製品
        </Link>
        <Link href="/receiving" className="bg-slate-700 rounded py-6 my-2">
          入荷
        </Link>
        <Link href="/shipping" className="bg-slate-700 rounded py-6 my-2">
          出荷
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-slate-700 rounded py-6 my-2"
        >
          ログアウト
        </button>
      </main>
    );
  } else {
    redirect('/login');
  }
}
