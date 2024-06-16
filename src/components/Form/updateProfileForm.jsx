/* eslint-disable react/prop-types */

const UpdateProfileForm = ({
  handleSubmit,
  handleImage,
  setProfileData,
  profileData,
  imageText,
  loading,
}) => {
  return (
    <div className=" flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="profileName" className="block text-gray-600">
              Profile Name
            </label>
            <input
              className="w-full px-4 py-2 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md "
              name="profileName"
              id="profileName"
              type="text"
              value={profileData?.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
              placeholder="Profile Name"
              required
            />
          </div>

          <div className=" p-4 bg-white w-full  m-auto rounded-lg">
            <div className="file_upload px-5 py-2 relative border-4 border-dotted border-gray-300 rounded-lg">
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
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-green-500"
        >
          {loading ? "Loading..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
