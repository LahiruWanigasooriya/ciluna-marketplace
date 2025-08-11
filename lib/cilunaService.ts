"use server";

export const getCilunaPrice = async () => {
  try {
    const response = await fetch(
      "https://wallet.pawchain.net/api/cilunaPrice",
      {
        cache: "no-store",
      }
    );

    if (response.status !== 200) {
      throw new Error(`Error fetching CILUNA price:`);
    }

    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error("Failed to fetch CILUNA price:", error);
    return null;
  }
};
