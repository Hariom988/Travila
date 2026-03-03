import CabBookingWidget from "./cabBookingWidget";
import CabDemoInfo from "./cabDemoInfo";
import CabDiscovery from "./cabDiscovery";
import CabPromotionalSection from "./cabPromotionalSection";
import CabServiceHighlights from "./cabServiceHighlights";
import CabTravelInfo from "./cabTravelInfo";

const CabsPage = () => {
  return (
    <>
      <CabBookingWidget />
      <CabDemoInfo />
      <CabPromotionalSection />
      <CabDiscovery />
      <CabServiceHighlights />
      <CabTravelInfo />
    </>
  );
};

export default CabsPage;
