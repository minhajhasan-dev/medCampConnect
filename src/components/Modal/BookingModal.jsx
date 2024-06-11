import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Select,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import useAuth from "../../hooks/useAuth";
import CheckoutForm from "../Form/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const BookingModal = ({ closeModal, isOpen, bookingInfo, refetch }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    age: "",
    phoneNumber: "",
    gender: "",
    emergencyContact: "",
  });
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  console.log(formData);

  console.log(bookingInfo);
  return (
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
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Camp Registration Form
                </DialogTitle>
                <hr className="mt-4 mb-4" />

                <form className="space-y-2">
                  <div className="space-y-2 items-baseline grid grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Camp Name
                      </label>
                      <p className="mt-1 text-sm text-gray-500">
                        {bookingInfo.camp_name}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Camp Fees
                      </label>
                      <p className="mt-1 text-sm text-gray-500">
                        $ {bookingInfo.price}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <p className="mt-1 text-sm text-gray-500">
                        {bookingInfo.location}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Healthcare Professional Name
                      </label>
                      <p className="mt-1 text-sm text-gray-500">
                        {bookingInfo.healthcare_professional}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Participant Name
                      </label>
                      <p className="mt-1 text-sm text-gray-500">
                        {user?.displayName}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Participant Email
                      </label>
                      <p className="mt-1 text-sm text-gray-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <input
                      name="age"
                      type="number"
                      className="mt-1 p-2 border rounded-md w-full"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      name="phoneNumber"
                      type="number"
                      className="mt-1 p-2 border rounded-md w-full"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>

                    <Select
                      name="gender"
                      type="text"
                      className="mt-1 p-2 border rounded-md w-full"
                      placeholder="Male/Female"
                      value={formData.gender}
                      onChange={handleInputChange}
                      aria-label="Project status"
                    >
                      <option disabled value="">
                        Select
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Select>
                    {/* add a select input with 2 item */}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Emergency Contact
                    </label>
                    <input
                      name="emergencyContact"
                      type="number"
                      className="mt-1 p-2 border rounded-md w-full"
                      placeholder="Emergency Contact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
                <hr className="mt-4 mb-4 " />

                <Elements stripe={stripePromise}>
                  {/* checkout form */}
                  <CheckoutForm
                    bookingInfo={bookingInfo}
                    closeModal={closeModal}
                    refetch={refetch}
                    formData={formData}
                  />
                </Elements>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

BookingModal.propTypes = {
  bookingInfo: PropTypes.object,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
  refetch: PropTypes.func,
};

export default BookingModal;
