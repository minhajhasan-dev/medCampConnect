import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";
import Camps from "../Home/Camps";
import Container from "../Shared/Container";
import SectionTitle from "../Shared/Section Title/SectionTitle";

const PopularCamps = () => {
  return (
    <Container>
      <SectionTitle headline="Popular Medical Camps" />
      <Camps/>
      <div className=" mb-5 flex justify-center mt-5 items-center">
        <Link to="/available-camps">
          <Button
            className="mt-4 cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition outline outline-1 outline-gray-200 "
            color="primary"
          >
            See All Camps
          </Button>
        </Link>{" "}
      </div>
    </Container>
  );
};

export default PopularCamps;
