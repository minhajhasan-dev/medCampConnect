import PropTypes from "prop-types";

const SectionTitle = ({ headline }) => {
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="1000"
      className="text-center mt-0 "
    >
      <h1 className="md:text-3xl text-xl font-semibold">{headline}</h1>
    </div>
  );
};

SectionTitle.propTypes = {
  headline: PropTypes.string.isRequired,
};

export default SectionTitle;
