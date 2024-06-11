import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Container from "../Shared/Container";
import Heading from "../Shared/Heading";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Card from "./Card";

const Camps = () => {
  const axiosCommon = useAxiosCommon();
  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/sortedCamps");
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      {camps && camps.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {camps.map((camp) => (
            <Card key={camp._id} camp={camp} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
          <Heading
            center={true}
            title="No Camps Added Yet!"
            subtitle="Please Add Camps to Show Here."
          />
        </div>
      )}
    </Container>
  );
};

export default Camps;
