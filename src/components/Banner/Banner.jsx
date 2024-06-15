// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./banner.css";

// import required modules
import { useQuery } from "@tanstack/react-query";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { axiosCommon } from "../../hooks/useAxiosCommon";
import Container from "../Shared/Container";

const Banner = () => {
  // load SliderData from the server using tanstack react-query fetch SliderData with axios
  const { data: SliderData = [] } = useQuery({
    queryKey: ["slider"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/slider`);
      return data;
    },
  });

  return (
    <Container>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          0: {
            slidesPerView: "auto",
          },
        }}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1000}
        className="mySwiper mb-10"
      >
        {SliderData.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center p-4 rounded-lg"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-white max-w-md mx-auto">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                {slide.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                {slide.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Banner;
