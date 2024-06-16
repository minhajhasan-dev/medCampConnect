import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const PaymentDataRow = ({ booking, refetch, campId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
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

  return (
    <tr>
      <td   data-aos="fade-right"
        data-aos-duration="1000" className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{booking?.camp_name}</p>
      </td>
      <td   data-aos="fade-right"
        data-aos-duration="1000" className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          ${booking?.camp_fees}
        </p>
      </td>
      <td   data-aos="fade-right"
        data-aos-duration="1000" className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {booking?.transactionId ? "Paid" : "Not Paid"}
        </p>
      </td>
      <td   data-aos="fade-right"
        data-aos-duration="1000" className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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
    </tr>
  );
};

PaymentDataRow.propTypes = {
  booking: PropTypes.object,
  refetch: PropTypes.func,
  campId: PropTypes.string,
  data: PropTypes.object,
};
export default PaymentDataRow;
