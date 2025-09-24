"use client";

import { useSearchParams } from "next/navigation";

const NotFoundPage = () => {
  const searchParams = useSearchParams();
  const param = searchParams.get("param") || "";
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Param: {param}</p>
    </div>
  );
};

export default NotFoundPage;