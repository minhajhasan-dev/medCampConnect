import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "react-awesome-button/dist/styles.css";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Card from "../Home/Card";
import Container from "../Shared/Container";
import Heading from "../Shared/Heading";
import LoadingSpinner from "../Shared/LoadingSpinner";

const AvailableCamp = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("most-registered");
  const [layout, setLayout] = useState(3);
  const axiosCommon = useAxiosCommon();
  const { data: availableCamps = [], isLoading } = useQuery({
    queryKey: ["camps", sort, search],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/camps?sort=${sort}&search=${search}`
      );
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value || " ";
    setSearch(text);
  };

  const handleChangeLayout = () => {
    setLayout(layout === 3 ? 2 : 3);
  };
  return (
    <Container>
      {/* sub nav here */}
      <form
        onSubmit={handleSearch}
        className="navbar justify-center form my-5 bg-base-100 px-3 mx-auto "
      >
        <div
          data-aos="flip-left"
          data-aos-duration="1000"
          className="flex-none gap-2"
        >
          <div className="form-control">
            <input
              type="text"
              placeholder="Search Camps..."
              name="search"
              className="input input-bordered lg:w-96 md:w-auto w-36 bg-white shadow-md rounded-lg pl-3"
            />
          </div>
          <div className="form-control">
            <button
              type="button"
              onClick={handleChangeLayout}
              className="btn hidden md:block w-full text-white rounded-lg shadow-md bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 transition-all duration-500 ease-in-out"
            >
              {" "}
              Change Layout
            </button>
          </div>
          <div className="form-control text-sm">
            <select
              onChange={(e) => setSort(e.target.value)}
              value={sort}
              className="select select-bordered w-28 md:w-auto bg-white shadow-md rounded-lg pl-3"
            >
              <option value="most-registered">Most Registered</option>
              <option value="camp-fees"> Camp Fees</option>
              <option value="camp-name"> Camp Name</option>
            </select>
          </div>
        </div>
      </form>
      {availableCamps && availableCamps.length > 0 ? (
        <div
          className={`pt-12 mb-5 max-w-4xl gap-5 mx-auto grid grid-cols-1 ${
            layout === 2
              ? "md:grid-cols-2 max-w-2xl"
              : "md:grid-cols-3 max-w-5xl"
          }`}
        >
          {availableCamps.map((camp) => (
            <Card key={camp._id} camp={camp} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
          <Heading
            center={true}
            title="No Camps Found!"
            subtitle="Please try again with different search criteria."
          />
        </div>
      )}
    </Container>
  );
};

export default AvailableCamp;
