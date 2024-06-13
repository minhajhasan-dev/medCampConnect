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
import useAuth from "../../hooks/useAuth";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const FeedbackModal = ({ closeModal, setIsOpen, isOpen }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const handleRatingChange = (value) => {
    setRating(value);
  };
  const { user } = useAuth();

  const handleSubmit = async () => {
    setIsOpen(false);
    try {
      await axiosSecure.post("/feedbacks", {
        rating,
        feedback,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      });
      toast.success("Feedback Submitted");
      console.log({ rating, feedback });
    } catch (error) {
      toast.error("Failed to submit feedback");
    }
  };
  // send feedback to the server

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
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium text-center leading-6 text-gray-900"
                  >
                    Share your feedback
                  </DialogTitle>
                  <hr className="mt-3 " />
                  {/* rating here */}
                  <div className="mt-4 flex justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className={`star ${
                          rating >= star ? "star-selected" : ""
                        } text-3xl text-gray-400 `}
                        onClick={() => handleRatingChange(star)}
                      >
                        ★
                      </button>
                    ))}
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
                      onClick={() => {
                        handleSubmit();
                      }}
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
