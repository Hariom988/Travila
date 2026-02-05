import React from "react";
import BusSearchWidget from "./busSearchWidget";
import BusResultCard from "./busResultCard";
import BusDiscovery from "./busDiscovery";
import BusTravelInfo from "./busTravelInfo";

const BusPage = () => {
  return (
    <>
      <BusSearchWidget />
      <BusResultCard />
      <BusDiscovery />
      <BusTravelInfo />
    </>
  );
};

export default BusPage;
