import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PiSpinnerBallFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import "./CheckoutForm.css";
const CheckoutForm = ({ closeModal, bookingInfo, formData, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentDeclined, setPaymentDeclined] = useState(false);
  const [existingBooking, setExistingBooking] = useState({});

  console.log(formData);
  useEffect(() => {
    // fetch client secret
    if (bookingInfo?.price && bookingInfo?.price > 1) {
      getClientSecret({ price: bookingInfo?.price });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingInfo?.price]);

  axiosSecure.get(`/bookings/${user?.email}`).then((res) => {
    const bookings = res.data;
    const existingBooking = bookings.find(
      (booking) => booking.camp_name === bookingInfo.camp_name
    );
    if (existingBooking) {
      console.log("Existing booking found:", existingBooking);
      setExistingBooking(existingBooking);
    }
  });

  //   get clientSecret
  const getClientSecret = async (price) => {
    const { data } = await axiosSecure.post(`/create-payment-intent`, price);
    console.log("clientSecret from server--->", data);
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    // confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    let paymentStatus = "Unpaid";

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      setPaymentDeclined(true); // Update this when payment is declined
      setProcessing(false);
      return;
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      paymentStatus = "Paid";

      // 1. Create payment info object
      const paymentInfo = {
        ...bookingInfo,
        ...formData,
        campId: bookingInfo._id,
        transactionId: paymentIntent ? paymentIntent.id : "N/A",
        date: new Date(),
        payment_status: paymentStatus,
        camp_fees: bookingInfo.price,
        feedback_given: false,
      };
      delete paymentInfo._id;
      console.log(paymentInfo);
      try {
        await axiosSecure.delete(
          `/booking/${existingBooking.participant_email}/${existingBooking.campId}`
        );

        // 2. save payment info in booking collection (db)

        const { data } = await axiosSecure.post("/bookings", paymentInfo);
        console.log(data);

        // 3. change room status to booked in db
        // await axiosSecure.patch(`/room/status/${bookingInfo?._id}`, {
        //   status: true,
        // });
        // 4. Increase participant_count by 1
        await axiosSecure.patch(`/camp/${bookingInfo?._id}`, {
          $inc: { participant_count: 1 },
        });

        // update ui
        refetch();
        closeModal();
        toast.success(
          `Camp Booked Successfully! Payment Status: ${paymentStatus}`
        );
        navigate("/dashboard/registered-camps");
      } catch (err) {
        console.log(err);
      }
    }

    setProcessing(false);
  };

  const handlePayLater = async () => {
    // Prepare the booking information with an "Unpaid" status
    const bookingInfoWithUnpaidStatus = {
      ...bookingInfo,
      ...formData,
      campId: bookingInfo._id,
      date: new Date(),
      payment_status: "Unpaid",
      camp_fees: 0,
      feedback_given: false,
    };
    delete bookingInfoWithUnpaidStatus._id;
    try {
      // Save the booking information to the database
      const { data } = await axiosSecure.post(
        "/bookings",
        bookingInfoWithUnpaidStatus
      );
      console.log("Booking confirmed:", data);

      // UI updates: Show success message, close modal, and navigate
      toast.success("Your booking is confirmed. Please pay later.");
      closeModal();
      navigate("/dashboard/registered-camps"); // Adjust the path as needed
    } catch (error) {
      console.error("Failed to confirm booking:", error);
      toast.error("Failed to confirm your booking. Please try again.");
    }
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <p className="text-sm text-center text-gray-500 mt-2">
          If Your Card is Declined, Please Click Pay Later
        </p>
        <div className="flex gap-8 mt-2 justify-around">
          {paymentDeclined ? (
            <button
              onClick={handlePayLater}
              type="button"
              className="mt-4 w-full px-4 cursor-pointer bg-yellow-100 hover:bg-yellow-200 py-3 text-sm font-semibold rounded-full transition outline outline-1 outline-gray-200"
            >
              Pay Later
            </button>
          ) : (
            <button
              disabled={!stripe || !clientSecret || processing}
              type="submit"
              className="mt-4 w-full px-4 cursor-pointer bg-green-100 hover:bg-green-200 py-3 text-sm font-semibold rounded-full transition outline outline-1 outline-gray-200"
            >
              {processing ? (
                <PiSpinnerBallFill
                  className="animate-spin text-green-700 m-auto"
                  size={24}
                />
              ) : (
                `Pay $${bookingInfo?.price}`
              )}
            </button>
          )}
          <button
            onClick={closeModal}
            type="button"
            className="mt-4 w-full px-4 cursor-pointer bg-red-100 hover:bg-red-200 py-3  text-sm font-semibold rounded-full  transition outline outline-1 outline-gray-200 "
          >
            Cancel
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    </>
  );
};

CheckoutForm.propTypes = {
  bookingInfo: PropTypes.object,
  closeModal: PropTypes.func,
  refetch: PropTypes.func,
  formData: PropTypes.object,
};

export default CheckoutForm;
