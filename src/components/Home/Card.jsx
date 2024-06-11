import PropTypes from "prop-types";
import { FaUserDoctor, FaUserGroup } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import {
  MdAccessTimeFilled,
  MdAddLocation,
  MdOutlineDateRange,
} from "react-icons/md";
import { Link } from "react-router-dom";

const Card = ({ camp }) => {
  return (
    <Link
      to={`/camp-details/${camp?._id}`}
      className="col-span-1 border p-3  bg-[#eeeeee36] rounded-2xl cursor-pointer group hover:shadow-md transition-all duration-300 ease-in-out"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
              
            "
        >
          <img
            className="
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              "
            src={camp?.image}
            alt="Room"
          />
          <div
            className="
              absolute
              top-3
              right-3
            "
          ></div>
        </div>
        <div>
          <h1 className="text-base text-center font-semibold">
            {camp?.camp_name}
          </h1>
          <div className="border mt-1 rounded-lg p-1">
            <div className="flex items-center gap-1">
              <MdAddLocation />

              <p className="text-sm font-semibold text-gray-600">
                {camp?.location}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <FaUserDoctor />
              <p className="text-sm font-semibold text-gray-600">
                {camp?.healthcare_professional}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 mt-1">
            <div className="flex items-center justify-center  gap-1 border p-1 rounded-lg">
              <MdOutlineDateRange />

              <p className="text-sm font-semibold text-gray-600">
                {camp?.date}
              </p>
            </div>
            <div className="flex items-center gap-1 justify-center  border p-1 rounded-lg">
              {" "}
              <MdAccessTimeFilled />
              <p className="text-sm font-semibold text-gray-600">
                {camp?.time}
              </p>
            </div>
            <div className="flex items-center gap-1 justify-center  border p-1 rounded-lg">
              <FaUserGroup />
              <p className="text-sm font-semibold text-gray-600">
                {camp?.participant_count} Joined
              </p>
            </div>
            <div className="flex items-center gap-1 justify-center  border p-1 rounded-lg">
              <GrMoney />
              <p className="text-sm font-semibold text-gray-600">
                {" "}
                ${camp?.camp_fees}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  camp: PropTypes.object.isRequired,
};

export default Card;
