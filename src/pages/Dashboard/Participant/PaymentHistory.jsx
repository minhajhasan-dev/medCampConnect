import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { useState } from "react";
import PaymentDataRow from "../../../components/Dashboard/TableRows/PaymentDataRow";
import useAuth from "../../../hooks/useAuth";
const PaymentHistory = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [openModalId, setOpenModalId] = useState(null);

  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/bookings/${user?.email}`);
      return data;
    },
  });

  console.log(bookings);
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <Helmet>
          <title>Payment History</title>
        </Helmet>
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Camp Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Camp Fees
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Payment Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Confirmation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <PaymentDataRow
                      key={booking?._id}
                      booking={booking}
                      campId={booking?._id}
                      refetch={refetch}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      closeModal={() => (isOpen ? false : true)}
                      openModalId={openModalId}
                      setOpenModalId={setOpenModalId}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
