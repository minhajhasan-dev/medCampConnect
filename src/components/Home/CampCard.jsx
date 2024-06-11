import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CampCard = ({ camp }) => {
  return (
    <Link to={`/camp/${camp?._id}`} className="col-span-1 cursor-pointer group">
      {/* i want to show a card with information like camp name, image, camp fees, date and time, location , healthcare professional, participant count in a responsive way from camps.json  */}
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
            alt="Camp"
          />
          <div
            className="
                absolute
                top-3
                right-3
                "
          ></div>
        </div>
        <div className="font-semibold text-lg">{camp?.name}</div>
        <div className="font-light text-neutral-500">{camp?.date}</div>
        <div className="font-light text-neutral-500">{camp?.time}</div>
        <div className="font-light text-neutral-500">{camp?.location}</div>
        <div className="font-light text-neutral-500">
          {camp?.healthcareProfessional}
        </div>
        <div className="font-light text-neutral-500">
          {camp?.participantCount}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {camp?.fees}</div>
          <div className="font-light">night</div>
        </div>
      </div>
    </Link>
  );
};

CampCard.propTypes = {
  camp: PropTypes.object.isRequired,
};

export default CampCard;
