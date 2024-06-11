import AvailableCamp from "../../components/Available Camps/AvailableCamp";
import Container from "../../components/Shared/Container";
import SectionTitle from "../../components/Shared/Section Title/SectionTitle";

const AvailableCamps = () => {
  return (
    <>
      <Container>
        <SectionTitle headline="Available Camps" />
        {/* available camps component here */}
        <AvailableCamp />
      </Container>
    </>
  );
};

export default AvailableCamps;
