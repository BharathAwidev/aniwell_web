import HomeCarousel from "./HomeCarousel";
import Services from "./Services";
import Inspirations from "./Inspirations";
import WhyChooseUs from "./WhyChooseUs";
import Estimate from "./Estimate";
import FAQ from "./FAQ";
import PriceCalculationPage from "../PriceCalculationPage";
// import Footer from "../../components/Footer";

const Home = () => {
  return (
    <>
      <HomeCarousel />
      <PriceCalculationPage />
      <Inspirations />
      <WhyChooseUs />
      <Estimate />
      <FAQ />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
