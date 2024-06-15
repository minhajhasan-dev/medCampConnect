import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import ReactStars from "react-rating-stars-component";
import { axiosCommon } from "../../hooks/useAxiosCommon";
import Container from "../Shared/Container";
import SectionTitle from "../Shared/Section Title/SectionTitle";

const FeedBacks = () => {
  // load feedbacks from the server using tanstack react-query fetch feedback with axios
  const { data: feedbacks = [] } = useQuery({
    queryKey: ["campId"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/feedbacks`);
      return data;
    },
  });

  return (
    <Container>
      <SectionTitle headline="Feedback and Ratings" />
      <Marquee speed={50} pauseOnHover={true}>
        {feedbacks.map((feedback, index) => (
          <div
            key={index}
            className="flex mt-5 items-center p-4 mb-5 bg-white shadow-lg rounded-lg mx-2"
          >
            <img
              className="w-16 h-16 rounded-full mr-4"
              src={feedback.photo}
              alt="User"
            />
            <div>
              <h1 className="text-xl font-bold">{feedback.name}</h1>
              <h4 className="text-sm text-gray-600">{feedback.title}</h4>
              <p className="text-xs text-gray-600">{feedback.feedback}</p>
              <ReactStars
                count={5}
                value={feedback.rating}
                size={24}
                activeColor="#ffd700"
                isHalf={true}
                edit={false}
              />
              <p className="text-gray-500">{feedback.userName}</p>
            </div>
          </div>
        ))}
      </Marquee>
    </Container>
  );
};

export default FeedBacks;
