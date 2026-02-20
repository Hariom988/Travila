import { Suspense } from "react";
import Home from "@/app/components/(homePage)/home";

const Page = () => {
  return (
    <Suspense>
      <Home />;
    </Suspense>
  );
};

export default Page;
