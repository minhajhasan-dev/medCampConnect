import PropTypes from "prop-types";
import { useEffect, useState } from "react";
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
          ${booking?.camp_fees}
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
          {booking?.payment_status === "Paid" ? "Confirmed" : "Not Confirmed"}
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
