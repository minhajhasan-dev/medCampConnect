/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import useAuth from "../../hooks/useAuth";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const FeedbackModal = ({ closeModal, setIsOpen, isOpen, title, campId }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleRatingChange = (value) => {
    setRating(value);
  };
  const { user } = useAuth();
  console.log(campId);

  const handleSubmit = async () => {
    setIsOpen(false);

    // Handle the post request
    try {
      const postResponse = await axiosSecure.post("/feedbacks", {
        title,
        rating,
        feedback,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        campId,
      });
      console.log("Post response:", postResponse);
      toast.success("Feedback Submitted");
    } catch (error) {
      console.error("Post request error:", error);
      toast.error("Failed to submit feedback.");
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium text-center leading-6 text-gray-900"
                  >
                    Share your feedback on {title}
                  </DialogTitle>
                  <hr className="mt-3 " />
                  {/* rating here */}
                  <div className="mt-4 flex justify-center">
                    <ReactStars
                      count={5}
                      onChange={handleRatingChange}
                      size={24}
                      color2={"#ffd700"}
                      value={rating}
                    />
                  </div>
                  {/* a textarea for feedback */}
                  <textarea
                    className="w-full p-2 mt-4 border border-gray-300 rounded-md"
                    placeholder="Enter your feedback here"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-green-600 text-white px-3 py-1 rounded-md ml-2"
                    >
                      Submit
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
      <style>{`
        .star {
          font-size: 2rem;
          color: gray;
          transition: color 0.2s;
        }
        .star:hover,
        .star-selected {
          color: green;
          fontweight: lighter;
        }
      `}</style>
    </>
  );
};

export default FeedbackModal;
