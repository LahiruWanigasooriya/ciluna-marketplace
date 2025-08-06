export const getCilunaPrice = async (): Promise<number | null> => {
  try {
    const response = await fetch("https://wallet1.pawchain.net/api/cilunaPrice", {
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`Error fetching CILUNA price: ${response.statusText}`);
    }

    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error("Failed to fetch CILUNA price:", error);
    return null;
  }
};

export const toFixed = (x: any) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
};
