/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";

const AddCampForm = ({
  dates,
  handleDates,
  handleSubmitCamp,
  setImagePreview,
  imagePreview,
  imageText,
  handleImage,
  loading,
}) => {
  // date time (current)
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const currentTime = format(new Date(), "HH:mm");
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg">
      <form
        onSubmit={handleSubmitCamp}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Grid Block 1 */}
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label
                htmlFor="campName"
                className="block text-gray-700 font-medium"
              >
                Camp Name
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-green-500 rounded-md"
                name="campName"
                id="campName"
                type="text"
                placeholder="Camp Name"
                required
              />
            </div>

            <div className="p-4 bg-white rounded-lg md:flex justify-between items-center border border-gray-300">
              <div className="file_upload px-5 py-3 relative border-2 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      onChange={(e) => handleImage(e.target.files[0])}
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                      required
                    />

                    <div className="bg-green-500 text-white border border-gray-300 rounded-md font-semibold cursor-pointer p-1 px-3 hover:bg-green-600">
                      {imageText.length > 20
                        ? `${imageText.split(".")[0].slice(0, 15)}....${
                            imageText.split(".")[1]
                          }`
                        : imageText}
                    </div>
                  </label>
                </div>
              </div>
              <div className="h-16 w-16 object-cover overflow-hidden flex items-center rounded-md border border-gray-300">
                {imagePreview && <img src={imagePreview} alt="Preview" />}
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label
                htmlFor="campFees"
                className="block text-gray-700 font-medium"
              >
                Camp Fees
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-green-500 rounded-md"
                name="campFees"
                id="campFees"
                type="number"
                placeholder="Camp Fees"
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="date" className="block text-gray-700 font-medium">
                Date
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-green-500 rounded-md"
                name="date"
                id="date"
                type="date"
                defaultValue={currentDate}
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="time" className="block text-gray-700 font-medium">
                Time
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-green-500 rounded-md"
                name="time"
                id="time"
                type="time"
                defaultValue={currentTime}
                required
              />
            </div>
          </div>

          {/* Grid Block 2 */}
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label
                htmlFor="location"
                className="block text-gray-700 font-medium"
              >
                Location
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-green-500 rounded-md"
                name="location"
                id="location"
                type="text"
                placeholder="Location"
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label
                htmlFor="healthcareProfessionalName"
                className="block text-gray-700 font-medium"
              >
                Healthcare Professional Name
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-green-500 rounded-md"
                name="healthcareProfessionalName"
                id="healthcareProfessionalName"
                type="text"
                placeholder="Healthcare Professional Name"
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label
                htmlFor="participantCount"
                className="block text-gray-700 font-medium"
              >
                Participant Count
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-green-500 rounded-md"
                name="participantCount"
                id="participantCount"
                type="number"
                defaultValue={0}
                placeholder="Participant Count"
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full min-h-[11rem] px-4 py-3 border border-gray-300 focus:outline-none focus:border-green-500 rounded-md"
                name="description"
                placeholder="Description"
                required
              ></textarea>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded-md shadow-md ${
            loading ? "bg-green-300" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? (
            <TbFidgetSpinner className="animate-spin m-auto" />
          ) : (
            "Save & Continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCampForm;
