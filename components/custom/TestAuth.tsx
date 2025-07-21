"use client";

import { setAuthToken } from "@/actions/utils/auth";



export default function TestAuth() {
  const handleLogin = async () => {
    await setAuthToken("test-token", true);
    alert("Auth token set! Check DevTools -> Application -> Cookies");
  };

  return <button className="bg-black hover:bg-black/50 p-5 text-white " onClick={handleLogin}>Set Auth Token</button>;
}
