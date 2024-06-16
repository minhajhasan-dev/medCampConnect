import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { imageUpload } from "../../api/utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UpdateProfileForm from "../Form/updateProfileForm";

const UpdateProfileModal = ({
  setIsEditModalOpen,
  isOpen,
  userData,
  refetch,
}) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(userData);
  const [imageText, setImageText] = useState("Upload Image");

  //   handle Image update
  const handleImage = async (image) => {
    setLoading(true);
    try {
      // upload image
      const image_url = await imageUpload(image);
      console.log(image_url);
      setProfileData({ ...profileData, photo: image_url });
      setImageText(image.name);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };
  console.log(profileData);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const updateProfileData = Object.assign({}, profileData);
    delete updateProfileData._id;

    console.log(updateProfileData);
    try {
      const { data } = await axiosSecure.put(
        `/update-profile/${profileData?.email}`,
        updateProfileData
      );
      console.log(data);
      refetch();
      setIsEditModalOpen(false);
      setLoading(false);
      toast.success("Profile info updated");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsEditModalOpen(false)}
      >
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
              <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Update Profile Info
                </DialogTitle>
                <div className="mt-2 w-full">
                  {/* Update profile form */}
                  <UpdateProfileForm
                    handleSubmit={handleSubmit}
                    profileData={profileData}
                    loading={loading}
                    handleImage={handleImage}
                    setProfileData={setProfileData}
                    imageText={imageText}
                  />
                </div>
                <hr className="mt-8 " />
                <div className="mt-2 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

UpdateProfileModal.propTypes = {
  setIsEditModalOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  userData: PropTypes.object,
  refetch: PropTypes.func,
};

export default UpdateProfileModal;
