'use client';
import Calculator from '@/components/Calculator';
import FindLocation from '@/components/FindLocation';
import FindProduct from '@/components/FindProduct';
import Scanner from '@/components/Scanner';
import { useState } from 'react';

const page = () => {
  const [JAN, setJAN] = useState<string | null>(null);
  const [product, setProduct] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  return (
    <div>
      {JAN ? (
        product ? (
          location ? (
            <Calculator p={product} l={location} />
          ) : (
            <FindLocation
              id={(result) => setLocation(result)}
              product={product}
            />
          )
        ) : (
          <FindProduct id={(result) => setProduct(result)} JAN={JAN} />
        )
      ) : (
        <Scanner onReadCode={(result) => setJAN(result.getText())} />
      )}
    </div>
  );
};

export default page;
