import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useRole from "../../../hooks/useRole";
import HostStatistics from "../Host/HostStatistics";

const Statistics = () => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner />;
  return <>{role === "participant" && <HostStatistics />}</>;
};

export default Statistics;
