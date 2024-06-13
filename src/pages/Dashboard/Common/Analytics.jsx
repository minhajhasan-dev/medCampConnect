import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useRole from "../../../hooks/useRole";
import ParticipantStatistics from "../Participant/ParticipantStatistics";

const Analytics = () => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner />;
  return <>{role === "participant" && <ParticipantStatistics />}</>;
};

export default Analytics;
