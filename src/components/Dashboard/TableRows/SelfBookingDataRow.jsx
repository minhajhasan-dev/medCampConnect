import PropTypes from "prop-types";
import toast from "react-hot-toast";
import FeedbackModal from "../../Modal/FeedbackModal";
const SelfBookingDataRow = ({
  booking,
  refetch,
  isOpen,
  setIsOpen,
  closeModal,
}) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {booking?.participant_name}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{booking?.camp_name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          ${booking?.camp_fees}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {booking?.transactionId ? "Paid" : "Not Paid"}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {booking?.transactionId ? (
            "Confirmed"
          ) : (
            <button
              onClick={() => {
                refetch();
                toast.success("Payment was Successful");
              }}
              className="bg-green-600 text-white px-3 py-1 rounded-md"
            >
              Pay Now
            </button>
          )}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {/* add a feedback button green background white text */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white px-3 py-1 rounded-md"
        >
          Feedback
        </button>
      </td>
      <FeedbackModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        booking={booking}
        closeModal={closeModal}
      />

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {/* circular cross button */}
        <button
          onClick={() => {
            toast.error("Booking Cancellation is not allowed");
          }}
        >
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
};

export default SelfBookingDataRow;
