export const getDiscountedPrice = (
  price: number,
  discount: number | null
): number => {
  if (discount) {
    const discounted = price - (price * discount) / 100;
    return parseFloat(discounted.toFixed(2));
  }
  return price;
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const fetchExchangeRate = async(): Promise<number> => {
  const response = await fetch(process.env.NEXT_PUBLIC_CURRENCY_API as string);
  const data = await response.json();
  return data.rates.LKR;
}
