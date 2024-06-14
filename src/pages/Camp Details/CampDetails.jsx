import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import BookingModal from "../../components/Modal/BookingModal";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";

const CampDetails = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { campId } = useParams();
  const axiosCommon = useAxiosCommon();
  const [role] = useRole();
  const {
    data: camp = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["camp", campId],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/camp/${campId}`);
      return data;
    },
  });
  console.log(camp);

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/bookings/${user?.email}`);
      return data;
    },
  });
  console.log(bookings);
  const isCampBooked = bookings.some((booking) => booking.campId === campId);
  console.log(isCampBooked);
  if (isLoading) return <LoadingSpinner />;
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <Container refetch={refetch}>
      <Helmet>
        <title>{camp.camp_name}</title>
      </Helmet>
      {camp && (
        <div className="max-w-screen-lg mx-auto p-8 bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <Heading title={camp.camp_name} subtitle={camp.location} />
            <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg">
              <img
                className="object-cover w-full h-full"
                src={camp.image}
                alt="Camp"
              />
            </div>
          </div>
          {/* Camp Details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <div className="col-span-4 flex flex-col gap-8">
              <div className="text-xl font-semibold text-gray-700">
                Organized by {camp.healthcare_professional}
              </div>
              <div className="text-lg font-light text-gray-700 leading-relaxed">
                {camp.description}
              </div>
            </div>
            <div className="col-span-3 order-first md:order-last mb-10 md:mb-0">
              {/* Join Camp Section */}
              <div className="p-6 border rounded-lg shadow-md bg-gray-50">
                <h2 className="text-xl font-semibold mb-4">
                  Reserve Your Spot
                </h2>
                <table className="w-full text-left table-auto border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-700">
                        Participants:
                      </td>
                      <td className="py-2 text-gray-700">
                        {camp.participant_count}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-700">Fees:</td>
                      <td className="py-2 text-gray-700">${camp.camp_fees}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-700">Date:</td>
                      <td className="py-2 text-gray-700">{camp.date}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-gray-700">Time:</td>
                      <td className="py-2 text-gray-700">{camp.time}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-gray-700">
                        Location:
                      </td>
                      <td className="py-2 text-gray-700">{camp.location}</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  disabled={role !== "participant"}
                  onClick={() => {
                    if (isCampBooked) {
                      return toast.error("You have already booked this camp");
                    }
                    setIsOpen(true);
                  }}
                  className={`w-full mt-4 px-4 py-2cursor-pointer bg-gray-100 ${
                    role === "participant"
                      ? "hover:bg-green-100"
                      : "hover:bg-red-100"
                  } py-3  text-sm font-semibold rounded-full  transition outline outline-1 outline-gray-200 "
                  color="primary`}
                >
                  Join Camp
                </button>
                {role !== "participant" && (
                  <p className="text-red-500 text-center mt-2">
                    Only participants can join the camp
                  </p>
                )}

                {/* Modal */}
                <BookingModal
                  isOpen={isOpen}
                  refetch={refetch}
                  closeModal={closeModal}
                  bookingInfo={{
                    ...camp,
                    camp_name: camp.camp_name,
                    price: camp.camp_fees,
                    location: camp.location,
                    healthcare_professional: camp.healthcare_professional,
                    participant_name: user.displayName,
                    participant_email: user.email,
                    image: user?.photoURL,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CampDetails;
