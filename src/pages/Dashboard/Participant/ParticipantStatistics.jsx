// import { Calendar } from 'react-date-range'
import { useQuery } from "@tanstack/react-query";
import { FaCampground, FaDollarSign } from "react-icons/fa";
import JoiningsLineChart from "../../../components/Dashboard/JoiningsLineChart";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const ParticipantStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch Participant Statistics
  const { data: statData = {}, isLoading } = useQuery({
    queryKey: ["statData", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/participant-stats/${user?.email}`
      );
      return data;
    },
  });

  console.log(statData);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-12 max-w-xl mx-auto grid gap-y-10 gap-x-6 md:grid-cols-2 ">
          {/* Total Fees */}
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className=" flex justify-center flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md"
          >
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
            >
              <FaDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Fees
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                ${statData?.totalFees}
              </h4>
            </div>
          </div>

          {/* Total Bookings */}
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            className="relative justify-center flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md"
          >
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
            >
              <FaCampground className="w-6 h-6 text-white" />
            </div>

            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Joined Camp
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {statData?.totalCamps}
              </h4>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="mb-4 mx-auto max-w-2xl grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3"
        >
          {/* Total Sales Graph */}
          <div className="relative  flex flex-col bg-clip-border rounded-xl bg-white w-[40.5rem] text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            {/* Render Chart Here */}
            <JoiningsLineChart data={statData?.chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantStatistics;
