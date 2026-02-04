import TrainBookingSearch from "./trainBookingSearch";
import TrainDashboard from "./trainDashboard";
import TrainFAQ from "./trainFAQ";
import TrainInspiration from "./trainInspiration";
import TrainTools from "./trainTools";
const TrainPage = () => {
  return (
    <>
      <TrainBookingSearch />
      <TrainInspiration />
      <TrainDashboard />
      <TrainTools />
      <TrainFAQ />
    </>
  );
};

export default TrainPage;
