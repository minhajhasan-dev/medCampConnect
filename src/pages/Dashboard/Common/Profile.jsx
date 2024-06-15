import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user, loading } = useAuth() || {};
  const [role, isLoading] = useRole();
  // load a users from the database using tanstack react query and axios
  const { data: userData = [] } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data;
    },
  });
  console.log(userData);

  console.log(user);
  if (isLoading || loading) return <LoadingSpinner />;
  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl w-3/5">
        <img
          alt="profile"
          src="https://i.ytimg.com/vi/pv8gfg4_9ak/maxresdefault.jpg"
          className="w-full mb-4 rounded-t-lg h-36 object-cover"
        />
        <div className="flex flex-col  items-start justify-center p-4 -mt-16">
          <div className="relative">
            <a href="#" className="relative block">
              <img
                alt="profile"
                src={userData?.photo}
                className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
              />
            </a>

            <p className="p-2 uppercase px-4 text-xs text-white bg-green-600 absolute top-10 left-[100px] rounded-full">
              {role}
            </p>
          </div>
          <div className="w-full p-2 mt-4 border rounded-lg">
            <div className="flex p-4 flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">{userData?.name}</span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{userData?.email}</span>
              </p>
              <p className="flex flex-col">
                Member Since
                <span className="font-bold text-black ">
                  {new Date(userData?.timestamp).toDateString()}
                </span>
              </p>
            </div>
          </div>
          {/* an update button to update those information */}
          <div className="flex justify-center w-full">
            <button className="bg-green-600 text-white px-4 py-2 mt-4 rounded-lg">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
