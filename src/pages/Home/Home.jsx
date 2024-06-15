import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import PopularCamps from "../../components/Popular Camps/PopularCamps";
import FeedBacks from "../../components/FeedBacks/FeedBacks";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> MedCampConnect | Medical Camp Management System</title>
      </Helmet>
      {/* Banner section  */}
      {/* <Categories /> */}
      <Banner />

      {/* Rooms section */}
      {/* <Rooms /> */}
      {/* Popular Camps Section */}
      <PopularCamps />
      <FeedBacks />
    </div>
  );
};

export default Home;
