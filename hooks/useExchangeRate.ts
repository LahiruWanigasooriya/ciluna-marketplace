// import { fetchExchangeRate } from "@/utils/getDiscountPrice";
// import { useEffect, useState } from "react";

// export function useExchangeRate(defaultRate: number = 300) {
//   const [rate, setRate] = useState<number>(defaultRate);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchRate = async () => {
//       try {
//         const excRate = await fetchExchangeRate();
//         setRate(excRate);
//       } catch (err) {
//         setError(err as Error);
//       }
//     };

//     fetchRate();
//   }, []);

//   return { rate, error };
// }

import { useEffect } from 'react';
import { useExchangeRateStore } from '@/store/exchangeRateStore';

export function useExchangeRate() {
  const { rate, error, isLoading, fetchRate } = useExchangeRateStore();

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  return { rate, error, isLoading };
}