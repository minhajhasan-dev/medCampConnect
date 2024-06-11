import PropTypes from "prop-types";

const SectionTitle = ({ headline }) => {
  return (
    <div className="text-center mt-0 ">
      <h1 className="md:text-3xl text-xl font-semibold">{headline}</h1>
    </div>
  );
};

SectionTitle.propTypes = {
  headline: PropTypes.string.isRequired,
};

export default SectionTitle;
