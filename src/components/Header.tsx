'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const path = usePathname();
  if (path !== '/login') {
    if (path !== '/') {
      return (
        <div className=" bg-slate-700 flex justify-start py-4 px-4 text-slate-200 font-bold">
          <Link href="/">ホームヘ戻る</Link>
        </div>
      );
    }
  }
};

export default Header;
