import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import PopularCamps from "../../components/Popular Camps/PopularCamps";

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
    </div>
  );
};

export default Home;
