/* eslint-disable react/prop-types */

const UpdateCampForm = ({
  handleSubmit,
  handleImage,
  setCampData,
  campData,
  imageText,
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-1 text-sm">
            <label htmlFor="campName" className="block text-gray-600">
              Camp Name
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md "
              name="campName"
              id="campName"
              type="text"
              value={campData?.camp_name}
              onChange={(e) =>
                setCampData({ ...campData, camp_name: e.target.value })
              }
              placeholder="Camp Name"
              required
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="location" className="block text-gray-600">
              Location
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md "
              name="location"
              id="location"
              type="text"
              value={campData?.location}
              onChange={(e) =>
                setCampData({ ...campData, location: e.target.value })
              }
              placeholder="location"
              required
            />
          </div>

          <div className=" p-4 bg-white w-full  m-auto rounded-lg">
            <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
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
                  />
                  <div className="bg-green-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-green-500">
                    {/* {imageText} */}
                    {imageText.length > 20
                      ? imageText.split(".")[0].slice(0, 15) +
                        "...." +
                        imageText.split(".")[1]
                      : imageText}
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="camp_fees" className="block text-gray-600">
                Camp Fees
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md "
                name="camp_fees"
                id="camp_fees"
                value={campData?.camp_fees}
                onChange={(e) =>
                  setCampData({ ...campData, camp_fees: e.target.value })
                }
                type="number"
                placeholder="Camp Fees"
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label
                htmlFor="healthcare_professional"
                className="block text-gray-600"
              >
                Healthcare Professional
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md "
                name="healthcare_professional"
                id="healthcare_professional"
                value={campData?.healthcare_professional}
                onChange={(e) =>
                  setCampData({
                    ...campData,
                    healthcare_professional: e.target.value,
                  })
                }
                type="text"
                placeholder="Healthcare Professional"
                required
              />
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="date" className="block text-gray-600">
                Date
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md "
                name="date"
                id="date"
                value={campData?.date}
                onChange={(e) =>
                  setCampData({
                    ...campData,
                    date: e.target.value,
                  })
                }
                type="date"
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="time" className="block text-gray-600">
                Time
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md "
                name="time"
                id="time"
                value={campData?.time}
                onChange={(e) =>
                  setCampData({
                    ...campData,
                    time: e.target.value,
                  })
                }
                type="time"
                required
              />
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="description" className="block text-gray-600">
              Description
            </label>

            <textarea
              id="description"
              value={campData?.description}
              onChange={(e) =>
                setCampData({ ...campData, description: e.target.value })
              }
              className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-green-300 focus:outline-green-500 "
              name="description"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-green-500"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCampForm;
