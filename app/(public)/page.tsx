import { Suspense } from "react";
import Home from "../components/home";

const Page = () => {
  return (
    <Suspense>
      <Home />;
    </Suspense>
  );
};

export default Page;
