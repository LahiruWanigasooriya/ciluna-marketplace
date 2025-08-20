"use client";

import { useState, useEffect } from "react";

interface CilunaPriceResponse {
  price?: number;
}

const useCilunaPrice = () => {
  const [CilunaPrice, setCilunaPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          `https://wallet1.cilunachain.net/api/cilunaPrice`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();

        try {
          const data: CilunaPriceResponse = JSON.parse(text);

          if (typeof data.price === "number") {
            setCilunaPrice(data.price);
          } else {
            console.error("Price not found in response:", data);
            setCilunaPrice(null);
          }
        } catch (jsonError) {
          console.error("Failed to parse JSON:", text);
          setCilunaPrice(null);
        }
      } catch (error) {
        console.error("Error fetching Ciluna price:", error);
        setCilunaPrice(null);
      }
    };

    fetchPrice();
  }, []);

  const convertToCiluna = (usd: number): string => {
    return CilunaPrice ? (usd / CilunaPrice).toFixed(2) : "Loading...";
  };

  return { CilunaPrice, convertToCiluna };
};

export default useCilunaPrice;
