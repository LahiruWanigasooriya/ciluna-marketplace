"use client";

import { useState, useEffect } from "react";

interface PawPriceResponse {
  price?: number; 
}

const usePawPrice = () => {
  const [pawPrice, setPawPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          `https://wallet1.pawchain.net/api/pawPrice`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();

        try {
          const data: PawPriceResponse = JSON.parse(text);

          if (typeof data.price === "number") {
            setPawPrice(data.price);
          } else {
            console.error("Price not found in response:", data);
            setPawPrice(null);
          }
        } catch (jsonError) {
          console.error("Failed to parse JSON:", text);
          setPawPrice(null);
        }
      } catch (error) {
        console.error("Error fetching PAW price:", error);
        setPawPrice(null);
      }
    };

    fetchPrice();
  }, []);

  const convertToPaw = (usd: number): string => {
    return pawPrice ? (usd / pawPrice).toFixed(2) : "Loading...";
  };

  return { pawPrice, convertToPaw };
};

export default usePawPrice;