"use server"

export const getPawPrice = async () => {
  try {
    const response = await fetch("https://wallet.pawchain.net/api/pawPrice", {
      cache: "no-store",
    });


    if (response.status !== 200) {
      throw new Error(`Error fetching PAW price:`);
    }

    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error("Failed to fetch PAW price:", error);
    return null;
  }
};
