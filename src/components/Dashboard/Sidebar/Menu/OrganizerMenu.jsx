import { BsFillHouseAddFill } from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
const OrganizerMenu = () => {
  return (
    <>
      <>
        <MenuItem
          icon={FaUserCog}
          label="Manage Users"
          address="manage-users"
        />
        <MenuItem
          icon={BsFillHouseAddFill}
          label="Add Room"
          address="add-room"
        />
        <MenuItem icon={MdHomeWork} label="My Listings" address="my-listings" />
        <MenuItem
          icon={MdOutlineManageHistory}
          label="Manage Bookings"
          address="manage-bookings"
        ></MenuItem>
      </>
    </>
  );
};

export default OrganizerMenu;
