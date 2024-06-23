import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import BookingModal from "../../Modal/BookingModal";
import DeleteModal from "../../Modal/DeleteModal";
import FeedbackModal from "../../Modal/FeedbackModal";
const SelfBookingDataRow = ({
  booking,
  refetch,
  isOpen,
  setIsOpen,
  closeModal,
  campId,
  setOpenModalId,
  openModalId,
}) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // only get the current row data and id
  const data = feedbacks.filter((feedback) => feedback.campId === campId);
  console.log(data);

  // fetch feedbacks from the server
  useEffect(() => {
    axiosSecure
      .get(`/feedbacks`)
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // delete booking

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(
        `/booking/${booking.participant_email}/${booking.campId}`
      );
      refetch();
      toast.success("Booking was deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayNowClick = () => {
    setIsCheckoutOpen(true); // Open the checkout form
  };

  return (
    <tr>
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
          ${booking?.camp_fees === 0 ? booking?.price : booking?.camp_fees}
        </p>
      </td>
      <td
        data-aos="fade-right"
        data-aos-duration="1000"
        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
      >
        <p className="text-gray-900 whitespace-no-wrap">
          {booking?.transactionId ? (
            "Paid"
          ) : (
            <button
              onClick={handlePayNowClick}
              className="bg-green-600 text-white px-3 py-1 rounded-md"
            >
              {" "}
              Pay
            </button>
          )}
        </p>
      </td>
      {isCheckoutOpen && (
        <BookingModal
          isOpen={isCheckoutOpen}
          closeModal={() => setIsCheckoutOpen(false)}
          booking={booking}
          refetch={refetch}
          bookingInfo={{
            ...booking,
          }}

          // Pass any other props needed by CheckoutForm
        />
      )}
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
        {/* add a feedback button green background white text */}
        <button
          disabled={booking?.feedback_given ? true : false}
          onClick={() => {
            setOpenModalId(booking._id);
          }}
          id={booking._id}
          className="bg-green-600 text-white px-3 py-1 rounded-md"
        >
          Feedback
        </button>
      </td>
      <FeedbackModal
        isOpen={openModalId === booking._id}
        setIsOpen={setOpenModalId}
        booking={booking}
        closeModal={() => setOpenModalId(null)}
        campId={booking._id}
        refetch={refetch}
        title={booking?.camp_name}
      />
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
          closeModal={() => setIsOpen(false)}
          handleDelete={handleDelete}
          id={campId}
        />
      </td>
    </tr>
  );
};

SelfBookingDataRow.propTypes = {
  booking: PropTypes.object,
  refetch: PropTypes.func,
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  campId: PropTypes.string,
  data: PropTypes.object,
  setOpenModalId: PropTypes.func,
  openModalId: PropTypes.string,
};

export default SelfBookingDataRow;
