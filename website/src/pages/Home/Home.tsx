import HomeCarousel from "./HomeCarousel";
import Services from "./Services";
import Inspirations from "./Inspirations";
import WhyChooseUs from "./WhyChooseUs";
import Estimate from "./Estimate";
import FAQ from "./FAQ";
// import Footer from "../../components/Footer";

const Home = () => {
  return (
    <>
      <HomeCarousel />
      <Services />
      <Inspirations />
      <WhyChooseUs />
      <Estimate />
      <FAQ />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
