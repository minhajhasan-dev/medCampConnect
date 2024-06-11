import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5  rounded-lg transition-colors duration-300 transform  hover:bg-green-300   hover:text-gray-700 ${
          isActive ? "bg-green-300  text-gray-700" : "text-gray-600"
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <span className="mx-3 font-medium">{label}</span>
    </NavLink>
  );
};
MenuItem.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.elementType,
};

export default MenuItem;
