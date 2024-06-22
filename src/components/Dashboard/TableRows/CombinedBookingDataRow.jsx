import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import DeleteModal from "../../Modal/DeleteModal";

const CombinedBookingDataRow = ({ booking, refetch, campId, userEmail }) => {
  console.log(campId);
  console.log(userEmail);
  // delete booking
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/booking/${userEmail}/${campId}`);
      refetch();
      toast.success("Booking was deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="300"
      data-aos-offset="0"
    >
      <td
        data-aos="fade-right"
        data-aos-duration="1000"
        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
      >
        <p className="text-gray-900 whitespace-no-wrap">
          {booking?.participant_name}
        </p>
      </td>
      <td
        data-aos="fade-right"
        data-aos-duration="1000"
        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
      >
        <p className="text-gray-900 whitespace-no-wrap">{booking?.camp_name}</p>
      </td>
      <td
        data-aos="fade-right"
        data-aos-duration="1000"
        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
      >
        <p className="text-gray-900 whitespace-no-wrap">
          ${booking?.price}
        </p>
      </td>
      <td
        data-aos="fade-right"
        data-aos-duration="1000"
        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
      >
        <p className="text-gray-900 whitespace-no-wrap">
          {booking?.payment_status}
        </p>
      </td>
      <td
        data-aos="fade-right"
        data-aos-duration="1000"
        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
      >
        <p className="text-gray-900 whitespace-no-wrap">
          {booking?.payment_status === "Unpaid" ? "Pending" : "Confirmed"}
        </p>
      </td>
      <td
        data-aos="fade-right"
        data-aos-duration="1000"
        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
      >
        {/* circular cross button */}
        <button
          disabled={booking?.payment_status === "Paid" ? true : false}
          onClick={() => setIsOpen(true)}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Delete modal */}
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleDelete={handleDelete}
          id={campId}
        />
      </td>
    </tr>
  );
};
CombinedBookingDataRow.propTypes = {
  booking: PropTypes.object,
  refetch: PropTypes.func,
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  campId: PropTypes.string,
  data: PropTypes.object,
  setOpenModalId: PropTypes.func,
  openModalId: PropTypes.string,
  userEmail: PropTypes.string,
};

export default CombinedBookingDataRow;
